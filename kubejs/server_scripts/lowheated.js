ServerEvents.recipes(event => {
  // 기초 버너는 lowheated 제련의 열원이라 안산암 합금보다 앞에 있어야 한다.
  // 합금은 용해로에서 나오고 용해로는 이 버너를 필요로 하므로,
  // 기본 재료인 안산암 합금을 그대로 두면 순환이 생긴다.
  event.remove({ id: 'createlowheated:basic_burner' })

  event.shaped('createlowheated:basic_burner', [
    '   ',
    'Z Z',
    ' Z '
  ], {
    Z: '#c:ingots/zinc'
  }).id('kubejs:crafting/basic_burner')
})
