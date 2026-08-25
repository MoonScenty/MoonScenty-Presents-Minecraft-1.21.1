// 안산암 합금 시대.
//
// 목표는 황동 케이싱이다. 안산암 합금으로 동력 부품과 기계를 세우고,
// 압착기로 구리 판을 만들어 유체와 고무로 나아가며, 마지막에 팬으로
// 황동 판을 유령 가공해 케이싱을 만든다.
//
// 뼈대는 셋이다.
//   바닐라 축과 톱니바퀴를 없애고 Create Tiers의 티어 부품으로 옮긴다
//   케이싱을 주괴가 아니라 판으로 만들게 해 압착기를 앞에 세운다
//   결승선인 황동 케이싱만 막고 황동 주괴와 판은 자유롭게 둔다

// 티어 부품. 아이템 ID는 createtiers:<부품>_<티어> 형태다.
const T = {
  shaft: 'createtiers:shaft_andesite_alloy',
  cog: 'createtiers:cogwheel_andesite_alloy',
  large: 'createtiers:large_cogwheel_andesite_alloy',
  gearbox: 'createtiers:gearbox_andesite_alloy',
  vertical: 'createtiers:vertical_gearbox_andesite_alloy'
}

const CASING = 'create:andesite_casing'
const SHEET = 'createdeco:andesite_sheet'
const COPPER = 'create:copper_sheet'
const WATERPROOF = 'kubejs:waterproof_copper_casing'

