ServerEvents.recipes(event => {
  // 케이싱은 원목에 금속을 대기만 하면 되므로 시대와 무관하게 만들 수 있다.
  // 구리 케이싱이 석기 시대에 나오면 화로 엔진을 시대 관문으로 쓸 수 없다.
  //
  // 상위 케이싱은 하위 케이싱에서 올리도록 바꾼다. Create가 열차 케이싱을
  // 황동 케이싱에서 만드는 것과 같은 방식이다.
  //
  //   원목 + 안산암 합금      -> 안산암 케이싱
  //   안산암 케이싱 + 구리    -> 구리 케이싱
  //   구리 케이싱 + 황동      -> 황동 케이싱
  //
  // 안산암 케이싱은 어느 모드에도 주조 경로가 없으므로 사슬의 시작점이 지켜진다.
  const CHAIN = [
    { base: 'create:andesite_casing', ingot: 'c:ingots/copper', molten: 'createmetallurgy:molten_copper', result: 'create:copper_casing', name: 'copper' },
    { base: 'create:copper_casing', ingot: 'c:ingots/brass', molten: 'createmetallurgy:molten_brass', result: 'create:brass_casing', name: 'brass' }
  ]

  CHAIN.forEach(c => {
    // 원목에서 바로 만드는 경로를 모두 없앤다.
    event.remove({ id: `create:item_application/${c.name}_casing_from_log` })
    event.remove({ id: `create:item_application/${c.name}_casing_from_wood` })
    event.remove({ id: `createmetallurgy:casting_in_basin/${c.name}_casing` })

    // 전개기 경로: 하위 케이싱에 주괴를 댄다.
    event.custom({
      type: 'create:item_application',
      ingredients: [
        { item: c.base },
        { tag: c.ingot }
      ],
      results: [{ id: c.result }]
    }).id(`kubejs:item_application/${c.name}_casing`)

    // 주조 경로도 같은 사슬을 따르게 한다. Metallurgy 쪽 공정을 막지 않고
    // 재료만 하위 케이싱으로 올려서, 야금 라인을 쓰는 사람도 순서를 지키게 된다.
    event.custom({
      type: 'createmetallurgy:casting_in_basin',
      ingredients: [
        { type: 'neoforge:single', amount: 90, fluid: c.molten },
        { item: c.base }
      ],
      mold_consumed: true,
      processing_time: 70,
      result: { item: { count: 1, id: c.result } }
    }).id(`kubejs:casting_in_basin/${c.name}_casing`)
  })
})
