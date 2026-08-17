ServerEvents.recipes(event => {
  // 물레방아와 풍차는 놓고 잊는 공짜 동력이라 이 모드팩의 동력 설계와 맞지 않는다.
  // 동력 계보를 손 크랭크에서 시작해 생물, 연소로 이어지게 하고 유지비가 들도록 한다.
  //
  //   손 크랭크 -> 손 톱니바퀴 -> 러닝머신 -> 화로 엔진
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
})
