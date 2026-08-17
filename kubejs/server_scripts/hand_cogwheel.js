ServerEvents.recipes(event => {
  // 손 톱니바퀴의 기본 제작법은 Create 톱니바퀴를 요구한다.
  // 그런데 톱니바퀴는 안산암 합금이 있어야 만들 수 있고,
  // 안산암 합금은 석기 시대의 목표다. 순환이 생기므로 판자로 바꾼다.
  event.remove({ output: 'createhandcogwheel:hand_cogwheel' })

  event.shapeless('createhandcogwheel:hand_cogwheel', [
    'create:hand_crank',
    '#minecraft:planks'
  ]).id('kubejs:crafting/hand_cogwheel')
})