ServerEvents.recipes(event => {
  // ── 동력 부품을 티어로 옮긴다 ─────────────────────────────────────────
  //
  // Create Tiers는 티어별 부품을 동적으로 만들지만 제작법은 하나도 넣지
  // 않는다. 바닐라 부품의 제작법을 지우고 같은 재료와 공정으로 티어 부품이
  // 나오게 한다. 플레이어가 만드는 방법은 같고 결과물만 바뀐다.
  //
  // 카피캣과 Create Utilities J의 부품도 바닐라 톱니바퀴를 요구하므로 함께
  // 지운다. JEI에 만들 수 없는 레시피가 남지 않게 하기 위해서다.
  // Utilities J의 기어박스 셋은 산업 시대에 되살린다.
  ;[
    'create:crafting/kinetics/shaft',
    'create:cutting/andesite_alloy',
    'create:crafting/kinetics/cogwheel',
    'create:deploying/cogwheel',
    'create:crafting/kinetics/large_cogwheel',
    'create:crafting/kinetics/large_cogwheel_from_little',
    'create:deploying/large_cogwheel',
    'create:crafting/kinetics/gearbox',
    'create:crafting/kinetics/gearbox_from_conversion',
    'create:crafting/kinetics/vertical_gearbox',
    'create:crafting/kinetics/vertical_gearbox_from_conversion',
    'copycats:stonecutting/copycat_shaft',
    'copycats:crafting/copycat_cogwheel',
    'copycats:crafting/copycat_large_cogwheel',
    'createutilities:shaped/gearcube',
    'createutilities:shaped/lshaped_gearbox',
    'createutilities:shaped/lshaped_gearbox_mirrored'
  ].forEach(id => event.remove({ id: id }))

  // 축: 안산암 합금 2개를 세로로 놓아 4개
  event.shaped(Item.of(T.shaft, 4), [
    'A',
    'A'
  ], { A: 'create:andesite_alloy' }).id('kubejs:crafting/shaft_andesite_alloy')

  // 톱니바퀴: 축 + 판자
  event.shapeless(T.cog, [T.shaft, '#minecraft:planks'])
    .id('kubejs:crafting/cogwheel_andesite_alloy')

  // 큰 톱니바퀴: 톱니바퀴 + 판자, 또는 축 + 판자 2개
  event.shapeless(T.large, [T.cog, '#minecraft:planks'])
    .id('kubejs:crafting/large_cogwheel_andesite_alloy_from_little')

  event.shapeless(T.large, [T.shaft, '#minecraft:planks', '#minecraft:planks'])
    .id('kubejs:crafting/large_cogwheel_andesite_alloy')

  // 기어박스: 톱니바퀴 4개로 안산암 케이싱을 감싼다
  event.shaped(T.gearbox, [
    ' C ',
    'CBC',
    ' C '
  ], { B: CASING, C: T.cog }).id('kubejs:crafting/gearbox_andesite_alloy')

  // 수직 기어박스: 톱니바퀴를 네 모서리에
  event.shaped(T.vertical, [
    'C C',
    ' B ',
    'C C'
  ], { B: CASING, C: T.cog }).id('kubejs:crafting/vertical_gearbox_andesite_alloy')

  // 두 기어박스는 서로 오갈 수 있다
  event.shapeless(T.gearbox, [T.vertical])
    .id('kubejs:crafting/gearbox_andesite_alloy_from_conversion')
  event.shapeless(T.vertical, [T.gearbox])
    .id('kubejs:crafting/vertical_gearbox_andesite_alloy_from_conversion')

  // ── 동력 전달 ─────────────────────────────────────────────────────────
  event.remove({ id: 'create:crafting/kinetics/clutch' })
  event.shapeless('create:clutch', [CASING, T.shaft, 'minecraft:redstone'])
    .id('kubejs:crafting/clutch')

  event.remove({ id: 'create:crafting/kinetics/gearshift' })
  event.shapeless('create:gearshift', [CASING, T.cog, 'minecraft:redstone'])
    .id('kubejs:crafting/gearshift')

  // 인케이스드 체인 드라이브는 아연 판본이 따로 있다.
  // 철 너깃 판본만 지워 아연으로 통일한다.
  event.remove({ id: 'create:crafting/kinetics/encased_chain_drive' })

  // 체인 컨베이어의 원본은 바닐라 큰 톱니바퀴를 요구하므로 다시 쓴다.
  event.remove({ id: 'create:crafting/kinetics/chain_conveyor' })
  event.shaped(Item.of('create:chain_conveyor', 2), [
    ' A ',
    'ACA',
    ' A '
  ], { A: CASING, C: T.cog }).id('kubejs:crafting/chain_conveyor')

  // ── 기계 ──────────────────────────────────────────────────────────────
  //
  // 프레스와 팬은 바닐라 축을, 믹서는 바닐라 톱니바퀴를 요구한다. 둘 다
  // 제작법을 지웠으므로 티어 부품으로 바꿔 준다. 모양과 나머지 재료는
  // 원본 그대로 둔다.
  event.remove({ id: 'create:crafting/kinetics/mechanical_press' })
  event.shaped('create:mechanical_press', [
    'S',
    'C',
    'I'
  ], {
    S: T.shaft,
    C: CASING,
    I: '#c:storage_blocks/iron'
  }).id('kubejs:crafting/mechanical_press')

  event.remove({ id: 'create:crafting/kinetics/encased_fan' })
  event.shaped('create:encased_fan', [
    'S',
    'A',
    'P'
  ], {
    S: T.shaft,
    A: CASING,
    P: 'create:propeller'
  }).id('kubejs:crafting/encased_fan')

  event.remove({ id: 'create:crafting/kinetics/mechanical_mixer' })
  event.shaped('create:mechanical_mixer', [
    'S',
    'C',
    'I'
  ], {
    S: T.cog,
    C: CASING,
    I: 'create:whisk'
  }).id('kubejs:crafting/mechanical_mixer')

  // 렌치도 바닐라 톱니바퀴를 요구한다. Create 블록을 돌리고 설정하는 데
  // 사실상 필수인 도구라 막혀 있으면 곤란하다.
  event.remove({ id: 'create:crafting/kinetics/wrench' })
  event.shaped('create:wrench', [
    'GG',
    'GP',
    ' S'
  ], {
    G: '#c:plates/gold',
    P: T.cog,
    S: '#c:rods/wooden'
  }).id('kubejs:crafting/wrench')

  // 압출기도 바닐라 축을 요구한다. 안산암 챕터의 퀘스트 아이템이라 막혀
  // 있으면 시대를 끝낼 수 없다. 황동 판본은 황동 케이싱을 쓰므로 그대로 둔다.
  event.remove({ id: 'create_mechanical_extruder:crafting/mechanical_extruder' })
  event.shaped('create_mechanical_extruder:mechanical_extruder', [
    ' S ',
    'GAG',
    ' G '
  ], {
    S: T.shaft,
    G: '#c:glass_blocks',
    A: CASING
  }).id('kubejs:crafting/mechanical_extruder')

  // 동력 부품이 아니지만 바닐라 축과 톱니바퀴를 요구하는 것들.
  // 배치와 나머지 재료는 원본 그대로 둔다.
  //
  // 공구상자는 갈색 하나만 조합으로 만든다. 나머지 열다섯 색은
  // create:toolbox_dyeing 으로 염색해 얻으므로 여기만 고치면 전부 열린다.
  event.remove({ id: 'create:crafting/appliances/copper_backtank' })
  event.shaped('create:copper_backtank', [
    'AGA',
    'PBP',
    ' P '
  ], {
    A: 'create:andesite_alloy',
    G: T.shaft,
    P: 'minecraft:copper_ingot',
    B: 'minecraft:copper_block'
  }).id('kubejs:crafting/copper_backtank')

  event.remove({ id: 'create:crafting/kinetics/gantry_carriage' })
  event.shaped('create:gantry_carriage', [
    'B',
    'C',
    'I'
  ], {
    B: '#minecraft:wooden_slabs',
    C: CASING,
    I: T.cog
  }).id('kubejs:crafting/gantry_carriage')

  event.remove({ id: 'create:crafting/curiosities/brown_toolbox' })
  event.shaped('create:brown_toolbox', [
    ' C ',
    'SWS',
    ' L '
  ], {
    C: T.cog,
    S: 'create:golden_sheet',
    W: '#c:chests/wooden',
    L: 'minecraft:leather'
  }).id('kubejs:crafting/brown_toolbox')

  // ── 동력원 ────────────────────────────────────────────────────────────
  //
  // 물레방아와 풍차는 놓고 잊는 공짜 동력이다. 증기 기관은 보일러가 유체
  // 탱크를 키우는 만큼 출력이 올라 이후 시대의 요구까지 덮어 버린다.
  //
  // 돛과 돛 틀은 남긴다. 퀘스트에서 장식용임을 밝힌다.
  ;[
    'create:crafting/kinetics/water_wheel',
    'create:crafting/kinetics/large_water_wheel',
    'create:crafting/kinetics/steam_engine',
    'create:crafting/kinetics/windmill_bearing'
  ].forEach(id => event.remove({ id: id }))

  event.remove({ id: 'createtreadmill:treadmill' })
  event.shaped('createtreadmill:treadmill', [
    '  A',
    '  S',
    'ABA'
  ], {
    A: CASING,
    S: T.shaft,
    B: 'create:belt_connector'
  }).id('kubejs:crafting/treadmill')

  event.remove({ id: 'create:crafting/kinetics/mechanical_bearing' })
  event.shaped('create:mechanical_bearing', [
    ' W ',
    ' A ',
    ' S '
  ], {
    W: '#minecraft:wooden_slabs',
    A: CASING,
    S: T.shaft
  }).id('kubejs:crafting/mechanical_bearing')

  event.remove({ id: 'create:crafting/kinetics/flywheel' })
  event.shaped('create:flywheel', [
    'DDD',
    'DSD',
    'DDD'
  ], { D: SHEET, S: T.shaft }).id('kubejs:crafting/flywheel')

  // 화로 엔진의 기본 제작법은 기계식 조립기를 쓰고 황동을 요구한다.
  // 일반 제작대로 내리고 이 시대의 재료로 바꾼다.
  event.remove({ id: 'createfurnaceengine:furnace_engine' })
  event.shaped('createfurnaceengine:furnace_engine', [
    'DDI',
    'DAP',
    'DDI'
  ], {
    D: SHEET,
    I: 'create:industrial_iron_block',
    A: CASING,
    P: 'minecraft:piston'
  }).id('kubejs:crafting/furnace_engine')

  // ── 기계 ──────────────────────────────────────────────────────────────
  event.remove({ id: 'create:crafting/kinetics/turntable' })
  event.shaped('create:turntable', [
    ' W ',
    ' S '
  ], { W: '#minecraft:wooden_slabs', S: T.shaft }).id('kubejs:crafting/turntable')

  event.remove({ id: 'create:crafting/kinetics/weighted_ejector' })
  event.shaped('create:weighted_ejector', [
    ' G ',
    ' D ',
    ' C '
  ], {
    G: 'create:golden_sheet',
    D: 'create:depot',
    C: T.cog
  }).id('kubejs:crafting/weighted_ejector')

  event.remove({ id: 'create:crafting/kinetics/mechanical_pump' })
  event.shapeless('create:mechanical_pump', [T.cog, 'create:fluid_pipe'])
    .id('kubejs:crafting/mechanical_pump')

  // ── 구리와 케이싱 ─────────────────────────────────────────────────────
  //
  // 케이싱을 주괴가 아니라 판으로 만들게 바꿔 압착기를 앞에 세운다.
  event.remove({ id: 'create:item_application/copper_casing_from_log' })
  event.remove({ id: 'create:item_application/copper_casing_from_wood' })

  ;[['logs', 'c:stripped_logs'], ['woods', 'c:stripped_woods']].forEach(([name, tag]) => {
    event.custom({
      type: 'create:item_application',
      ingredients: [{ tag: tag }, { item: COPPER }],
      results: [{ id: 'create:copper_casing' }]
    }).id(`kubejs:item_application/copper_casing_from_${name}`)
  })

  // 구리 케이싱에 고무를 대면 방수 케이싱이 된다.
  // 유체 기계 넷이 전부 이것을 거치므로 고무가 유체보다 앞에 선다.
  event.custom({
    type: 'create:item_application',
    ingredients: [{ item: 'create:copper_casing' }, { item: 'rubberworks:rubber_sheet' }],
    results: [{ id: WATERPROOF }]
  }).id('kubejs:item_application/waterproof_copper_casing')

  // ── 고무 ──────────────────────────────────────────────────────────────
  event.remove({ id: 'rubberworks:crafting/sapper' })
  event.shaped('rubberworks:sapper', [
    ' C ',
    'ANC',
    ' C '
  ], { C: COPPER, A: CASING, N: T.cog }).id('kubejs:crafting/sapper')

  event.remove({ id: 'rubberworks:crafting/compressor' })
  event.shaped('rubberworks:compressor', [
    ' S ',
    ' B ',
    ' I '
  ], {
    S: T.shaft,
    B: 'create:andesite_alloy_block',
    I: 'create:industrial_iron_block'
  }).id('kubejs:crafting/compressor')

  // ── 유체 ──────────────────────────────────────────────────────────────
  event.remove({ id: 'create:crafting/kinetics/hose_pulley' })
  event.shaped('create:hose_pulley', [
    ' W ',
    ' R ',
    ' C '
  ], {
    W: WATERPROOF,
    R: 'rubberworks:rubber_block',
    C: COPPER
  }).id('kubejs:crafting/hose_pulley')

  event.remove({ id: 'create:crafting/kinetics/item_drain' })
  event.shaped('create:item_drain', [
    ' I ',
    ' W '
  ], { I: 'minecraft:iron_bars', W: WATERPROOF }).id('kubejs:crafting/item_drain')

  event.remove({ id: 'create:crafting/kinetics/spout' })
  event.shaped('create:spout', [
    ' W ',
    ' R '
  ], { W: WATERPROOF, R: 'rubberworks:rubber_sheet' }).id('kubejs:crafting/spout')

  event.remove({ id: 'create:crafting/kinetics/portable_fluid_interface' })
  event.shapeless('create:portable_fluid_interface', [WATERPROOF, 'create:chute'])
    .id('kubejs:crafting/portable_fluid_interface')

  // ── 요리 연동 ─────────────────────────────────────────────────────────
  event.remove({ id: 'sliceanddice:slicer' })
  event.shaped('sliceanddice:slicer', [
    ' C ',
    ' A ',
    ' T '
  ], { C: T.cog, A: CASING, T: 'create:turntable' }).id('kubejs:crafting/slicer')

  event.remove({ id: 'sliceanddice:sprinkler' })
  event.shaped('sliceanddice:sprinkler', [
    'CWC',
    ' P ',
    ' B '
  ], {
    C: COPPER,
    W: WATERPROOF,
    P: 'create:fluid_pipe',
    B: 'minecraft:iron_bars'
  }).id('kubejs:crafting/sprinkler')

  // ── 황동, 이 시대의 결승선 ────────────────────────────────────────────
  //
  // 황동 주괴와 판은 막지 않는다. 케이싱 하나만 유령 가공을 거치게 한다.
  //
  // 팩 전체를 훑어 create:brass_casing 을 만드는 레시피가 아래 셋뿐임을
  // 확인했다. 셋을 모두 지우면 유령 들린 판이 유일한 경로가 되고, 유령
  // 가공이 인케이스드 팬을 요구하므로 팬이 이 시대의 마지막 관문이 된다.
  event.custom({
    type: 'create:haunting',
    ingredients: [{ item: 'create:brass_sheet' }],
    results: [{ id: 'kubejs:haunted_brass_sheet' }]
  }).id('kubejs:haunting/haunted_brass_sheet')

  ;[
    'create:item_application/brass_casing_from_log',
    'create:item_application/brass_casing_from_wood',
    'createmetallurgy:casting_in_basin/brass_casing'
  ].forEach(id => event.remove({ id: id }))

  ;[['logs', 'c:stripped_logs'], ['woods', 'c:stripped_woods']].forEach(([name, tag]) => {
    event.custom({
      type: 'create:item_application',
      ingredients: [{ tag: tag }, { item: 'kubejs:haunted_brass_sheet' }],
      results: [{ id: 'create:brass_casing' }]
    }).id(`kubejs:item_application/brass_casing_from_${name}`)
  })
})
