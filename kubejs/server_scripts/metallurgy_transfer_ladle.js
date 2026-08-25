// 이송 국자(Transfer Ladle).
//
// Metallurgy의 조립 라인 레시피 하나를 다시 쓴다. 원본은 중간에
// createmetallurgy:grinding 을 한 번 밟는데, 그 공정은 Metallurgy의
// 벨트 그라인더 전용이다.
//
// 그 기계는 Vintage의 Belt Grinder와 역할이 겹쳐 안산암 합금 시대에
// 제작법을 지웠다. 그래서 지금은 이 한 단계 때문에 국자를 만들 수 없다.
//
// 남은 grinding 레시피 63개는 전부 구리 산화·밀랍 제거라 도끼로도 되는
// 것들이다. 실제로 막힌 것은 이 국자 하나뿐이므로 여기만 뚫는다.
//
// 바꾸는 것은 가운데 한 단계뿐이다. 재료도 확률도 원본 그대로 둔다.
//
// 상수는 이벤트 안에 둔다. KubeJS 서버 스크립트는 전역 스코프를 공유해서
// 다른 파일과 이름이 겹치면 그 파일이 통째로 로드되지 않는다.

ServerEvents.recipes(event => {
  const FRAME = 'createmetallurgy:incomplete_ladle_frame'

  event.remove({ id: 'createmetallurgy:sequenced_assembly/ladle' })

  event.custom({
    type: 'create:sequenced_assembly',
    ingredient: { item: 'create:andesite_alloy' },

    // chance 는 백분율이 아니라 가중치다. 합이 1000 이 되게 짜여 있다.
    // 일반 넷이 각 24.975%, 희귀 둘이 각 0.05% 다.
    results: [
      { chance: 249.75, id: 'createmetallurgy:ghast_transfer_ladle' },
      { chance: 249.75, id: 'createmetallurgy:cute_transfer_ladle' },
      { chance: 249.75, id: 'createmetallurgy:old_transfer_ladle' },
      { chance: 249.75, id: 'createmetallurgy:strider_transfer_ladle' },
      { chance: 0.5, id: 'createmetallurgy:restingphantom_transfer_ladle' },
      { chance: 0.5, id: 'createmetallurgy:the_cooler_transfer_ladle' }
    ],

    sequence: [
      {
        type: 'create:deploying',
        ingredients: [{ item: FRAME }, { tag: 'c:ingots/steel' }],
        results: [{ id: FRAME }]
      },
      // 여기가 바뀐 한 단계다. createmetallurgy:grinding 대신 Vintage의 연마를 쓴다.
      //
      // 조립 라인 단계로 써도 되는 것은 Vintage 자신이 recipe_card 레시피에서
      // 같은 방식으로 쓰고 있어 확인된다.
      //
      // speed_limits 는 0 이 제한 없음, 1 낮음(16 이하), 2 중간(16~64),
      // 3 높음(64 초과)이다. 황동 티어 상한이 정확히 64라 2 로 두면 경계에
      // 걸릴 수 있어 제한을 두지 않는다.
      {
        type: 'vintageimprovements:polishing',
        ingredients: [{ item: FRAME }],
        results: [{ id: FRAME }],
        processing_time: 40,
        speed_limits: 0
      },
      {
        type: 'create:deploying',
        ingredients: [{ item: FRAME }, { item: 'createmetallurgy:refractory_mortar_ball' }],
        results: [{ id: FRAME }]
      },
      {
        type: 'create:pressing',
        ingredients: [{ item: FRAME }],
        results: [{ id: FRAME }]
      }
    ],

    transitional_item: { id: FRAME }
  }).id('kubejs:sequenced_assembly/ladle')
})
