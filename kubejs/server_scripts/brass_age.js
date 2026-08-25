// 황동 시대.
//
// 목표는 강철 케이싱이다. 안산암 부품에 유령 들린 황동 판을 얹어 황동 티어로
// 올리고, Vintage의 가공 기계들을 한 줄로 엮어 원심분리기까지 간 다음,
// 정제 코크스로 강철을 뽑는다.
//
// 뼈대는 셋이다.
//   안산암 부품 + 유령 들린 황동 판 -> 황동 부품. 이전 시대 설비가 그대로 쓰인다
//   Vintage 기계 다섯이 서로의 재료를 만든다. 중간에 신규 아이템 넷을 끼운다
//   결승선인 강철 케이싱만 막고 그 앞의 정제 코크스 하나로 관문을 모은다
//
// 곁가지로 커빙 프레스가 AE2 회로 인쇄기를, 테슬라 코일이 충전기를 대신한다.
//
// KubeJS 서버 스크립트는 전역 스코프를 공유한다. 다른 파일과 같은 이름으로
// const를 선언하면 그 파일이 통째로 로드되지 않으므로 상수 이름을 겹치지 않게 둔다.

// 황동 티어 부품.
const BRASS = {
  shaft: 'createtiers:shaft_brass',
  cog: 'createtiers:cogwheel_brass',
  large: 'createtiers:large_cogwheel_brass',
  gearbox: 'createtiers:gearbox_brass',
  vertical: 'createtiers:vertical_gearbox_brass'
}

// 안산암 티어 부품. 승급의 재료다.
const ANDESITE = {
  shaft: 'createtiers:shaft_andesite_alloy',
  cog: 'createtiers:cogwheel_andesite_alloy',
  large: 'createtiers:large_cogwheel_andesite_alloy',
  gearbox: 'createtiers:gearbox_andesite_alloy',
  vertical: 'createtiers:vertical_gearbox_andesite_alloy'
}

const BRASS_CASING = 'create:brass_casing'
const HAUNTED_SHEET = 'kubejs:haunted_brass_sheet'
const IRON_SPRING = 'vintageimprovements:iron_spring'
const PRECISE_SPRING = 'kubejs:precision_iron_spring'
const ELECTRON_TUBE = 'create:electron_tube'

// 커빙 프레스가 대신할 AE2 회로 인쇄기 각인 공정.
// [프레스, 복제 재료, 인쇄 재료, 인쇄물]
const AE_PRESSES = [
  ['ae2:logic_processor_press', 'minecraft:gold_ingot', 'ae2:printed_logic_processor'],
  ['ae2:calculation_processor_press', 'ae2:certus_quartz_crystal', 'ae2:printed_calculation_processor'],
  ['ae2:silicon_press', 'ae2:silicon', 'ae2:printed_silicon'],
  ['ae2:engineering_processor_press', 'minecraft:diamond', 'ae2:printed_engineering_processor']
]

// 진공실이 대신할 AE2 회로 압착 공정. [인쇄물, 완성품]
const AE_PROCESSORS = [
  ['ae2:printed_calculation_processor', 'ae2:calculation_processor'],
  ['ae2:printed_logic_processor', 'ae2:logic_processor'],
  ['ae2:printed_engineering_processor', 'ae2:engineering_processor']
]

// 커빙 프레스는 헤드를 갈아 끼우는 기계다. AE2 프레스를 헤드로 쓰려면
// 태그에 넣어야 한다. 프레스에는 내구도가 없어 소모되지 않는다.
ServerEvents.tags('item', event => {
  AE_PRESSES.forEach(([press]) => event.add('vintageimprovements:curving_heads', press))
})

