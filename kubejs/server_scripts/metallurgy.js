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

  // 용해로 부품과 주조 기계는 기본이 안산암 합금이라
  // 합금 라인 직후에 바로 지어진다.
  // 산업용 철 블록으로 올려 철 가공 단계를 먼저 거치게 한다.
  event.remove({ id: 'createmetallurgy:crafting/content/foundry_basin' })
  event.remove({ id: 'createmetallurgy:crafting/content/foundry_lid' })
  event.remove({ id: 'createmetallurgy:crafting/content/casting_basin' })
  event.remove({ id: 'createmetallurgy:crafting/content/casting_table' })

  event.shaped('createmetallurgy:foundry_basin', [
    'I I',
    'IMI',
    'III'
  ], {
    I: 'create:industrial_iron_block',
    M: 'createmetallurgy:refractory_mortar'
  }).id('kubejs:crafting/foundry_basin')

  event.shaped('createmetallurgy:foundry_lid', [
    '   ',
    'III',
    'I I'
  ], {
    I: 'create:industrial_iron_block'
  }).id('kubejs:crafting/foundry_lid')

  event.shaped('createmetallurgy:casting_basin', [
    'I I',
    'I I',
    ' I '
  ], {
    I: 'create:industrial_iron_block'
  }).id('kubejs:crafting/casting_basin')

  event.shaped('createmetallurgy:casting_table', [
    'III',
    'I I',
    'I I'
  ], {
    I: 'create:industrial_iron_block'
  }).id('kubejs:crafting/casting_table')
})
