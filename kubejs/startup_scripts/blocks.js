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

  // 구리 케이싱에 고무를 댄 것.
  //
  // 유체를 다루는 기계 넷이 전부 이것을 요구한다. 고무를 만들어야 유체로
  // 넘어가는 순서를 이 블록 하나로 강제한다.
  //
  // Item Application은 놓여 있는 블록을 바꾸는 방식이라 아이템이 아니라
  // 블록이어야 한다. 텍스처는 아직 구리 케이싱을 그대로 빌려 쓴다.
  event.create('waterproof_copper_casing')
    .displayName('Waterproof Copper Casing')
    .parentModel('minecraft:block/cube_all')
    .textures({ all: 'create:block/copper_casing' })
    .soundType(SoundType.WOOD)
    .hardness(2)
    .resistance(4)
    .tag(['minecraft:mineable/axe'])

  // 강철 케이싱.
  //
  // 황동 시대의 결승선이다. 안산암 케이싱에 강철 판을 우클릭해 만든다.
  // 강철 판은 정제 코크스를 거쳐야 나오고 정제 코크스는 원심분리기를 요구하므로,
  // 이 블록 하나가 황동 시대의 가공 사슬 전체를 뒤에 달고 있다.
  //
  // Item Application은 놓여 있는 블록을 바꾸는 방식이라 블록이어야 한다.
  // 텍스처는 아직 안산암 케이싱을 그대로 빌려 쓴다.
  event.create('steel_casing')
    .displayName('Steel Casing')
    .parentModel('minecraft:block/cube_all')
    .textures({ all: 'create:block/andesite_casing' })
    .soundType(SoundType.WOOD)
    .hardness(2)
    .resistance(4)
    .tag(['minecraft:mineable/axe'])

  // 주석 블록.
  //
  // 주괴 아홉을 묶어 둔 보관용이다. 기계 재료로 들어가지는 않는다.
  //
  // 텍스처는 Create 아연 블록의 형태를 두고 주석 팔레트로 옮겼다. 원본은
  // 고유색이 일곱 개라 주석 단계 아홉 중 어두운 쪽 일곱에 얹혀 금속 무게를
  // 남겼다. 밝은 쪽에 맞추면 색이 떠서 금속처럼 보이지 않는다.
  event.create('tin_block')
    .displayName('Block of Tin')
    .parentModel('minecraft:block/cube_all')
    .textures({ all: 'kubejs:block/tin_block' })
    .soundType(SoundType.METAL)
    .hardness(5)
    .resistance(6)
    .requiresTool()
    .tag(['minecraft:mineable/pickaxe', 'minecraft:needs_stone_tool'])
})
