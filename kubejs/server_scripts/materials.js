ServerEvents.recipes(event => {
  event.shaped('kubejs:mortar', [
    '  B',
    ' D '
  ], {
    B: 'minecraft:bone',
    D: 'minecraft:bowl'
  }).id('kubejs:crafting/mortar')

  const filings = [
    ['kubejs:iron_filings', 'minecraft:raw_iron', 'iron', 'createmetallurgy:molten_iron'],
    ['kubejs:copper_filings', 'minecraft:raw_copper', 'copper', 'createmetallurgy:molten_copper'],
    ['kubejs:gold_filings', 'minecraft:raw_gold', 'gold', 'createmetallurgy:molten_gold'],
    ['kubejs:zinc_filings', 'create:raw_zinc', 'zinc', 'createmetallurgy:molten_zinc'],
    ['kubejs:wolframite_filings', 'createmetallurgy:raw_tungsten', 'wolframite', 'createmetallurgy:molten_tungsten']
  ]

  filings.forEach(([output, rawOre, metal]) => {
    event.shapeless(output, [rawOre, 'kubejs:mortar'])
      .damageIngredient('kubejs:mortar')
      .id(`kubejs:crafting/${metal}_filings`)
  })

  // 부스러기 용해는 열 등급에 따라 회수량이 달라진다.
  //
  //   기초 버너(lowheated)   45mb   주괴 절반. 초반에는 손해를 감수한다.
  //   블레이즈 버너(heated)  90mb   주괴 한 개. 손실 없이 회수한다.
  //
  // 초반에는 원광을 갈아 쓰느라 절반을 버리지만, 버너를 갖추고 나면
  // 분쇄 부산물로 들어온 부스러기를 온전히 되돌릴 수 있다.
  const MELT = [
    ['lowheated', 45, 40],
    ['heated', 90, 30]
  ]

  filings.forEach(([filing, , metal, molten]) => {
    MELT.forEach(([heat, amount, time]) => {
      event.custom({
        type: 'createmetallurgy:melting',
        heat_requirement: heat,
        ingredients: [{ item: filing }],
        processing_time: time,
        results: [{ amount: amount, id: molten }]
      }).id(`kubejs:melting/${metal}_filings_${heat}`)
    })
  })
})
