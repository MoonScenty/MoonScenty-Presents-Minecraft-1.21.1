ServerEvents.recipes(event => {
  // 가공 기계는 전부 RPM 인식 기계로 대체한다. 원본을 남겨두면 플레이어가
  // 그쪽으로 도망가서 속도 기반 게이팅이 통째로 무의미해진다.
  //
  // 안산암 합금 시대는 Crude 티어라 32 RPM이 상한이다. 수율을 RPM으로
  // 차등하기에는 폭이 좁으므로, 이 시대의 진행은 기계 자체를 순서대로
  // 해금하는 것으로 표현한다. 재료가 그 순서를 만든다.
  //
  //   맷돌      안산암 케이싱          시대 초반, 손 톱니바퀴로도 돌아간다
  //   압착기    + 철 블록              구리 판을 만들 수 있게 된다
  //   혼합기    + 구리 케이싱          케이싱 사슬을 한 단계 올려야 한다
  //   분쇄바퀴  + 황동                 다음 시대
  const ORIGINALS = [
    'create:crafting/kinetics/millstone',
    'create:crafting/kinetics/mechanical_press',
    'create:crafting/kinetics/mechanical_mixer',
    'create:crafting/kinetics/crushing_wheel'
  ]
  ORIGINALS.forEach(id => event.remove({ id: id }))

  // 맷돌: 원본과 같은 재료다. 시대 초반의 첫 가공 기계이므로 문턱을 두지 않는다.
  event.shaped('createrecipeneedrpm:rpm_millstone', [
    'C',
    'S',
    'I'
  ], {
    C: 'createhandcogwheel:hand_cogwheel',
    S: 'create:andesite_casing',
    I: '#c:stones'
  }).id('kubejs:crafting/rpm_millstone')

  // 압착기: 철 블록을 요구한다. 구리 판을 만들려면 이것이 먼저 필요하고,
  // 구리 판은 다시 구리 케이싱으로 이어진다.
  event.shaped('createrecipeneedrpm:rpm_mechanical_press', [
    'S',
    'C',
    'I'
  ], {
    S: 'create:shaft',
    C: 'create:andesite_casing',
    I: '#c:storage_blocks/iron'
  }).id('kubejs:crafting/rpm_mechanical_press')

  // 혼합기: 구리 케이싱을 요구한다. 압착기로 구리 판을 만들고 케이싱을
  // 한 단계 올려야 도달하므로 시대 후반의 관문이 된다.
  event.shaped('createrecipeneedrpm:rpm_mechanical_mixer', [
    'S',
    'C',
    'W'
  ], {
    S: 'create:cogwheel',
    C: 'create:copper_casing',
    W: 'create:whisk'
  }).id('kubejs:crafting/rpm_mechanical_mixer')

  // 분쇄바퀴: 황동을 요구해 다음 시대로 넘긴다. 토크 8짜리가 두 개 필요해
  // Crude 상한으로는 애초에 감당하기 어렵다.
  event.shaped('createrecipeneedrpm:rpm_crushing_wheel', [
    ' B ',
    'BCB',
    ' B '
  ], {
    B: 'create:brass_sheet',
    C: 'create:brass_casing'
  }).id('kubejs:crafting/rpm_crushing_wheel')
})
