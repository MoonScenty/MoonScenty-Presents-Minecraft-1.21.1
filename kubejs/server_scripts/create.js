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
})
