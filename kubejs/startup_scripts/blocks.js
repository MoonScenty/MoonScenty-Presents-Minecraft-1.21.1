// SoundType은 KubeJS가 전역으로 제공하므로 따로 불러오지 않는다.
StartupEvents.registry('block', event => {
  // 산업용 철 블록의 복제본.
  //
  // Create의 산업용 철 블록은 석재 절단으로 철 주괴 1개에서 2개가 나온다.
  // 야금 기계 재료를 그대로 두면 설비 전체가 철 17개로 끝나 무게가 없다.
  // 여기에 아연을 한 겹 얹어 이 시대의 필수 자원과 묶는다.
  //
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
