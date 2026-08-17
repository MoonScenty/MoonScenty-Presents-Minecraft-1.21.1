ServerEvents.recipes(event => {
  // 물레방아와 풍차는 놓고 잊는 공짜 동력이라 이 모드팩의 동력 설계와 맞지 않는다.
  // 동력 계보를 손 크랭크에서 시작해 생물, 연소로 이어지게 하고 유지비가 들도록 한다.
  //
  //   손 크랭크 -> 손 톱니바퀴 -> 러닝머신 -> 화로 엔진 -> 증기 기관
  //
  // 돛은 풍차 베어링이 없으면 쓸 데가 없으므로 함께 막는다.
  const REMOVED = [
    'create:crafting/kinetics/water_wheel',
    'create:crafting/kinetics/large_water_wheel',
    'create:crafting/kinetics/windmill_bearing',
    'create:crafting/kinetics/white_sail',
    'create:crafting/kinetics/white_sail_from_conversion',
    'create:crafting/kinetics/sail_frame_from_conversion'
  ]

  REMOVED.forEach(id => event.remove({ id: id }))

  // 증기 기관의 기본 제작법은 금 판, 구리 블록, 안산암 합금뿐이라 케이싱도
  // 고무도 강철도 거치지 않는다. 유체 탱크는 나무 통과 구리 판이면 되고
  // 예열은 석기 시대의 기본 버너로 충분해서, 그대로 두면 안산암 시대에
  // 탱크 하나에 네 대를 붙여 2048 SU가 나온다. 화로 엔진이 통째로 죽는다.
  //
  // 황동 케이싱과 강철을 요구해 다음 시대로 미룬다. 2048 SU는 Rough 티어의
  // 상한과 정확히 같으므로 황동 시대의 동력원으로 자리가 맞는다.
  event.remove({ id: 'create:crafting/kinetics/steam_engine' })

  event.shaped('create:steam_engine', [
    'PSP',
    'BCB',
    ' B '
  ], {
    P: '#c:plates/gold',
    S: 'createmetallurgy:steel_ingot',
    B: 'create:brass_sheet',
    C: 'create:brass_casing'
  }).id('kubejs:crafting/steam_engine')
})
