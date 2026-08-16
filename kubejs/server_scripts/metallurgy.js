ServerEvents.recipes(event => {
  // 내화 모르타르 수동 제작.
  // Metallurgy 기본은 create:mixing(모래 2 + 점토 1 + 물 100mb)이라 혼합기가 필요하다.
  // 용해로를 짓기 전 단계에서 쓸 수 있도록, 재료를 더 들이는 대신 손으로 만들 수 있게 한다.
  // 물 양동이는 바닐라 제작 잔여물 규칙에 따라 빈 양동이로 반환된다.
  event.shaped('createmetallurgy:refractory_mortar', [
    'SSS',
    'SWC',
    'CCC'
  ], {
    S: '#c:sands',
    W: 'minecraft:water_bucket',
    C: 'minecraft:clay_ball'
  }).id('kubejs:crafting/refractory_mortar')

  // 주조는 내화 모르타르 거푸집으로 진행한다. 1회 주조마다 소모된다.
  // 흑연 거푸집이 열리기 전까지 쓰는 초반 수단이라 값을 낮추지 않는다.
  event.shaped('kubejs:refractory_mortar_mold', [
    'M M',
    ' M '
  ], {
    M: 'createmetallurgy:refractory_mortar'
  }).id('kubejs:crafting/refractory_mortar_mold')

  // 용해로 부품과 주조 기계는 기본이 안산암 합금이라
  // 합금 라인 직후에 바로 지어진다.
  // 제조된 철 블록으로 올려 아연을 들인 한 단계를 더 거치게 한다.
  // 산업용 철 블록은 철 주괴 석재 절단만으로 나와 게이팅 효과가 없다.
  event.remove({ id: 'createmetallurgy:crafting/content/foundry_basin' })
  event.remove({ id: 'createmetallurgy:crafting/content/foundry_lid' })
  event.remove({ id: 'createmetallurgy:crafting/content/casting_basin' })
  event.remove({ id: 'createmetallurgy:crafting/content/casting_table' })

  event.shaped('createmetallurgy:foundry_basin', [
    'I I',
    'IMI',
    'III'
  ], {
    I: 'kubejs:manufactured_iron_block',
    M: 'createmetallurgy:refractory_mortar'
  }).id('kubejs:crafting/foundry_basin')

  event.shaped('createmetallurgy:foundry_lid', [
    '   ',
    'III',
    'I I'
  ], {
    I: 'kubejs:manufactured_iron_block'
  }).id('kubejs:crafting/foundry_lid')

  event.shaped('createmetallurgy:casting_basin', [
    'I I',
    'I I',
    ' I '
  ], {
    I: 'kubejs:manufactured_iron_block'
  }).id('kubejs:crafting/casting_basin')

  event.shaped('createmetallurgy:casting_table', [
    'III',
    'I I',
    'I I'
  ], {
    I: 'kubejs:manufactured_iron_block'
  }).id('kubejs:crafting/casting_table')

  // 튼튼한 거품기도 기본은 안산암 합금 + 강화 판금이다.
  event.remove({ id: 'createmetallurgy:crafting/content/sturdy_whisk' })

  event.shaped('createmetallurgy:sturdy_whisk', [
    ' Z ',
    'IZI',
    'III'
  ], {
    Z: '#c:ingots/zinc',
    I: 'kubejs:manufactured_iron_block'
  }).id('kubejs:crafting/sturdy_whisk')

  // 용해로 믹서는 기본이 톱니바퀴 + 구리 케이싱 + 거품기다.
  // 케이싱을 완제품으로 쓰지 않고 구성 재료를 직접 조립하게 바꾼다.
  event.remove({ id: 'createmetallurgy:crafting/content/foundry_mixer' })

  event.shaped('createmetallurgy:foundry_mixer', [
    'PZP',
    'CLC',
    ' W '
  ], {
    P: '#minecraft:planks',
    Z: '#c:ingots/zinc',
    C: '#c:storage_blocks/copper',
    L: '#c:stripped_logs',
    W: 'createmetallurgy:sturdy_whisk'
  }).id('kubejs:crafting/foundry_mixer')
})
