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

  filings.forEach(([filing, , metal, molten]) => {
    event.custom({
      type: 'createmetallurgy:melting',
      heat_requirement: 'lowheated',
      ingredients: [{ item: filing }],
      processing_time: 40,
      results: [{ amount: 45, id: molten }]
    }).id(`kubejs:melting/${metal}_filings`)
  })
})
