ServerEvents.recipes(event => {
  // 동력 전달 부품을 Create Tiers의 티어 부품으로 옮긴다.
  //
  // Create Tiers는 티어별 축과 톱니바퀴, 기어박스를 동적으로 만들어 주지만
  // 제작법은 하나도 넣지 않는다. 그래서 티어 부품은 존재하되 얻을 방법이
  // 없는 상태였다. 여기서 그 제작법을 정의한다.
  //
  // 첫 단계로 Crude만 다룬다. 원본 Create 부품의 제작법을 그대로 물려받아
  // 재료와 수량, 공정을 바꾸지 않는다. 플레이어 입장에서는 만드는 방법이
  // 같고 결과물만 Crude 부품으로 바뀐다. 상위 티어는 이 위에 얹는다.
  const V = {
    shaft: 'create:shaft',
    cog: 'create:cogwheel',
    large: 'create:large_cogwheel',
    gearbox: 'create:gearbox',
    vertical: 'create:vertical_gearbox'
  }
  const C = {
    shaft: 'createtiers:shaft_crude',
    cog: 'createtiers:cogwheel_crude',
    large: 'createtiers:large_cogwheel_crude',
    gearbox: 'createtiers:gearbox_crude',
    vertical: 'createtiers:vertical_gearbox_crude'
  }

  // 원본 제작법 제거. 결과물이 아니라 레시피 ID로 지정한다.
  const REMOVED = [
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
    'create:crafting/kinetics/vertical_gearbox_from_conversion'
  ]
  REMOVED.forEach(id => event.remove({ id: id }))

  // 축: 안산암 합금 2개를 세로로 놓아 8개
  event.shaped(Item.of(C.shaft, 8), [
    'A',
    'A'
  ], { A: 'create:andesite_alloy' }).id('kubejs:crafting/shaft_crude')

  // 축: 기계식 톱으로 안산암 합금을 켜서 6개
  event.custom({
    type: 'create:cutting',
    ingredients: [{ item: 'create:andesite_alloy' }],
    processing_time: 200,
    results: [{ count: 6, id: C.shaft }]
  }).id('kubejs:cutting/shaft_crude')

  // 톱니바퀴: 축 + 판자
  event.shapeless(C.cog, [C.shaft, '#minecraft:planks'])
    .id('kubejs:crafting/cogwheel_crude')

  event.custom({
    type: 'create:deploying',
    ingredients: [{ item: C.shaft }, { tag: 'minecraft:planks' }],
    results: [{ id: C.cog }]
  }).id('kubejs:deploying/cogwheel_crude')

  // 큰 톱니바퀴: 축 + 판자 2개, 또는 톱니바퀴 + 판자
  event.shapeless(C.large, [C.shaft, '#minecraft:planks', '#minecraft:planks'])
    .id('kubejs:crafting/large_cogwheel_crude')

  event.shapeless(C.large, [C.cog, '#minecraft:planks'])
    .id('kubejs:crafting/large_cogwheel_crude_from_little')

  event.custom({
    type: 'create:deploying',
    ingredients: [{ item: C.cog }, { tag: 'minecraft:planks' }],
    results: [{ id: C.large }]
  }).id('kubejs:deploying/large_cogwheel_crude')

  // 기어박스: 톱니바퀴 4개로 안산암 케이싱을 감싼다
  event.shaped(C.gearbox, [
    ' C ',
    'CBC',
    ' C '
  ], {
    B: 'create:andesite_casing',
    C: C.cog
  }).id('kubejs:crafting/gearbox_crude')

  // 수직 기어박스: 톱니바퀴를 네 모서리에
  event.shaped(C.vertical, [
    'C C',
    ' B ',
    'C C'
  ], {
    B: 'create:andesite_casing',
    C: C.cog
  }).id('kubejs:crafting/vertical_gearbox_crude')

  // 두 기어박스는 서로 오갈 수 있다
  event.shapeless(C.gearbox, [C.vertical]).id('kubejs:crafting/gearbox_crude_from_conversion')
  event.shapeless(C.vertical, [C.gearbox]).id('kubejs:crafting/vertical_gearbox_crude_from_conversion')

  console.info(`[동력 티어] Crude 부품 제작법 11개 추가, 원본 ${REMOVED.length}개 제거`)
})
