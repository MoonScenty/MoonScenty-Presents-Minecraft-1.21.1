ServerEvents.recipes(event => {
  // 화로 엔진의 기본 제작법은 황동을 요구해 다음 시대에 묶여 있다.
  // 안산암 합금 시대 후반의 관문으로 쓰려고 재료를 앞당긴다.
  //
  // 세 재료가 서로 다른 공정을 요구하도록 골랐다.
  //   구리 케이싱  압착기로 구리 판을 만들어야 한다
  //   고무 시트    수액 채취기와 압축기를 세우고 기다려야 한다
  //   강철         용해로 고온 공정을 거쳐야 한다
  event.remove({ output: 'createfurnaceengine:furnace_engine' })

  event.custom({
    type: 'create:mechanical_crafting',
    accept_mirrored: true,
    category: 'misc',
    pattern: [
      'RRS',
      'RCI',
      'RRS'
    ],
    key: {
      R: { item: 'rubberworks:rubber_sheet' },
      S: { item: 'createmetallurgy:steel_ingot' },
      C: { item: 'create:copper_casing' },
      I: { item: 'minecraft:piston' }
    },
    result: { count: 1, id: 'createfurnaceengine:furnace_engine' }
  }).id('kubejs:mechanical_crafting/furnace_engine')
})
