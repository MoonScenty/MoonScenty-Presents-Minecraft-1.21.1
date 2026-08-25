// 이 모드팩이 추가하는 아이템.
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

  // ── 황동 시대 ──────────────────────────────────────────────────────

  // 코일링 휠의 미가공 상태.
  //
  // 원본 휠은 안산암 합금과 철 블록으로 바로 나왔다. 그 배치를 여기로 내리고
  // 벨트 그라인더의 연마를 한 단계 끼워 그라인더를 앞에 세운다.
  //
  // 텍스처는 아직 완성된 휠을 그대로 빌려 쓴다.
  event.create('angled_wheel')
    .displayName('Angled Wheel')
    .texture('vintageimprovements:item/spring_coiling_machine_wheel')

  // 진공 처리한 철 스프링.
  //
  // 진동대, 원심분리기, 커빙 프레스, 레이저 넷이 전부 이것을 요구한다.
  // 황동 시대 후반부의 관문이다.
  //
  // 텍스처는 아직 일반 철 스프링을 그대로 빌려 쓴다.
  event.create('precision_iron_spring')
    .displayName('Precision Iron Spring')
    .texture('vintageimprovements:item/iron_spring')

  // 진동대로 떨어 놓은 거품기.
  //
  // 원심분리기의 핵심 부품이다. 거품기 하나 때문에 진동대를 세워야 한다.
  //
  // 텍스처는 아직 원본 거품기를 그대로 빌려 쓴다.
  event.create('vibrated_whisk')
    .displayName('Vibrated Whisk')
    .texture('create:item/whisk')

  // 커빙 프레스의 헤드 장착부.
  //
  // 커빙 프레스는 헤드를 갈아 끼우는 기계다. 그 장착부를 별도 부품으로 뽑아
  // 유령 들린 황동 판을 한 번 더 거치게 한다.
  //
  // 텍스처는 아직 제작기 슬롯 덮개를 그대로 빌려 쓴다.
  event.create('head_mounter')
    .displayName('Head Mounter')
    .texture('create:item/crafter_slot_cover')

  // 원심분리기로 정제한 코크스.
  //
  // 강철 합금의 유일한 연료다. 원본 합금 레시피는 #c:coal_coke 태그를 받았는데
  // 그 태그에 코크스 하나뿐이라 이것으로 바꿔도 잃는 것이 없고, 대신 원심분리를
  // 건너뛸 길이 사라진다. 황동 시대의 사슬 전체가 이 하나로 모인다.
  //
  // 텍스처는 아직 원본 코크스를 그대로 빌려 쓴다.
  event.create('refined_coke')
    .displayName('Refined Coke')
    .texture('createmetallurgy:item/coke')
})
