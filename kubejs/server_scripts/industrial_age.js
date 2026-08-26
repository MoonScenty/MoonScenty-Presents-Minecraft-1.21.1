// 산업 시대.
//
// 주역은 강철과 청동이다. 강철은 황동 시대 끝에 이미 손에 들어와 있으므로
// 이 시대의 진짜 관문은 청동이고, 청동은 주석을 요구한다.
//
// 목표는 공허 케이싱이다.
//
// 상수 이름이 다른 시대 파일과 겹치면 그 파일이 통째로 로드되지 않는다.
// KubeJS 서버 스크립트는 전역 스코프를 공유한다. 그래서 이름을 IND_ 로 연다.

const IND_STEEL = {
  shaft: 'createtiers:shaft_steel',
  cog: 'createtiers:cogwheel_steel',
  large: 'createtiers:large_cogwheel_steel',
  gearbox: 'createtiers:gearbox_steel',
  vertical: 'createtiers:vertical_gearbox_steel'
}

const IND_BRASS = {
  shaft: 'createtiers:shaft_brass',
  cog: 'createtiers:cogwheel_brass',
  large: 'createtiers:large_cogwheel_brass',
  gearbox: 'createtiers:gearbox_brass',
  vertical: 'createtiers:vertical_gearbox_brass'
}

const IND_PLATE = '#c:plates/steel'
const IND_INGOT = '#c:ingots/steel'
const IND_BRONZE_PLATE = '#c:plates/bronze'
const IND_CASING = 'kubejs:steel_casing'
const IND_PIPE = 'petrochem:steel_fluid_pipe'
const IND_LUBRICANT = 'petrochem:lubricant_bucket'

// 진한 물약 유체 한 통. Create 는 물약 유체를 병 종류까지 구성 요소로 들고
// 있어서 potion_contents 만 적으면 조용히 안 맞는다. Create 자신의
// filling/glowstone 이 쓰는 형태를 그대로 따른다.
const IND_THICK_POTION = {
  type: 'neoforge:components',
  fluids: 'create:potion',
  amount: 25,
  components: {
    'create:potion_fluid_bottle_type': 'regular',
    'minecraft:potion_contents': { potion: 'minecraft:thick' }
  }
}

// ── 태그 ────────────────────────────────────────────────────────────────
//
// 주석 태그는 정확히 셋만 넣는다. 넓히면 우회로가 열린다.
//
//   c:raw_materials/tin  -> create:crushing/raw_tin 이 켜지고, 조건이 없는
//                           createmetallurgy:melting/tin/raw_crushed 를 타고
//                           용융 주석으로 직행한다
//   c:dusts/tin          -> 주석벌 원심분리가 살아난다
//   c:nuggets/bronze     -> 구리벌 + 주석벌로 태어나는 청동벌이 청동 너깃을
//                           뽑아내 3 : 1 비율이 통째로 무의미해진다
//
// 셋 다 지금은 어느 모드도 채우지 않아 잠겨 있다. 그대로 둔다.
ServerEvents.tags('item', event => {
  event.add('c:ingots/tin', 'kubejs:tin_ingot')
  event.add('c:storage_blocks/tin', 'kubejs:tin_block')
})

ServerEvents.tags('block', event => {
  event.add('c:storage_blocks/tin', 'kubejs:tin_block')
})

