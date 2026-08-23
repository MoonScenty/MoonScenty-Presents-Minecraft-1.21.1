// 석기 시대에 추가하는 아이템.
//
// 텍스처가 없는 것은 기존 모드의 텍스처를 임시로 빌려 쓴다. 아래 PLACEHOLDER
// 표시가 붙은 항목이 대상이며, 전용 그림이 준비되면 texture 경로만 바꾸면 된다.

StartupEvents.registry('item', event => {
  // 안산암을 맷돌에 갈아 나오는 가루. 용해로에 넣어 용융 안산암이 된다.
  //
  // 텍스처는 Metallurgy 철 가루의 형태를 쓰되 색을 바닐라 안산암 팔레트로
  // 옮겼다. 철 가루 원본이 갈색 계열이라 그대로 두면 안산암으로 안 보인다.
  // 명암 일곱 단계를 안산암의 #686868~#a8aa9a 범위에 밝기 순으로 대응시키고,
  // 가루다운 대비를 남기려고 양 끝만 조금 넓혔다.
  event.create('andesite_dust')
    .displayName('Andesite Dust')
    .texture('kubejs:item/andesite_dust')

  // 내화 모르타르 거푸집.
  //
  // 흑연 거푸집과 같은 자리에 쓰이지만 주조 한 번에 사라진다. 값이 싼 대신
  // 매번 다시 만들어야 하며, 이 소모가 석기 시대 주조의 유지비가 된다.
  //
  // 빈 거푸집을 먼저 만들고 석재 절단기로 원하는 모양으로 바꾼다.
  // Metallurgy가 흑연 거푸집에 쓰는 방식과 같다.
  //
  // 텍스처는 흑연 거푸집의 형태를 그대로 두고 색만 모르타르 색조로 옮긴 것이다.
  // 어두운 회색(#494949 계열)을 따뜻한 회색(#9d9d93 계열)으로 밀었다.
  // 형태가 같아야 어느 거푸집인지 한눈에 알 수 있고, 색으로 등급을 가른다.
  const MOLD_SHAPES = [
    ['blank', 'Blank'],
    ['ingot', 'Ingot'],
    ['nugget', 'Nugget'],
    ['plate', 'Plate'],
    ['rod', 'Rod'],
    ['gear', 'Gear']
  ]

  MOLD_SHAPES.forEach(([id, name]) => {
    event.create(`refractory_mortar_${id}_mold`)
      .displayName(`Refractory Mortar ${name} Mold`)
      .texture(`kubejs:item/refractory_mortar_${id}_mold`)
  })

  // 팬으로 유령 가공한 황동 판.
  //
  // 황동 케이싱을 만드는 유일한 재료다. 황동 주괴와 판은 자유롭게 만들 수
  // 있고 이 한 단계만 팬을 요구하므로, 팬이 안산암 합금 시대의 마지막
  // 관문이 된다.
  //
  // 텍스처는 아직 황동 판을 그대로 빌려 쓴다.
  event.create('haunted_brass_sheet')
    .displayName('Haunted Brass Sheet')
    .texture('create:item/brass_sheet')
})
