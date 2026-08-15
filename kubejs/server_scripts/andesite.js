ServerEvents.recipes(event => {
  // 안산암 -> 용융 안산암
  event.custom({
    type: 'createmetallurgy:melting',
    heat_requirement: 'lowheated',
    ingredients: [{ item: 'minecraft:andesite' }],
    processing_time: 40,
    results: [{ amount: 90, id: 'kubejs:molten_andesite' }]
  }).id('kubejs:melting/andesite')

  // 용융 안산암 + 용융 아연 -> 용융 안산암 합금
  // 주괴 90mb 기준으로 합금 1개당 아연 20mb(= 너깃 2개)가 들어간다.
  // Create 기본 제작법(안산암 1 + 아연 너깃 1)의 두 배로, expert 난이도에 맞춘 값이다.
  event.custom({
    type: 'createmetallurgy:alloying',
    heat_requirement: 'lowheated',
    ingredients: [
      { type: 'neoforge:single', amount: 180, fluid: 'kubejs:molten_andesite' },
      { type: 'neoforge:single', amount: 40, fluid: 'createmetallurgy:molten_zinc' }
    ],
    processing_time: 40,
    results: [{ amount: 180, id: 'kubejs:molten_andesite_alloy' }]
  }).id('kubejs:alloying/andesite_alloy')

  // 용융 안산암 합금 -> 안산암 합금 (주괴 거푸집)
  event.custom({
    type: 'createmetallurgy:casting_in_table',
    ingredients: [
      { type: 'neoforge:single', amount: 90, fluid: 'kubejs:molten_andesite_alloy' },
      { item: 'createmetallurgy:graphite_ingot_mold' }
    ],
    processing_time: 60,
    result: { item: { count: 1, id: 'create:andesite_alloy' } }
  }).id('kubejs:casting_in_table/andesite_alloy')
})
