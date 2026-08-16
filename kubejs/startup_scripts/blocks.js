// SoundType은 KubeJS가 전역으로 제공하므로 따로 불러오지 않는다.
StartupEvents.registry('block', event => {
  // 산업용 철 블록의 복제본. 야금 기계 재료를 이쪽으로 옮겨
  // 석재 절단만으로 도달하던 것보다 비싸게 만들기 위한 블록이다.
  // 모델은 Create와 같은 cube_column(옆면/윗면 분리)을 쓴다.
  event.create('manufactured_iron_block')
    .displayName('Block of Manufactured Iron')
    .parentModel('minecraft:block/cube_column')
    .textures({
      side: 'kubejs:block/manufactured_iron_block',
      end: 'kubejs:block/manufactured_iron_block_top'
    })
    .soundType(SoundType.METAL)
    .hardness(5)
    .resistance(6)
    .requiresTool()
    .tag(['minecraft:mineable/pickaxe', 'minecraft:needs_stone_tool'])
})
