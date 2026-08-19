ServerEvents.recipes(event => {
  // 운동 에너지 수용기(Kinetic Acceptor)의 재료에서 Fluix Crystal을 뺀다.
  //
  // 이 모드팩은 전기를 쓰지 않으므로 AE 전력은 이것으로만 만든다. 그런데
  // 원본 제작법이 Fluix Crystal을 요구하고, Fluix는 Charger가 돌아가야
  // 나온다. Charger는 다시 AE 전력을 먹으므로 순환이 생긴다.
  //
  // Certus Quartz Crystal로 바꾸면 Charger 이전에 만들 수 있다. 캐거나
  // 물에 심어 기르면 되고 충전 공정을 거치지 않는다.
  //
  //   실리콘 -> Energy Acceptor -> Copper Coil -> Stator
  //          -> Kinetic Acceptor -> Charger -> Fluix Crystal
  //
  // 축은 Crude 판본을 쓴다. shafts_to_crude.js가 뒤에서 한 번 더 훑지만
  // 여기서 처음부터 넣어 두 번 일하지 않게 한다.
  event.remove({ id: 'create_ae_generator:kinetic_acceptor' })

  event.shaped('create_ae_generator:kinetic_acceptor', [
    ' T ',
    'SCS',
    ' Q '
  ], {
    T: 'create_ae_generator:stator',
    S: 'createtiers:shaft_crude',
    C: 'ae2:energy_acceptor',
    Q: 'ae2:certus_quartz_crystal'
  }).id('kubejs:crafting/kinetic_acceptor')
})
