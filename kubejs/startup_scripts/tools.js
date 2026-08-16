// 부서지지 않는 도구 시제품.
// 성능은 돌 곡괭이와 같고, 내구도만 테스트하기 쉽게 10으로 낮췄다.
// 실제로 부서짐을 막는 처리는 server_scripts/tools.js에 있다.
StartupEvents.registry('item', event => {
  // 내구도는 maxDamage가 아니라 티어의 uses가 결정한다.
  // maxDamage만 바꾸면 돌 티어의 131이 그대로 적용된다.
  event.create('copper_pickaxe', 'pickaxe')
    .tier('stone')
    .modifyTier(tier => {
      tier.uses = 10
    })
    .maxDamage(10)
    .displayName('Copper Pickaxe')

  // 내구도가 다 하면 이걸로 바뀐다. 도구가 아니라 평범한 아이템이라
  // 아무 기능도 없고, 수리해서 되돌리는 재료로만 쓰인다.
  event.create('broken_copper_pickaxe')
    .displayName('Broken Copper Pickaxe')
    .unstackable()
})
