StartupEvents.registry('item', event => {
  event.create('mortar')
    .displayName('Mortar')
    .maxDamage(16)
    .texture('kubejs:item/mortar')

  event.create('iron_filings')
    .displayName('Iron Filings')
    .texture('kubejs:item/iron_filings')

  event.create('copper_filings')
    .displayName('Copper Filings')
    .texture('kubejs:item/copper_filings')

  event.create('gold_filings')
    .displayName('Gold Filings')
    .texture('kubejs:item/gold_filings')

  event.create('zinc_filings')
    .displayName('Zinc Filings')
    .texture('kubejs:item/zinc_filings')

  event.create('wolframite_filings')
    .displayName('Wolframite Filings')
    .texture('kubejs:item/wolframite_filings')

  // 주조 1회로 소모되는 거푸집. 쇳물을 담으므로 내화 재료로 만든다.
  event.create('refractory_mortar_mold')
    .displayName('Refractory Mortar Mold')
    .texture('kubejs:item/refractory_mortar_mold')
})
