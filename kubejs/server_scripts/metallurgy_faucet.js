// 수도꼭지(Faucet).
//
// 원본은 안산암 합금 셋으로 만든다. 안산암 합금은 석기 시대의 첫 재료라
// 주조 설비를 갖추기도 전에 수도꼭지부터 들 수 있었다.
//
// 재료를 내화 모르타르 볼로 바꾼다. 배치와 산출은 원본 그대로다.
//
// 모르타르는 믹서로 모래 둘과 점토 하나를 물에 개어 만들고, 그 블록을
// 분해하면 볼 넷이 나온다. 그래서 수도꼭지 하나가 모르타르 블록 하나에도
// 못 미치는 값이지만, 믹서를 세우기 전에는 손댈 수 없다.
//
// 시대 진행의 뼈대가 아니라 한 아이템의 재료 교체라 시대 파일에 넣지
// 않는다. 상수는 이벤트 안에 두어 전역 스코프를 건드리지 않는다.

ServerEvents.recipes(event => {
  const FAUCET_MORTAR = 'createmetallurgy:refractory_mortar_ball'

  event.remove({ id: 'createmetallurgy:crafting/content/faucet' })
  event.shaped('createmetallurgy:faucet', [
    'M M',
    ' M '
  ], { M: FAUCET_MORTAR })
    .id('kubejs:crafting/faucet')
})
