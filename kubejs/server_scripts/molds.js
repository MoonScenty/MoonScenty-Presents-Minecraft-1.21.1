// 내화 모르타르 거푸집.
//
// 흑연 거푸집과 같은 자리에 쓰이되 주조 한 번에 사라진다. 싼 대신 매번 다시
// 만들어야 하며, 이 소모가 석기 시대 주조의 유지비가 된다.
//
// Metallurgy의 기본 주조 레시피는 거푸집을 태그가 아니라 아이템으로 직접
// 지정한다. 그래서 태그에 넣는 것만으로는 호환되지 않는다. 기본 레시피를
// 하나씩 훑어 내화 판본을 따로 만들어 준다.
const MOLD_SHAPES = ['ingot', 'nugget', 'plate', 'rod', 'gear']

// 빈 거푸집끼리 석재 절단으로 형태를 바꾸는 태그.
// Metallurgy가 흑연 거푸집에 쓰는 방식과 같되, 두 등급이 섞이지 않도록
// 내화 거푸집만 담는 별도 태그를 쓴다.
ServerEvents.tags('item', event => {
  event.add('kubejs:refractory_mortar_molds', 'kubejs:refractory_mortar_blank_mold')
  MOLD_SHAPES.forEach(shape => {
    event.add('kubejs:refractory_mortar_molds', `kubejs:refractory_mortar_${shape}_mold`)
  })
})

ServerEvents.recipes(event => {
  // ── 빈 거푸집 ─────────────────────────────────────────────────────────
  //
  // 모르타르 볼은 자체 제작법이 없다. 모르타르 블록을 분해해야만 나오므로
  // 거푸집 1개는 블록 2개, 즉 모래 8개와 점토 8개다.
  event.shaped('kubejs:refractory_mortar_blank_mold', [
    'BBB',
    'B B',
    'BBB'
  ], { B: 'createmetallurgy:refractory_mortar_ball' })
    .id('kubejs:crafting/refractory_mortar_blank_mold')

  // 빈 거푸집을 석재 절단기에 넣어 원하는 형태로 바꾼다. 형태끼리도 오간다.
  MOLD_SHAPES.concat('blank').forEach(shape => {
    event.stonecutting(
      `kubejs:refractory_mortar_${shape}_mold`,
      '#kubejs:refractory_mortar_molds'
    ).id(`kubejs:stonecutting/refractory_mortar_${shape}_mold`)
  })

  // ── 기본 주조 레시피의 내화 판본 ──────────────────────────────────────
  //
  // 흑연 거푸집을 쓰는 레시피를 전부 찾아 거푸집만 내화로 바꾸고
  // mold_consumed를 붙인다. 다른 모드가 주조 레시피를 더 넣어도 함께 잡힌다.
  const GRAPHITE = /^createmetallurgy:graphite_(ingot|nugget|plate|rod|gear)_mold$/
  const mirrored = []

  event.forEachRecipe({ type: 'createmetallurgy:casting_in_table' }, recipe => {
    let json
    try {
      // 손대지 않은 원본을 읽는다. recipe.json 쪽은 Almost Unified 가 태그
      // 결과물을 아이템으로 바꿔 놓은 상태이고, 그때 result.item 이 객체가
      // 아니라 문자열로 적혀 casting_output 코덱이 읽지 못한다.
      json = JSON.parse((recipe.originalJson || recipe.json).toString())
    } catch (e) {
      return
    }
    if (!json.ingredients || json.mold_consumed) return

    const idx = json.ingredients.findIndex(x => x && x.item && GRAPHITE.test(x.item))
    if (idx < 0) return

    const shape = json.ingredients[idx].item.match(GRAPHITE)[1]
    const copy = JSON.parse(JSON.stringify(json))
    copy.ingredients[idx] = { item: `kubejs:refractory_mortar_${shape}_mold` }
    copy.mold_consumed = true
    delete copy['neoforge:conditions']

    // 안전망. result.item 이 문자열이면 객체 형태로 되돌린다.
    if (copy.result && typeof copy.result.item === 'string') {
      copy.result = { item: { id: copy.result.item, count: copy.result.count || 1 } }
    }

    mirrored.push([copy, shape])
  })

  // 순회 중에 추가하지 않고 모아 두었다가 한 번에 넣는다.
  //
  // 레시피 ID는 원본 ID에서 따오지 않고 일련번호로 만든다. getId()가 돌려주는
  // 것은 Java 문자열이라 Rhino가 JS 정규식을 넘기면 String.replace(char, char)로
  // 잘못 잡아 "Cannot convert /[:\/]/g to char"로 터진다.
  mirrored.forEach(([json, shape], i) => {
    event.custom(json).id(`kubejs:casting_in_table/refractory_${shape}_${i}`)
  })

  console.info(`[거푸집] 기본 주조 레시피 ${mirrored.length}건에 내화 판본을 추가했다`)
})
