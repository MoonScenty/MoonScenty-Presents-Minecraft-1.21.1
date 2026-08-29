// PIPEZ 파이프.
//
// 원본은 철 여덟과 레드스톤 하나로 파이프 열여섯을 준다. 철만 있으면 되니
// 석기 시대에 이미 닿고, 열여섯이라는 수량도 사실상 무제한이다. 원거리
// 전송을 PIPEZ에 맡기기로 한 이상 이 값이면 관문이 없는 것과 같다.
//
// 그래서 철을 황동으로 올리고 산출을 넷으로 줄인다. 배치와 나머지 재료는
// 원본 그대로다. 황동은 황동 시대의 재료이므로 파이프도 그 시대에 열린다.
//
// 만능 파이프는 되살리지 않는다. 원본은 세 파이프를 모아 여섯을 주는데,
// 종류를 나눠 깔게 만드는 편이 물류를 설계하는 재미에 가깝다.
//
// 가스 파이프는 Mekanism이 있을 때만 켜지는 조건부 레시피다. 이 팩에는
// Mekanism이 없어 이미 꺼져 있으므로 손대지 않는다.
//
// 시대 진행의 뼈대가 아니라 한 모드의 값 조정이라 시대 파일에 넣지 않는다.
// 상수는 이벤트 안에 두어 전역 스코프를 건드리지 않는다.

ServerEvents.recipes(event => {
  const PIPEZ_BRASS = { tag: 'c:ingots/brass' }
  const PIPEZ_REDSTONE = { tag: 'c:dusts/redstone' }
  const PIPEZ_COUNT = 4

  event.remove({ id: 'pipez:item_pipe' })
  event.remove({ id: 'pipez:fluid_pipe' })
  event.remove({ id: 'pipez:energy_pipe' })
  event.remove({ id: 'pipez:universal_pipe' })

  // 아이템 파이프 — 가운데 줄이 드로퍼 둘.
  event.custom({
    type: 'minecraft:crafting_shaped',
    pattern: [
      'III',
      'DRD',
      'III'
    ],
    key: {
      I: PIPEZ_BRASS,
      D: { item: 'minecraft:dropper' },
      R: PIPEZ_REDSTONE
    },
    result: { count: PIPEZ_COUNT, id: 'pipez:item_pipe' }
  }).id('kubejs:crafting/item_pipe')

  // 유체 파이프 — 가운데 줄이 양동이 둘.
  event.custom({
    type: 'minecraft:crafting_shaped',
    pattern: [
      'III',
      'BRB',
      'III'
    ],
    key: {
      I: PIPEZ_BRASS,
      B: { item: 'minecraft:bucket' },
      R: PIPEZ_REDSTONE
    },
    result: { count: PIPEZ_COUNT, id: 'pipez:fluid_pipe' }
  }).id('kubejs:crafting/fluid_pipe')

  // 에너지 파이프 — 가운데 줄이 레드스톤 블록 둘.
  event.custom({
    type: 'minecraft:crafting_shaped',
    pattern: [
      'III',
      'BRB',
      'III'
    ],
    key: {
      I: PIPEZ_BRASS,
      B: { tag: 'c:storage_blocks/redstone' },
      R: PIPEZ_REDSTONE
    },
    result: { count: PIPEZ_COUNT, id: 'pipez:energy_pipe' }
  }).id('kubejs:crafting/energy_pipe')
})
