// 주조로 뽑는 도구 머리.
//
// 거푸집에 쇳물을 부어 만들고, 막대와 합쳐 Reforged 도구가 된다.
// 네더라이트는 머리를 주조하지 않는다. 강철 도구를 대장장이 형판으로 승급시킨다.
//
// 티어 대응: 안산암 합금=돌, 구리=철, 황동=금, 강철=다이아
const HEAD_MATERIALS = [
  ['andesite_alloy', 'Andesite Alloy'],
  ['copper', 'Copper'],
  ['brass', 'Brass'],
  ['steel', 'Steel']
]

const HEAD_SHAPES = [
  ['pickaxe', 'Pickaxe'],
  ['axe', 'Axe'],
  ['shovel', 'Shovel'],
  ['hoe', 'Hoe'],
  ['sword', 'Sword']
]

StartupEvents.registry('item', event => {
  HEAD_MATERIALS.forEach(([matId, matName]) => {
    HEAD_SHAPES.forEach(([headId, headName]) => {
      event.create(`${matId}_${headId}_head`)
        .displayName(`${matName} ${headName} Head`)
    })
  })
})
