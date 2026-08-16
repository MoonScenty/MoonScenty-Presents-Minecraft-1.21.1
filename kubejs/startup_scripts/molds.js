// 도구 머리 주조용 거푸집.
//
// 거푸집은 모양만 정의하고 금속과 무관하다. 곡괭이 거푸집 하나로
// 안산암 합금부터 강철까지 전부 뽑을 수 있다.
//
// 두 등급으로 나눈다.
//   내화 모르타르 - 주조 1회로 소모된다. 싸지만 매번 다시 만들어야 한다.
//   흑연         - 재사용된다. 비싼 대신 한 번 만들면 계속 쓴다.
//
// 손잡이는 바닐라 막대를 쓰므로 별도 거푸집이 없다.
// 네더라이트는 머리를 주조하지 않고 대장장이 형판으로 승급시킨다.
const MOLD_SHAPES = [
  ['pickaxe', 'Pickaxe'],
  ['axe', 'Axe'],
  ['shovel', 'Shovel'],
  ['hoe', 'Hoe'],
  ['sword', 'Sword']
]

StartupEvents.registry('item', event => {
  MOLD_SHAPES.forEach(([id, name]) => {
    event.create(`refractory_mortar_${id}_mold`)
      .displayName(`Refractory Mortar ${name} Mold`)

    event.create(`graphite_${id}_mold`)
      .displayName(`Graphite ${name} Mold`)
  })
})