ServerEvents.recipes(event => {
  // ── 동력 부품을 황동으로 승급 ─────────────────────────────────────────
  //
  // 안산암 부품에 유령 들린 황동 판 하나를 얹으면 황동 부품이 된다.
  // 이전 시대의 생산 설비가 그대로 재료 공급원이 되고, 유령 가공을 한 번 더
  // 거치므로 팬이 계속 돌아야 한다.
  ;[
    [BRASS.shaft, ANDESITE.shaft, 'shaft'],
    [BRASS.cog, ANDESITE.cog, 'cogwheel'],
    [BRASS.large, ANDESITE.large, 'large_cogwheel'],
    [BRASS.gearbox, ANDESITE.gearbox, 'gearbox'],
    [BRASS.vertical, ANDESITE.vertical, 'vertical_gearbox']
  ].forEach(([out, from, name]) => {
    event.shapeless(out, [from, HAUNTED_SHEET]).id(`kubejs:crafting/${name}_brass`)
  })

  // 기어박스 두 종은 서로 뒤집을 수 있다. 안산암 시대와 같은 방식이다.
  event.shapeless(BRASS.gearbox, [BRASS.vertical]).id('kubejs:crafting/gearbox_brass_from_conversion')
  event.shapeless(BRASS.vertical, [BRASS.gearbox]).id('kubejs:crafting/vertical_gearbox_brass_from_conversion')

  // ── Vintage 가공 사슬 ─────────────────────────────────────────────────
  //
  // 다섯 기계가 전부 안산암 케이싱과 바닐라 축을 요구한다. 바닐라 축은 지난
  // 시대에 제작법을 지웠으므로 지금은 하나도 만들 수 없다. 황동 케이싱과
  // 황동 축으로 다시 쓰면서 순서를 강제한다.

  // Metallurgy가 벨트 그라인더 제작법을 중복으로 들고 있다.
  event.remove({ id: 'createmetallurgy:crafting/content/mechanical_belt_grinder' })

  event.remove({ id: 'vintageimprovements:craft/belt_grinder' })
  event.shaped('vintageimprovements:belt_grinder', [
    ' G ',
    ' B ',
    ' S '
  ], {
    G: 'vintageimprovements:grinder_belt',
    B: BRASS_CASING,
    S: BRASS.shaft
  }).id('kubejs:crafting/belt_grinder')

  // 원본 코일링 휠은 안산암 합금과 철 블록으로 바로 나왔다. 그 배치를
  // 미가공 중간재로 내리고 벨트 그라인더의 연마를 한 단계 끼운다.
  // 그라인더가 휠을 만들고 휠이 코일링 기계를 만드는 순서가 여기서 잠긴다.
  event.shaped('kubejs:angled_wheel', [
    ' A ',
    'ABA',
    ' A '
  ], {
    A: 'create:andesite_alloy',
    B: 'minecraft:iron_block'
  }).id('kubejs:crafting/angled_wheel')

  event.remove({ id: 'vintageimprovements:craft/spring_coiling_machine_wheel' })
  event.custom({
    type: 'vintageimprovements:polishing',
    ingredients: [{ item: 'kubejs:angled_wheel' }],
    results: [{ count: 1, id: 'vintageimprovements:spring_coiling_machine_wheel' }],
    processing_time: 200,
    speed_limits: 0
  }).id('kubejs:polishing/spring_coiling_machine_wheel')

  event.remove({ id: 'vintageimprovements:craft/spring_coiling_machine' })
  event.shaped('vintageimprovements:spring_coiling_machine', [
    'I  ',
    'WBS',
    'I  '
  ], {
    I: 'minecraft:iron_ingot',
    W: 'vintageimprovements:spring_coiling_machine_wheel',
    B: BRASS_CASING,
    S: BRASS.shaft
  }).id('kubejs:crafting/spring_coiling_machine')

  // 원본은 #vintageimprovements:springs/iron 태그를 받는다. 아이템으로
  // 못박아 다른 모드의 스프링이 끼어들 여지를 없앤다.
  event.remove({ id: 'vintageimprovements:craft/vacuum_chamber' })
  event.shaped('vintageimprovements:vacuum_chamber', [
    'SBS',
    'APA'
  ], {
    S: IRON_SPRING,
    B: BRASS_CASING,
    A: 'create:andesite_alloy',
    P: 'create:mechanical_pump'
  }).id('kubejs:crafting/vacuum_chamber')

  // 이 시대 후반부의 관문이다. 진동대, 원심분리기, 커빙 프레스, 레이저
  // 넷이 전부 이것을 요구한다.
  event.custom({
    type: 'vintageimprovements:vacuumizing',
    ingredients: [{ item: IRON_SPRING }],
    results: [{ count: 1, id: PRECISE_SPRING }],
    processing_time: 400
  }).id('kubejs:vacuumizing/precision_iron_spring')

  event.remove({ id: 'vintageimprovements:craft/vibrating_table' })
  event.shaped('vintageimprovements:vibrating_table', [
    'PWP',
    'PMP'
  ], {
    P: PRECISE_SPRING,
    W: '#minecraft:wooden_slabs',
    M: 'create:mechanical_piston'
  }).id('kubejs:crafting/vibrating_table')

  event.custom({
    type: 'vintageimprovements:vibrating',
    ingredients: [{ item: 'create:whisk' }],
    results: [{ count: 1, id: 'kubejs:vibrated_whisk' }],
    processing_time: 400
  }).id('kubejs:vibrating/vibrated_whisk')

  // 이 시대에서 가장 비싼 기계다. 결승선 바로 앞에 선다.
  event.remove({ id: 'vintageimprovements:craft/centrifuge' })
  event.shaped('vintageimprovements:centrifuge', [
    'PBP',
    'LSL',
    'PVP'
  ], {
    P: PRECISE_SPRING,
    B: BRASS_CASING,
    L: '#minecraft:logs',
    S: BRASS.shaft,
    V: 'kubejs:vibrated_whisk'
  }).id('kubejs:crafting/centrifuge')

  // 커빙 프레스의 헤드 장착부를 별도 부품으로 뽑아 낸다.
  event.shaped('kubejs:head_mounter', [
    ' H ',
    'HDH',
    ' H '
  ], {
    H: HAUNTED_SHEET,
    D: 'createdeco:andesite_sheet'
  }).id('kubejs:crafting/head_mounter')

  event.remove({ id: 'vintageimprovements:craft/curving_press' })
  event.shaped('vintageimprovements:curving_press', [
    ' B ',
    ' S ',
    'PMP'
  ], {
    B: BRASS_CASING,
    S: BRASS.shaft,
    P: PRECISE_SPRING,
    M: 'kubejs:head_mounter'
  }).id('kubejs:crafting/curving_press')

  // 배치는 원본 그대로다. 톱니바퀴를 황동 티어로, 스프링 태그를 정밀
  // 스프링으로 올렸다. 석영도 태그에서 바닐라 석영으로 좁힌다.
  // mechanical_crafting 쪽 두 번째 경로는 축도 톱니도 쓰지 않아 그대로 둔다.
  event.remove({ id: 'vintageimprovements:craft/laser' })
  event.shaped('vintageimprovements:laser', [
    'CRC',
    'PBS',
    'QLQ'
  ], {
    C: BRASS.cog,
    R: 'minecraft:redstone_block',
    P: 'create:precision_mechanism',
    B: BRASS_CASING,
    S: PRECISE_SPRING,
    Q: 'minecraft:quartz',
    L: 'vintageimprovements:laser_item'
  }).id('kubejs:crafting/laser')

  // 헬브 해머와 선반은 기계식 제작이다. 바닐라 축만 황동 축으로 바꾸고
  // 나머지 배치와 재료는 원본을 그대로 쓴다.
  event.remove({ id: 'vintageimprovements:mechanical_crafting/helve_hammer' })
  event.custom({
    type: 'create:mechanical_crafting',
    accept_mirrored: true,
    key: {
      B: { tag: 'c:storage_blocks/iron' },
      L: { tag: 'minecraft:logs' },
      S: { tag: 'vintageimprovements:springs/iron' },
      C: { item: 'create:andesite_casing' },
      s: { item: BRASS.shaft }
    },
    pattern: [
      ' B SS',
      'BLLLC',
      'BB  s'
    ],
    result: { count: 1, id: 'vintageimprovements:helve_hammer' }
  }).id('kubejs:mechanical_crafting/helve_hammer')

  event.remove({ id: 'vintageimprovements:mechanical_crafting/lathe' })
  event.custom({
    type: 'create:mechanical_crafting',
    accept_mirrored: true,
    key: {
      B: { tag: 'c:storage_blocks/iron' },
      S: { tag: 'vintageimprovements:springs/iron' },
      C: { item: 'create:andesite_casing' },
      s: { item: BRASS.shaft },
      P: { item: 'create:precision_mechanism' },
      A: { item: 'create:andesite_alloy' }
    },
    pattern: [
      ' PSA ',
      'sCCBs',
      '  SA '
    ],
    result: { count: 1, id: 'vintageimprovements:lathe' }
  }).id('kubejs:mechanical_crafting/lathe')

  // ── Create 본체 ───────────────────────────────────────────────────────
  //
  // 드릴, 톱, 수확기는 원본이 안산암 케이싱만 요구해 지난 시대에 열려
  // 버린다. 케이싱을 황동으로 올린다.
  event.remove({ id: 'create:crafting/kinetics/mechanical_saw' })
  event.shaped('create:mechanical_saw', [
    ' S ',
    'SIS',
    ' B '
  ], {
    S: 'create:iron_sheet',
    I: 'minecraft:iron_ingot',
    B: BRASS_CASING
  }).id('kubejs:crafting/mechanical_saw')

  ;[['mechanical_drill', 'create:mechanical_drill'],
    ['mechanical_harvester', 'create:mechanical_harvester']].forEach(([name, out]) => {
    event.remove({ id: `create:crafting/kinetics/${name}` })
    event.shaped(out, [
      ' A ',
      'AIA',
      ' B '
    ], {
      A: 'create:andesite_alloy',
      I: 'minecraft:iron_ingot',
      B: BRASS_CASING
    }).id(`kubejs:crafting/${name}`)
  })

  // 물류 계열은 전부 황동 주괴나 판을 받는다. 주괴는 막지 않기로 했으므로
  // 유령 들린 황동 판으로 바꿔 팬을 다시 거치게 한다. 배치는 원본 그대로다.
  event.remove({ id: 'create:crafting/logistics/brass_funnel' })
  event.shaped(Item.of('create:brass_funnel', 2), [
    ' E ',
    ' H ',
    ' R '
  ], {
    E: ELECTRON_TUBE,
    H: HAUNTED_SHEET,
    R: 'rubberworks:rubber_sheet'
  }).id('kubejs:crafting/brass_funnel')

  event.remove({ id: 'create:crafting/logistics/brass_tunnel' })
  event.shaped(Item.of('create:brass_tunnel', 2), [
    ' E ',
    'HH ',
    'RR '
  ], {
    E: ELECTRON_TUBE,
    H: HAUNTED_SHEET,
    R: 'rubberworks:rubber_sheet'
  }).id('kubejs:crafting/brass_tunnel')

  ;[['smart_chute', 'create:smart_chute', 'create:chute'],
    ['smart_fluid_pipe', 'create:smart_fluid_pipe', 'create:fluid_pipe']].forEach(([name, out, mid]) => {
    event.remove({ id: `create:crafting/kinetics/${name}` })
    event.shaped(out, [
      ' H ',
      ' M ',
      ' E '
    ], { H: HAUNTED_SHEET, M: mid, E: ELECTRON_TUBE }).id(`kubejs:crafting/${name}`)
  })

  event.remove({ id: 'create:crafting/kinetics/brass_hand' })
  event.shaped('create:brass_hand', [
    ' A ',
    'HHH',
    ' H '
  ], {
    A: 'create:andesite_alloy',
    H: HAUNTED_SHEET
  }).id('kubejs:crafting/brass_hand')

  // 전개기는 케이싱도 안산암에서 황동으로 올린다. 조립 라인의 관문이다.
  event.remove({ id: 'create:crafting/kinetics/deployer' })
  event.shaped('create:deployer', [
    ' E ',
    ' B ',
    ' N '
  ], {
    E: ELECTRON_TUBE,
    B: BRASS_CASING,
    N: 'create:brass_hand'
  }).id('kubejs:crafting/deployer')

  // 정밀 기구. 원본 조립 라인이 바닐라 톱니바퀴를 요구하므로 다시 쓴다.
  //
  // 안산암 티어를 쓴다. 조립 라인은 전개기를 요구하고 전개기는 황동
  // 케이싱을 요구하므로 시대 구분은 이미 맞다. 여기서 황동 부품까지
  // 요구하면 이중 관문이 된다.
  event.remove({ id: 'create:sequenced_assembly/precision_mechanism' })
  event.custom({
    type: 'create:sequenced_assembly',
    ingredient: { tag: 'c:plates/gold' },
    loops: 5,
    results: [
      { chance: 120.0, id: 'create:precision_mechanism' },
      { chance: 8.0, id: 'create:golden_sheet' },
      { chance: 8.0, id: 'create:andesite_alloy' },
      { chance: 5.0, id: ANDESITE.cog },
      { chance: 3.0, id: 'minecraft:gold_nugget' },
      { chance: 2.0, id: ANDESITE.shaft },
      { chance: 2.0, id: 'create:crushed_raw_gold' },
      { id: 'minecraft:iron_ingot' },
      { id: 'minecraft:clock' }
    ],
    sequence: [
      {
        type: 'create:deploying',
        ingredients: [{ item: 'create:incomplete_precision_mechanism' }, { item: ANDESITE.cog }],
        results: [{ id: 'create:incomplete_precision_mechanism' }]
      },
      {
        type: 'create:deploying',
        ingredients: [{ item: 'create:incomplete_precision_mechanism' }, { item: ANDESITE.large }],
        results: [{ id: 'create:incomplete_precision_mechanism' }]
      },
      {
        type: 'create:deploying',
        ingredients: [{ item: 'create:incomplete_precision_mechanism' }, { tag: 'c:nuggets/iron' }],
        results: [{ id: 'create:incomplete_precision_mechanism' }]
      }
    ],
    transitional_item: { id: 'create:incomplete_precision_mechanism' }
  }).id('kubejs:sequenced_assembly/precision_mechanism')

  event.remove({ id: 'create:crafting/kinetics/sequenced_gearshift' })
  event.shapeless('create:sequenced_gearshift', [BRASS_CASING, BRASS.cog, ELECTRON_TUBE])
    .id('kubejs:crafting/sequenced_gearshift')

  // ── AE 전력 ───────────────────────────────────────────────────────────
  //
  // ae2-common.toml에서 FE 환율을 사실상 0으로 내려 두었으므로 다른 모드의
  // 발전기로는 AE가 차지 않는다. 운동 에너지 수용기가 유일한 입구다.
  event.remove({ id: 'create_ae_generator:kinetic_acceptor' })
  event.shaped('create_ae_generator:kinetic_acceptor', [
    ' T ',
    'SCS',
    ' F '
  ], {
    T: 'create_ae_generator:stator',
    S: BRASS.shaft,
    C: 'ae2:energy_acceptor',
    F: 'ae2:fluix_crystal'
  }).id('kubejs:crafting/kinetic_acceptor')

  // 충전기는 AE 전력을 먹는다. 그 역할을 테슬라 코일로 옮긴다.
  // 액정 수정 충전은 Crafts & Additions가 이미 기본으로 들고 있다.
  event.remove({ id: 'ae2:network/blocks/crystal_processing_charger' })

  ;[['minecraft:book', 'ae2:guide', 'guide'],
    ['minecraft:compass', 'ae2:meteorite_compass', 'meteorite_compass']].forEach(([from, to, name]) => {
    event.custom({
      type: 'createaddition:charging',
      energy: 1600,
      max_charge_rate: 100,
      ingredients: [{ item: from }],
      results: [{ id: to }]
    }).id(`kubejs:charging/${name}`)
  })

  // 회로 인쇄기의 각인을 커빙 프레스로 옮긴다. 프레스가 자기 자신을 헤드로
  // 써서 복제하는 구조는 AE2 원본과 같다. 첫 프레스는 운석에서만 나온다.
  AE_PRESSES.forEach(([press, seed, printed]) => {
    const name = press.split(':')[1]
    event.custom({
      type: 'vintageimprovements:curving',
      item_as_head: press,
      head_damage: 0,
      ingredients: [{ item: 'minecraft:iron_block' }],
      results: [{ id: press }],
      processing_time: 200
    }).id(`kubejs:curving/${name}`)

    event.custom({
      type: 'vintageimprovements:curving',
      item_as_head: press,
      head_damage: 0,
      ingredients: [{ item: seed }],
      results: [{ id: printed }],
      processing_time: 200
    }).id(`kubejs:curving/${printed.split(':')[1]}`)
  })

  // 회로 압착은 진공실이 맡는다.
  AE_PROCESSORS.forEach(([printed, done]) => {
    event.custom({
      type: 'vintageimprovements:pressurizing',
      heat_requirement: 'heated',
      ingredients: [
        { item: printed },
        { item: 'minecraft:redstone' },
        { item: 'ae2:printed_silicon' }
      ],
      results: [{ count: 1, id: done }],
      processing_time: 400
    }).id(`kubejs:pressurizing/${done.split(':')[1]}`)
  })

  // ── 벌과 원심분리 ─────────────────────────────────────────────────────
  //
  // Productive Bees의 원심분리기 넷을 지우고 Vintage 원심분리기 하나로
  // 모은다. 가공 레시피는 그대로 옮긴다.
  //
  // 원본 325개 중 294개가 이 팩에 없는 모드 조건을 달고 있다. 하드코딩하면
  // 유령 레시피가 쌓이므로 실제로 적재된 것만 훑는다.
  const copied = []
  event.forEachRecipe({ type: 'productivebees:centrifuge' }, r => {
    let j = null
    try {
      j = JSON.parse((r.originalJson || r.json).toString())
    } catch (e) {
      return
    }
    if (!j || !j.ingredient || !j.outputs) return

    // 바닐라 벌집은 건너뛴다. Vintage가 이미 꿀 100mb로 바꾸는 레시피를
    // 들고 있고, 그쪽이 Create의 꿀을 내주므로 이 팩에서 더 쓸모가 있다.
    // 같은 입력에 레시피가 둘이면 기계가 어느 쪽을 고를지 알 수 없다.
    if (j.ingredient.item === 'minecraft:honeycomb') return

    const results = []
    j.outputs.forEach(o => {
      const it = o.item
      if (!it) return
      const id = it.item || it.id
      if (!id) return
      const row = { id: id, count: it.count || 1 }
      if (o.chance !== undefined && o.chance < 1) row.chance = o.chance
      results.push(row)
    })

    // 유체 산출물. Create의 가공 결과는 아이템과 유체를 같은 배열에 담는다.
    // 태그로 적힌 것은 이 팩에 없는 모드 것이라 버린다.
    if (j.fluid && j.fluid.fluid && j.fluid.amount) {
      results.push({ id: j.fluid.fluid, amount: j.fluid.amount })
    }
    if (!results.length) return

    const bee = (j.ingredient.components || {})['productivebees:bee_type'] || ''

    // 모드는 벌집 낱개(configurable_honeycomb)와 벌집 블록(configurable_comb)
    // 양쪽에 레시피를 둔다. 둘은 산출물이 아예 다르므로 배수 관계가 아니다.
    // 벌 종류가 같아 ID가 겹치니 입력 종류로 갈라 둔다.
    const items = String(j.ingredient.items || j.ingredient.item || '')
    const isBlock = items.indexOf('configurable_comb') >= 0

    copied.push({ ingredient: j.ingredient, results: results, bee: bee, isBlock: isBlock })
  })

  const COMB_SKIP = ['productivebees:breeze', 'productivebees:blazing']

  copied.forEach((c, i) => {
    const name = c.bee ? c.bee.split(':').pop() : `entry_${i}`

    // 모드가 이미 들고 있던 Comb Block 판본은 블록 규격으로 옮긴다.
    if (c.isBlock) {
      event.custom({
        type: 'vintageimprovements:centrifugation',
        ingredients: [c.ingredient],
        results: c.results,
        processing_time: 100,
        minimal_rpm: 128
      }).id(`kubejs:centrifugation/comb/${name}`)
      return
    }

    event.custom({
      type: 'vintageimprovements:centrifugation',
      ingredients: [c.ingredient],
      results: c.results,
      processing_time: 50,
      minimal_rpm: 64
    }).id(`kubejs:centrifugation/honeycomb/${name}`)

    // Comb Block 판본. 생산물이 열 배지만 두 배 오래 걸리고 128 RPM을
    // 요구한다. 황동 티어 상한이 64이므로 강철 축이 나와야 돌릴 수 있다.
    // comb_breeze와 comb_blazing 둘은 모드가 이미 들고 있어 건너뛴다.
    if (!c.bee || COMB_SKIP.indexOf(c.bee) >= 0) return
    const comb = {
      type: c.ingredient.type,
      components: c.ingredient.components,
      items: 'productivebees:configurable_comb'
    }
    event.custom({
      type: 'vintageimprovements:centrifugation',
      ingredients: [comb],
      results: c.results.map(r => {
        if (r.amount !== undefined) return { id: r.id, amount: r.amount * 10 }
        const row = { id: r.id, count: r.count * 10 }
        if (r.chance !== undefined) row.chance = r.chance
        return row
      }),
      processing_time: 100,
      minimal_rpm: 128
    }).id(`kubejs:centrifugation/comb/${name}`)
  })

  // 모드가 들고 있는 원본 원심분리 레시피는 minimal_rpm을 생략해 스키마
  // 기본값 100이 걸린다. 황동 티어 상한이 64라 그대로 두면 이 시대에서는
  // 하나도 돌지 않는다. 지우고 64를 박아 다시 넣는다.
  const originals = []
  event.forEachRecipe({ type: 'vintageimprovements:centrifugation' }, r => {
    let id = null
    try {
      id = (r.getOrCreateId ? r.getOrCreateId() : r.id).toString()
    } catch (e) {
      return
    }
    if (!id || id.indexOf('vintageimprovements:') !== 0) return
    let j = null
    try {
      j = JSON.parse((r.originalJson || r.json).toString())
    } catch (e) {
      return
    }
    if (!j || j.minimal_rpm !== undefined) return
    originals.push({ id: id, json: j })
  })

  originals.forEach(o => {
    event.remove({ id: o.id })
    o.json.minimal_rpm = 64
    event.custom(o.json).id('kubejs:' + o.id.split(':')[1])
  })

  console.info(`[황동 시대] 원심분리 레시피 ${copied.length}개를 옮기고 ` +
    `원본 ${originals.length}개의 최소 RPM을 64로 내렸다.`)

  // 벌통에서 나오는 원심분리기 셋을 지운다. Vintage 원심분리기만 쓴다.
  ;[
    'productivebees:centrifuge_cauldron',
    'productivebees:centrifuge',
    'productivebees:powered_centrifuge/vanilla',
    'productivebees:heated_centrifuge'
  ].forEach(id => event.remove({ id: id }))

  // ── 강철 ──────────────────────────────────────────────────────────────
  //
  // 정제 코크스가 이 시대의 관문이다. 원심분리기가 있어야 나오고,
  // 위 가공 사슬 전체가 이 하나로 수렴한다.
  event.custom({
    type: 'vintageimprovements:centrifugation',
    ingredients: [{ item: 'createmetallurgy:coke' }],
    results: [{ count: 1, id: 'kubejs:refined_coke' }],
    processing_time: 100,
    minimal_rpm: 64
  }).id('kubejs:centrifugation/refined_coke')

  // 원본 합금은 #c:coal_coke 태그를 받는다. 그 태그에 코크스 하나뿐이라
  // 아이템으로 못박아도 잃는 것이 없고, 대신 원심분리를 건너뛸 길이 사라진다.
  //
  // Petrochem의 철 주괴 + 석탄 혼합은 강철을 그냥 내주므로 함께 지운다.
  // 석유 코크스 우회는 증류탑 제어기가 #c:plates/steel을 요구해 스스로 막힌다.
  event.remove({ id: 'createmetallurgy:alloying/steel' })
  event.remove({ id: 'petrochem:mixing/steel_alloy_coal' })
  event.custom({
    type: 'createmetallurgy:alloying',
    heat_requirement: 'heated',
    ingredients: [
      { item: 'kubejs:refined_coke' },
      { type: 'neoforge:single', amount: 270, fluid: 'createmetallurgy:molten_iron' }
    ],
    processing_time: 40,
    results: [{ amount: 270, id: 'createmetallurgy:molten_steel' }]
  }).id('kubejs:alloying/steel')

  // 이 시대의 결승선.
  event.custom({
    type: 'create:item_application',
    ingredients: [{ item: 'create:andesite_casing' }, { tag: 'c:plates/steel' }],
    results: [{ id: 'kubejs:steel_casing' }]
  }).id('kubejs:item_application/steel_casing')
})
