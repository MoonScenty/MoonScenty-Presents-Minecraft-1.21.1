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

  // 구리 케이싱과 황동 케이싱 사이의 중간재. 케이싱 사슬을 한 칸 늘려
  // 황동 케이싱을 안산암 합금 시대의 결승선으로 삼기 위한 블록이다.
  //
  // 구리 케이싱에 강철을 대면 이것이 되고, 여기에 황동을 대면 황동 케이싱이 된다.
  // 텍스처는 Create의 구리 케이싱에서 구리 테두리만 강철 색조로 바꾼 것이다.
  // 안쪽 판이 따뜻한 회색이라 테두리에는 푸른기를 넣어 두 면을 구분했다.
  // parentModel을 반드시 지정한다. 빠뜨리면 텍스처가 아틀라스에 올라가고
  // 모델 JSON도 만들어지지만 형상이 비어서 보라/검정 큐브로 렌더된다.
  // 로그에는 아무 경고도 남지 않으므로 원인을 찾기 어렵다.
  event.create('steel_casing')
    .displayName('Steel Casing')
    .parentModel('minecraft:block/cube_all')
    .textures({ all: 'kubejs:block/steel_casing' })
    .soundType(SoundType.WOOD)
    .hardness(2)
    .resistance(4)
    .tag(['minecraft:mineable/axe'])
})