ServerEvents.recipes(event => {
  // ── 주석 ──────────────────────────────────────────────────────────────
  //
  // 원본은 아연 너깃에 진한 물약을 부어 채우는 방식이었다. 재료는 그대로 두고
  // 기계만 가압기로 옮긴다. 가압기는 황동 시대에 이미 열려 있고, 열을 요구하므로
  // 손으로 하나씩 채우던 것이 설비가 된다.
  event.remove({ id: 'petrochem:filling/tin' })
  event.custom({
    type: 'vintageimprovements:pressurizing',
    heat_requirement: 'heated',
    ingredients: [{ tag: 'c:nuggets/zinc' }, IND_THICK_POTION],
    results: [{ id: 'petrochem:tin_nugget' }],
    processing_time: 100
  }).id('kubejs:pressurizing/tin_nugget')

  // 너깃 · 주괴 · 블록 사이를 오간다. Almost Unified 는 중복 아이템을 하나로
  // 합칠 뿐 이런 변환을 만들어 주지 않으므로 직접 쓴다.
  event.shaped('kubejs:tin_ingot', ['TTT', 'TTT', 'TTT'], { T: 'petrochem:tin_nugget' })
    .id('kubejs:crafting/tin_ingot_from_nuggets')
  event.shapeless('9x petrochem:tin_nugget', ['kubejs:tin_ingot'])
    .id('kubejs:crafting/tin_nuggets_from_ingot')

  event.shaped('kubejs:tin_block', ['TTT', 'TTT', 'TTT'], { T: 'kubejs:tin_ingot' })
    .id('kubejs:crafting/tin_block_from_ingots')
  event.shapeless('9x kubejs:tin_ingot', ['kubejs:tin_block'])
    .id('kubejs:crafting/tin_ingots_from_block')

  // ── 청동 ──────────────────────────────────────────────────────────────
  //
  // 원본은 구리 주괴 1 에 주석 너깃 1 이라 주괴로 환산하면 9 : 1 이 넘는다.
  // 주괴 기준 3 : 1 로 맞춘다.
  //
  // Metallurgy 의 합금 노선(용융 구리 30 + 용융 주석 10)은 일부러 남긴다.
  // 부피비가 마침 3 : 1 로 같아서 비율을 어기지 않고, 주조 설비를 갖춘
  // 플레이어에게 주는 다른 길이 된다.
  event.remove({ id: 'petrochem:mixing/bronze_alloy' })
  event.custom({
    type: 'create:mixing',
    heat_requirement: 'heated',
    ingredients: [
      { item: 'minecraft:copper_ingot' },
      { item: 'minecraft:copper_ingot' },
      { item: 'minecraft:copper_ingot' },
      { item: 'kubejs:tin_ingot' }
    ],
    results: [{ id: 'petrochem:bronze_ingot' }]
  }).id('kubejs:mixing/bronze_ingot')

  // ── 동력 부품을 강철로 승급 ───────────────────────────────────────────
  //
  // 황동 부품에 강철 판 하나를 얹으면 강철 부품이 된다. 안산암 -> 황동과
  // 같은 방식이다. 황동은 유령 들린 판을 요구했고, 강철 판은 정제 코크스를
  // 거쳐야 나오므로 이전 시대의 설비가 그대로 재료 공급원이 된다.
  ;[
    [IND_STEEL.shaft, IND_BRASS.shaft, 'shaft'],
    [IND_STEEL.cog, IND_BRASS.cog, 'cogwheel'],
    [IND_STEEL.large, IND_BRASS.large, 'large_cogwheel'],
    [IND_STEEL.gearbox, IND_BRASS.gearbox, 'gearbox'],
    [IND_STEEL.vertical, IND_BRASS.vertical, 'vertical_gearbox']
  ].forEach(([out, from, name]) => {
    event.shapeless(out, [from, IND_PLATE]).id(`kubejs:crafting/${name}_steel`)
  })

  // 기어박스 두 종은 서로 뒤집을 수 있다. 앞선 두 시대와 같은 방식이다.
  event.shapeless(IND_STEEL.gearbox, [IND_STEEL.vertical])
    .id('kubejs:crafting/gearbox_steel_from_conversion')
  event.shapeless(IND_STEEL.vertical, [IND_STEEL.gearbox])
    .id('kubejs:crafting/vertical_gearbox_steel_from_conversion')

  // ── Crafts & Additions 정리 ───────────────────────────────────────────
  //
  // 전기 모터는 FE 를 회전으로 되돌린다. 이 팩에서 회전은 회전으로 얻는
  // 것이므로 결이 맞지 않아 뺀다.
  //
  // 커넥터 계열은 전부 빼고 배선은 PIPEZ 에 맡긴다. 압연기는 Vintage 의
  // 벨트 그라인더와 역할이 겹친다.
  //
  // 스풀은 다섯 종을 전부 미다. 커넥터와 전기 모터가 사라지고, 황동
  // 시대에서 교류발전기와 테슬라 코일의 구리 스풀도 뺀 터라 쓰는 곳이 없다.
  //
  // Metallurgy 의 텅스텐 와이어 스풀은 이름만 같은 별개다. 전구 16종이
  // 전부 그것을 요구하므로 건드리지 않는다.
  //
  // 씨앗 기름은 c:plantoil 을 채우는 유일한 레시피이고, 바이오매스 여덟
  // 갈래가 전부 그 태그를 요구한다. 그래서 이것 하나로 에탄올 노선 전체가
  // 닫힌다. 벌집과 에탄올을 따로 지우는 것은 JEI 에서 이유를 분명히 하려는
  // 것이지 그것들이 지렛대라서가 아니다.
  ;[
    'createaddition:mechanical_crafting/electric_motor',
    'createaddition:crafting/rolling_mill',
    'createaddition:crafting/connector',
    'createaddition:crafting/small_light_connector',
    'createaddition:crafting/large_connector',
    'createaddition:crafting/redstone_relay',
    'createaddition:crafting/barbed_wire',
    'createaddition:crafting/portable_energy_interface',
    'createaddition:mixing/bioethanol',
    'createaddition:mixing/biomass_from_honeycomb',
    'createaddition:compacting/seed_oil',
    'createaddition:crafting/spool',
    'createaddition:crafting/copper_spool',
    'createaddition:crafting/gold_spool',
    'createaddition:crafting/electrum_spool',
    'createaddition:crafting/festive_spool'
  ].forEach(id => event.remove({ id: id }))

  // 개발용으로 남은 레시피다. 입력 유체 gearbox:petroleum 을 가진 모드가
  // 팩에 없어 쓸 수도 없고 로그만 더럽힌다.
  event.remove({ id: 'petrochem:distilling/test' })

  // ── Petrochem 설비 ────────────────────────────────────────────────────
  //
  // 원본은 대부분 강철 판과 주괴만 요구해 황동 시대 끝에 다 열려 버린다.
  // 강철 케이싱과 강철 티어 축을 끼워 이 시대의 물건으로 만든다.

  // 펌프잭 팔. 배치는 원본 그대로 두고 축과 오른쪽 끝만 올린다.
  event.remove({ id: 'petrochem:mechanical_crafting/pumpjack_arm' })
  event.custom({
    type: 'create:mechanical_crafting',
    accept_mirrored: true,
    key: {
      S: { tag: 'c:plates/steel' },
      C: { item: IND_CASING },
      H: { item: 'minecraft:chain' },
      I: { tag: 'c:ingots/steel' },
      A: { item: IND_STEEL.shaft }
    },
    pattern: [
      'SSSSSSC',
      'H IAI  '
    ],
    result: { count: 1, id: 'petrochem:pumpjack_arm' }
  }).id('kubejs:mechanical_crafting/pumpjack_arm')

  // 펌프잭 크랭크. 회전 속도 제어기를 심어 속도를 다루는 기계임을 재료로
  // 드러낸다.
  event.remove({ id: 'petrochem:crafting/null/pumpjack_crank' })
  event.shaped('petrochem:pumpjack_crank', [
    'SCS',
    'SRS',
    'SCS'
  ], {
    S: IND_PLATE,
    C: IND_CASING,
    R: 'create:rotation_speed_controller'
  }).id('kubejs:crafting/pumpjack_crank')

  // 강철 유체관. 원본 둘을 하나로 합치고 한 번에 넷이 나오게 한다.
  event.remove({ id: 'petrochem:crafting/null/steel_fluid_pipe' })
  event.remove({ id: 'petrochem:crafting/null/steel_fluid_pipe_vertical' })
  event.shaped('4x petrochem:steel_fluid_pipe', [
    ' S ',
    ' I ',
    ' S '
  ], {
    S: IND_PLATE,
    I: IND_INGOT
  }).id('kubejs:crafting/steel_fluid_pipe')

  // 증류탑 제어기. 청동을 요구하므로 주석을 뚫어야 손이 닿는다.
  event.remove({ id: 'petrochem:crafting/null/distillation_controller' })
  event.shaped('petrochem:distillation_controller', [
    ' B ',
    'PCP',
    'SBS'
  ], {
    B: IND_BRONZE_PLATE,
    P: IND_PIPE,
    C: IND_CASING,
    S: IND_PLATE
  }).id('kubejs:crafting/distillation_controller')

  // 강철 펌프. 강철 톱니 하나에 유체관을 물린다.
  event.remove({ id: 'petrochem:crafting/null/steel_pump' })
  event.shapeless('petrochem:steel_pump', [IND_STEEL.cog, IND_PIPE])
    .id('kubejs:crafting/steel_pump')

  // 소형 · 중형 엔진.
  //
  // 둘 다 윤활유를 요구한다. 윤활유는 탈아스팔트 공정에서만 나오고 그 공정이
  // LPG 를 먹으므로, LPG 를 가스 터빈에 태울지 윤활유로 바꿀지 고르게 된다.
  //
  // 이 엔진들은 Create 의 동력 축을 쓴다. Create Tiers 의 티어 축과 맞물리게
  // 하는 것이 Create Tiers: Engine Compat 이다.
  event.remove({ id: 'petrochem:crafting/null/small_engine' })
  event.shaped('petrochem:small_engine', [
    'BLB',
    'ACA',
    'SSS'
  ], {
    B: IND_BRONZE_PLATE,
    L: IND_LUBRICANT,
    A: IND_STEEL.shaft,
    C: IND_CASING,
    S: IND_PLATE
  }).id('kubejs:crafting/small_engine')

  event.remove({ id: 'petrochem:crafting/null/medium_engine' })
  event.shaped('petrochem:medium_engine', [
    ' C ',
    'BLB',
    'KKK'
  ], {
    C: IND_CASING,
    B: IND_BRONZE_PLATE,
    L: IND_LUBRICANT,
    K: '#c:storage_blocks/steel'
  }).id('kubejs:crafting/medium_engine')

  // ── 공허 강철 ─────────────────────────────────────────────────────────
  //
  // 원본은 네더라이트 주괴를 요구했다. 네더라이트는 이 팩의 진행 축과 상관이
  // 없으므로 강철과 엔더 진주, 그리고 등유로 바꾼다. 등유는 상압증류에서만
  // 나오므로 정유소를 세워야 공허 강철에 닿는다.
  event.remove({ id: 'createutilities:mixing/void_steel_ingot' })
  event.custom({
    type: 'vintageimprovements:pressurizing',
    heat_requirement: 'heated',
    ingredients: [
      { item: 'minecraft:ender_pearl' },
      { tag: 'c:ingots/steel' },
      { type: 'neoforge:single', fluid: 'petrochem:kerosene', amount: 1000 }
    ],
    results: [{ id: 'createutilities:void_steel_ingot' }],
    processing_time: 200
  }).id('kubejs:pressurizing/void_steel_ingot')

  // 합금 노선은 지운다. 용융 네더라이트를 요구해 위와 같은 이유로 맞지 않고,
  // 아래 용해 레시피가 그 자리를 대신한다.
  event.remove({ id: 'createmetallurgy:alloying/void_steel' })

  // 주조와 용해.
  //
  // Metallurgy 에 같은 것이 이미 있지만 c:ingots/void_steel 태그가 비어 있어
  // 꺼져 있다. 태그를 채우면 너깃 · 막대 · 기어까지 한꺼번에 열리므로 여기서는
  // 주괴와 판만 직접 쓴다.
  //
  // 거푸집 두 등급을 둘 다 직접 쓴다.
  //
  // molds.js 가 Metallurgy 주조 레시피를 훑어 내화 판본을 만들긴 하지만,
  // event.forEachRecipe 는 데이터팩 원본만 돌고 KubeJS 가 같은 이벤트에서
  // 추가한 것은 보지 못한다. 파일 순서와 무관하게 안 잡힌다.
  //
  // 흑연은 남고 내화 모르타르는 주조 한 번에 사라진다. mold_consumed 가 그 차이다.
  ;[
    ['ingot', 'createutilities:void_steel_ingot'],
    ['plate', 'createutilities:void_steel_sheet']
  ].forEach(([shape, out]) => {
    ;[
      [`createmetallurgy:graphite_${shape}_mold`, false, ''],
      [`kubejs:refractory_mortar_${shape}_mold`, true, '_refractory']
    ].forEach(([mold, consumed, suffix]) => {
      const json = {
        type: 'createmetallurgy:casting_in_table',
        ingredients: [
          { type: 'neoforge:single', amount: 90, fluid: 'createmetallurgy:molten_void_steel' },
          { item: mold }
        ],
        processing_time: 60,
        result: { item: { id: out, count: 1 } }
      }
      if (consumed) json.mold_consumed = true
      event.custom(json).id(`kubejs:casting_in_table/void_steel_${shape}${suffix}`)
    })

    event.custom({
      type: 'createmetallurgy:melting',
      heat_requirement: 'heated',
      ingredients: [{ item: out }],
      processing_time: 40,
      results: [{ amount: 90, id: 'createmetallurgy:molten_void_steel' }]
    }).id(`kubejs:melting/void_steel_${shape}`)
  })

  // ── 공허 케이싱 ───────────────────────────────────────────────────────
  //
  // 이 시대의 결승선이다. 원본은 주괴를 얹었는데 판으로 올려 압착을 한 번 더
  // 거치게 한다.
  event.remove({ id: 'createutilities:item_application/void_casing' })
  event.custom({
    type: 'create:item_application',
    ingredients: [
      { item: 'minecraft:obsidian' },
      { item: 'createutilities:void_steel_sheet' }
    ],
    results: [{ id: 'createutilities:void_casing' }]
  }).id('kubejs:item_application/void_casing')
})
