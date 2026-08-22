// 석기 시대.
//
// 목표는 안산암 케이싱이다. 안산암과 아연을 캐서 야금 설비를 세우고,
// 갈아서 녹이고 합금해서 주조하는 한 줄을 완주하면 도달한다.
//
// 동력은 손 크랭크와 손 톱니바퀴까지만 다룬다. 맷돌이 이 시대의 유일한
// 가공 기계이며, 나머지는 전부 열과 손으로 처리한다.

// 거푸집 체계는 molds.js에서 다룬다.

ServerEvents.recipes(event => {
  const MI = 'kubejs:manufactured_iron_block'

  // ── 산업용 철 블록 승급 ────────────────────────────────────────────────
  //
  // Create의 산업용 철 블록은 석재 절단으로 철 주괴 1개에서 2개가 나온다.
  // 야금 기계를 그것으로 지으면 설비 전체가 철 17개로 끝난다.
  // 아연을 한 겹 얹어 이 시대의 필수 자원과 묶는다.
  //
  // 블록을 놓고 아연 주괴를 들고 우클릭하면 된다. 제작대를 쓰지 않는다.
  event.custom({
    type: 'create:item_application',
    ingredients: [
      { item: 'create:industrial_iron_block' },
      { tag: 'c:ingots/zinc' }
    ],
    results: [{ id: MI }]
  }).id('kubejs:item_application/manufactured_iron_block')

  // ── 동력 ──────────────────────────────────────────────────────────────
  //
  // 손 크랭크의 원본은 안산암 합금을 요구한다. 합금이 이 시대의 목표이므로
  // 순환이 생긴다. 안산암 원석으로 내려 첫 동력을 합금보다 앞에 둔다.
  event.remove({ id: 'create:crafting/kinetics/hand_crank' })

  event.shaped('create:hand_crank', [
    'PPP',
    '  A'
  ], {
    P: '#minecraft:planks',
    A: 'minecraft:andesite'
  }).id('kubejs:crafting/hand_crank')

  // 손 톱니바퀴의 원본은 Create 톱니바퀴를 요구하고, 톱니바퀴는 다시
  // 안산암 합금을 요구한다. 같은 순환이므로 손 크랭크에서 잇는다.
  event.remove({ id: 'createhandcogwheel:hand_cogwheel' })

  event.shapeless('createhandcogwheel:hand_cogwheel', [
    'create:hand_crank',
    'minecraft:andesite',
    '#minecraft:planks'
  ]).id('kubejs:crafting/hand_cogwheel')

  // ── 맷돌 ──────────────────────────────────────────────────────────────
  //
  // 원본은 톱니바퀴와 안산암 케이싱을 요구한다. 케이싱은 이 시대의 결승선이라
  // 맷돌이 시대의 끝에 놓이게 된다. 나무와 돌만으로 내려 첫 가공 기계로 만든다.
  event.remove({ id: 'create:crafting/kinetics/millstone' })

  event.shaped('create:millstone', [
    'LLL',
    'SCS',
    'SSS'
  ], {
    L: '#c:stripped_logs',
    S: '#c:stones',
    C: '#c:cobblestones'
  }).id('kubejs:crafting/millstone')

  // ── 야금 설비 ─────────────────────────────────────────────────────────
  //
  // 여섯 종 모두 원본은 안산암 합금이나 강화 판금을 요구한다. 승급 철 블록으로
  // 바꿔 합금 이전에 지을 수 있게 한다. 블록 34개, 즉 철 17개와 아연 34개다.

  // 내화 모르타르는 원본이 혼합기(모래 2 + 점토 1 + 물 100mb)를 요구한다.
  // 혼합기는 안산암 케이싱을 먹으므로 이 시대에는 없다. 재료를 더 들이는 대신
  // 손으로 만들 수 있게 한다. 물 양동이는 바닐라 규칙에 따라 빈 양동이로 돌아온다.
  event.shapeless('createmetallurgy:refractory_mortar', [
    '#c:sands', '#c:sands', '#c:sands', '#c:sands',
    'minecraft:water_bucket',
    'minecraft:clay_ball', 'minecraft:clay_ball', 'minecraft:clay_ball', 'minecraft:clay_ball'
  ]).id('kubejs:crafting/refractory_mortar')

  event.remove({ id: 'createmetallurgy:crafting/content/foundry_basin' })
  event.shaped('createmetallurgy:foundry_basin', [
    'M M',
    'MRM',
    'MMM'
  ], {
    M: MI,
    R: 'createmetallurgy:refractory_mortar'
  }).id('kubejs:crafting/foundry_basin')

  event.remove({ id: 'createmetallurgy:crafting/content/foundry_lid' })
  event.shaped('createmetallurgy:foundry_lid', [
    'MMM',
    'M M'
  ], { M: MI }).id('kubejs:crafting/foundry_lid')

  event.remove({ id: 'createmetallurgy:crafting/content/casting_basin' })
  event.shaped('createmetallurgy:casting_basin', [
    'M M',
    'M M',
    ' M '
  ], { M: MI }).id('kubejs:crafting/casting_basin')

  event.remove({ id: 'createmetallurgy:crafting/content/casting_table' })
  event.shaped('createmetallurgy:casting_table', [
    'MMM',
    'M M',
    'M M'
  ], { M: MI }).id('kubejs:crafting/casting_table')

  event.remove({ id: 'createmetallurgy:crafting/content/sturdy_whisk' })
  event.shaped('createmetallurgy:sturdy_whisk', [
    ' A ',
    'MAM',
    'MMM'
  ], {
    A: 'minecraft:andesite',
    M: MI
  }).id('kubejs:crafting/sturdy_whisk')

  // 믹서만 승급 철을 쓰지 않는다. 나무와 구리로 짜서 다른 설비와 결을 나눈다.
  event.remove({ id: 'createmetallurgy:crafting/content/foundry_mixer' })
  event.shaped('createmetallurgy:foundry_mixer', [
    'PAP',
    'CLC',
    ' W '
  ], {
    P: '#minecraft:planks',
    A: 'minecraft:andesite',
    C: '#c:ingots/copper',
    L: '#c:stripped_logs',
    W: 'createmetallurgy:sturdy_whisk'
  }).id('kubejs:crafting/foundry_mixer')

  // ── 열원 ──────────────────────────────────────────────────────────────
  //
  // 기초 버너의 원본은 안산암 합금 3개다. 용해로의 열원인데 합금이 용해로에서
  // 나오므로 순환이 생긴다. 승급 철로 바꿔 합금보다 앞에 둔다.
  event.remove({ id: 'createlowheated:basic_burner' })
  event.shaped('createlowheated:basic_burner', [
    'M M',
    ' M '
  ], { M: MI }).id('kubejs:crafting/basic_burner')

  // ── 분쇄 ──────────────────────────────────────────────────────────────
  //
  // 원본 안산암 밀링은 조약돌을 뱉는다. 가루로 바꿔 용해 라인의 입구로 만든다.
  // 처리 시간은 설계 문서에 없어 Create의 통상값을 따랐다.
  event.remove({ id: 'create:milling/andesite' })

  event.custom({
    type: 'create:milling',
    ingredients: [{ item: 'minecraft:andesite' }],
    processing_time: 100,
    results: [{ id: 'kubejs:andesite_dust' }]
  }).id('kubejs:milling/andesite_dust')

  // Metallurgy의 아연 가루는 아이템만 있고 만드는 레시피가 없었다.
  // Create에도 원광 아연 밀링이 없으므로 충돌하지 않는다.
  event.custom({
    type: 'create:milling',
    ingredients: [{ tag: 'c:raw_materials/zinc' }],
    processing_time: 200,
    results: [{ id: 'createmetallurgy:zinc_dust' }]
  }).id('kubejs:milling/zinc_dust')

  // ── 용해와 합금 ───────────────────────────────────────────────────────
  //
  // 가루 하나가 45mb다. 합금 1개에 90mb가 들어가므로 안산암 1개와
  // 원광 아연 1개가 합금 1개가 된다. Create 기본(안산암 1 + 아연 너깃 1)
  // 대비 아연을 아홉 배 쓴다.
  event.custom({
    type: 'createmetallurgy:melting',
    heat_requirement: 'lowheated',
    ingredients: [{ item: 'kubejs:andesite_dust' }],
    processing_time: 40,
    results: [{ amount: 45, id: 'kubejs:molten_andesite' }]
  }).id('kubejs:melting/andesite_dust')

  event.custom({
    type: 'createmetallurgy:melting',
    heat_requirement: 'lowheated',
    ingredients: [{ item: 'createmetallurgy:zinc_dust' }],
    processing_time: 40,
    results: [{ amount: 45, id: 'createmetallurgy:molten_zinc' }]
  }).id('kubejs:melting/zinc_dust')

  event.custom({
    type: 'createmetallurgy:alloying',
    heat_requirement: 'lowheated',
    ingredients: [
      { type: 'neoforge:single', amount: 45, fluid: 'createmetallurgy:molten_zinc' },
      { type: 'neoforge:single', amount: 45, fluid: 'kubejs:molten_andesite' }
    ],
    processing_time: 40,
    results: [{ amount: 90, id: 'kubejs:molten_andesite_alloy' }]
  }).id('kubejs:alloying/andesite_alloy')

  // ── 주조 ──────────────────────────────────────────────────────────────
  //
  // 안산암 합금은 Metallurgy가 다루지 않는 금속이라 주조 레시피를 직접 넣는다.
  // 흑연과 내화 두 등급을 모두 정의한다. 다른 금속의 내화 판본은 molds.js가
  // 기본 레시피를 훑어 자동으로 만든다.
  event.custom({
    type: 'createmetallurgy:casting_in_table',
    ingredients: [
      { type: 'neoforge:single', amount: 90, fluid: 'kubejs:molten_andesite_alloy' },
      { item: 'createmetallurgy:graphite_ingot_mold' }
    ],
    processing_time: 60,
    result: { item: { count: 1, id: 'create:andesite_alloy' } }
  }).id('kubejs:casting_in_table/andesite_alloy_graphite')

  // mold_consumed로 거푸집이 주조 한 번마다 사라진다.
  event.custom({
    type: 'createmetallurgy:casting_in_table',
    ingredients: [
      { type: 'neoforge:single', amount: 90, fluid: 'kubejs:molten_andesite_alloy' },
      { item: 'kubejs:refractory_mortar_ingot_mold' }
    ],
    processing_time: 60,
    mold_consumed: true,
    result: { item: { count: 1, id: 'create:andesite_alloy' } }
  }).id('kubejs:casting_in_table/andesite_alloy')

  // ── 우회로 차단 ───────────────────────────────────────────────────────
  //
  // 팩 전체를 훑어 안산암 합금을 만드는 레시피 여섯 개를 확인했다.
  // 그중 넷을 막는다. 나머지 둘은 혼합기 레시피인데, 혼합기가 안산암 케이싱을
  // 요구하므로 이 시대에는 닿지 않는다. 다음 시대에 합금이 싸지는 것은 의도다.
  ;[
    'create:crafting/materials/andesite_alloy',
    'create:crafting/materials/andesite_alloy_from_zinc',
    'createmetallurgy:casting_in_basin/andesite_alloy_from_iron',
    'createmetallurgy:casting_in_basin/andesite_alloy_from_zinc'
  ].forEach(id => event.remove({ id: id }))
})
