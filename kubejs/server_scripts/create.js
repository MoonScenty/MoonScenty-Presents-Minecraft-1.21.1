ServerEvents.recipes(event => {
  // 손 크랭크는 첫 동력원이라 안산암 합금보다 앞 단계에 있어야 한다.
  // 재료를 아연 주괴로 바꿔 합금 공정 없이도 만들 수 있게 한다.
  event.remove({ id: 'create:crafting/kinetics/hand_crank' })

  event.shaped('create:hand_crank', [
    '   ',
    'PPP',
    '  Z'
  ], {
    P: '#minecraft:planks',
    Z: '#c:ingots/zinc'
  }).id('kubejs:crafting/hand_crank')

  // 설치된 산업용 철 블록에 아연 주괴를 들고 우클릭하면 제조된 철 블록이 된다.
  // 첫 재료가 대상 블록, 둘째가 손에 든 아이템이다.
  event.custom({
    type: 'create:item_application',
    ingredients: [
      { item: 'create:industrial_iron_block' },
      { tag: 'c:ingots/zinc' }
    ],
    results: [
      { id: 'kubejs:manufactured_iron_block' }
    ]
  }).id('kubejs:item_application/manufactured_iron_block')
})
