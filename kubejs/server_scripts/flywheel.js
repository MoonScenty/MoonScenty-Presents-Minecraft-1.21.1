ServerEvents.recipes(event => {
  // 플라이휠을 황동에서 강철로 옮긴다.
  //
  // 화로 엔진 1.1.0부터 동력이 축이 아니라 플라이휠로 나간다. 원본 제작법은
  // 황동 주괴 8개를 요구하는데, 그러면 안산암 합금 시대의 마지막 동력원이
  // 다음 시대의 재료를 먼저 요구하게 되어 시대 경계가 무너진다.
  //
  // 강철은 이미 이 시대의 재료다. 화로 엔진 본체와 강철 케이싱도 강철을
  // 쓰므로 셋이 같은 재료를 놓고 경쟁하게 된다.
  //
  // 축은 Crude 판본을 쓴다. shafts_to_crude.js가 뒤에서 한 번 더 훑지만
  // 여기서 처음부터 Crude로 넣어 두 번 일하지 않게 한다.
  event.remove({ id: 'create:crafting/kinetics/flywheel' })

  event.shaped('create:flywheel', [
    'SSS',
    'SAS',
    'SSS'
  ], {
    S: 'createmetallurgy:steel_ingot',
    A: 'createtiers:shaft_crude'
  }).id('kubejs:crafting/flywheel')
})
