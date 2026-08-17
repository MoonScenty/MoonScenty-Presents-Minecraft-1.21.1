ServerEvents.recipes(event => {
  // 화로 엔진의 기본 제작법은 기계식 조립기를 쓰고 황동을 요구한다.
  // 기계식 조립기 자체가 황동 케이싱과 전자 튜브를 요구하므로 재료만
  // 바꿔서는 안산암 합금 시대에 만들 수 없다. 일반 제작대로 내린다.
  //
  // 세 재료가 서로 다른 공정을 요구하도록 골랐다.
  //   구리 케이싱  압착기로 구리 판을 만들어야 한다
  //   고무 시트    수액 채취기와 압축기를 세우고 기다려야 한다
  //   강철         용해로 고온 공정을 거쳐야 한다
  event.remove({ id: 'createfurnaceengine:furnace_engine' })

  event.shaped('createfurnaceengine:furnace_engine', [
    'RSR',
    'RCR',
    'RPR'
  ], {
    R: 'rubberworks:rubber_sheet',
    S: 'createmetallurgy:steel_ingot',
    C: 'create:copper_casing',
    P: 'minecraft:piston'
  }).id('kubejs:crafting/furnace_engine')
})
