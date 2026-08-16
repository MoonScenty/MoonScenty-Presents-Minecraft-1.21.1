const TOOL_HEADS = ['pickaxe', 'axe', 'shovel', 'hoe', 'sword']

// 흑연 거푸집은 Metallurgy의 기존 체계를 그대로 쓴다.
// 거푸집끼리 석재 절단으로 서로 형태를 바꾸는 방식이므로,
// 우리 도구 거푸집도 같은 태그에 넣어 그 안에 포함시킨다.
ServerEvents.tags('item', event => {
  TOOL_HEADS.forEach(head => {
    event.add('createmetallurgy:graphite_molds', `kubejs:graphite_${head}_mold`)
  })
})

ServerEvents.recipes(event => {
  // 내화 모르타르 거푸집: 블록 하나를 깎아 형태를 잡는다. 주조 1회로 소모된다.
  TOOL_HEADS.forEach(head => {
    event.stonecutting(`kubejs:refractory_mortar_${head}_mold`, 'createmetallurgy:refractory_mortar')
      .id(`kubejs:stonecutting/refractory_mortar_${head}_mold`)
  })

  // 흑연 도구 거푸집: 다른 흑연 거푸집을 깎아 형태를 바꾼다. 소모되지 않는다.
  TOOL_HEADS.forEach(head => {
    event.stonecutting(`kubejs:graphite_${head}_mold`, '#createmetallurgy:graphite_molds')
      .id(`kubejs:stonecutting/graphite_${head}_mold`)
  })
})
