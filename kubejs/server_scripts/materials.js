ServerEvents.recipes(event => {
  event.shaped('kubejs:mortar', [
    '  B',
    ' D '
  ], {
    B: 'minecraft:bone',
    D: 'minecraft:bowl'
  }).id('kubejs:crafting/mortar')

  const filings = [
    ['kubejs:iron_filings', 'minecraft:raw_iron', 'iron'],
    ['kubejs:copper_filings', 'minecraft:raw_copper', 'copper'],
    ['kubejs:gold_filings', 'minecraft:raw_gold', 'gold'],
    ['kubejs:zinc_filings', 'create:raw_zinc', 'zinc'],
    ['kubejs:wolframite_filings', 'createmetallurgy:raw_tungsten', 'wolframite']
  ]

  filings.forEach(([output, rawOre, metal]) => {
    event.shapeless(output, [rawOre, 'kubejs:mortar'])
      .damageIngredient('kubejs:mortar')
      .id(`kubejs:crafting/${metal}_filings`)
  })
})
