// 호퍼 Ponder.
//
// 초보가 못 알아내는 것 둘을 잡는다.
//   호퍼는 "바라보는 쪽"으로 내보낸다. 설치할 때 방향을 정해야 한다
//   화로는 면마다 받는 것이 다르다. 위는 재료, 옆은 연료, 아래는 결과물
//
// 글은 평문으로 쓴다. 서식 코드도 Component 꾸미기도 Ponder 글상자에서는
// 티가 안 난다.
//
// 무대는 ponderjs:basic 이다. 5 x 10 x 5 이고 y=0 이 바닥 판이다.
//
// 호퍼의 facing 은 주둥이가 향하는 쪽이다. down / north / south / east / west
// 다섯 가지뿐이고 up 은 없다. +x 가 east, +z 가 south 다.

const HOPPER_DOWN = 'minecraft:hopper[facing=down]'
const HOPPER_WEST = 'minecraft:hopper[facing=west]'

// ── 1장. 화로에 넣기 ──────────────────────────────────────────────────
function sceneFurnace(scene, util) {
  scene.world.setBlocks(util.select.layer(0), 'minecraft:grass_block', false)
  scene.world.setBlocks(util.select.position(2, 2, 2), 'minecraft:furnace', false)
  scene.showStructure()
  scene.idle(10)

  const furnace = util.vector.topOf(util.grid.at(2, 2, 2))

  scene.text(80, '화로는 면마다 받는 것이 다릅니다.', furnace)
    .placeNearTarget()
  scene.idle(90)

  // 위 — 재료
  scene.addKeyframe()
  scene.world.setBlocks(util.select.position(2, 3, 2), HOPPER_DOWN, true)
  scene.idle(15)
  scene.world.createItemEntity(util.vector.topOf(util.grid.at(2, 3, 2)),
    util.vector.of(0, 0, 0), 'minecraft:raw_iron')
  scene.idle(15)
  scene.text(90, '위에 붙인 호퍼는 구울 재료를 넣습니다.',
    util.vector.topOf(util.grid.at(2, 3, 2)))
    .placeNearTarget()
  scene.idle(100)

  // 옆 — 연료
  scene.addKeyframe()
  scene.world.setBlocks(util.select.position(3, 2, 2), HOPPER_WEST, true)
  scene.idle(15)
  scene.world.createItemEntity(util.vector.topOf(util.grid.at(3, 2, 2)),
    util.vector.of(0, 0, 0), 'minecraft:coal')
  scene.idle(15)
  scene.text(90, '옆에 붙인 호퍼는 연료를 넣습니다. 석탄이나 숯을 흘려보내면 됩니다.',
    util.vector.topOf(util.grid.at(3, 2, 2)))
    .placeNearTarget()
  scene.idle(100)

  // 아래 — 결과물 회수
  scene.addKeyframe()
  scene.world.setBlocks(util.select.position(2, 1, 2), HOPPER_WEST, true)
  scene.idle(10)
  scene.world.setBlocks(util.select.position(1, 1, 2), 'minecraft:chest', true)
  scene.idle(15)
  scene.world.createItemEntity(util.vector.topOf(util.grid.at(1, 1, 2)),
    util.vector.of(0, 0, 0), 'minecraft:iron_ingot')
  scene.idle(15)
  scene.text(100, '아래에 붙인 호퍼는 구워진 결과물을 빼냅니다. 옆 상자로 보내 모읍니다.',
    util.vector.topOf(util.grid.at(1, 1, 2)))
    .placeNearTarget()
  scene.idle(110)

  scene.addKeyframe()
  scene.text(100, '이 셋을 붙여 두면 재료와 연료만 넣어 주면 알아서 돌아갑니다.', furnace)
    .placeNearTarget()
  scene.idle(110)
}

// ── 2장. 호퍼 위에 상자 ───────────────────────────────────────────────
function sceneChest(scene, util) {
  scene.world.setBlocks(util.select.layer(0), 'minecraft:grass_block', false)
  scene.world.setBlocks(util.select.position(2, 1, 2), HOPPER_WEST, false)
  scene.world.setBlocks(util.select.position(1, 1, 2), 'minecraft:chest', false)
  scene.showStructure()
  scene.idle(10)

  const hopper = util.vector.topOf(util.grid.at(2, 1, 2))

  scene.text(100, '호퍼는 바라보는 쪽으로 내보냅니다. 설치할 때 웅크리고 대상 블록을 우클릭하면 그쪽을 향합니다.', hopper)
    .placeNearTarget()
  scene.idle(110)

  // 위에서 떨어진 아이템을 줍는다.
  scene.addKeyframe()
  scene.world.createItemEntity(util.vector.topOf(util.grid.at(2, 3, 2)),
    util.vector.of(0, 0, 0), 'minecraft:wheat')
  scene.idle(20)
  scene.world.createItemEntity(util.vector.topOf(util.grid.at(2, 3, 2)),
    util.vector.of(0, 0, 0), 'minecraft:wheat')
  scene.idle(25)

  scene.text(90, '호퍼 위에 떨어진 아이템은 저절로 빨려 들어갑니다.', hopper)
    .placeNearTarget()
  scene.idle(100)

  // 위에 상자를 올린다.
  scene.addKeyframe()
  scene.world.setBlocks(util.select.position(2, 2, 2), 'minecraft:chest', true)
  scene.idle(20)

  scene.text(110, '위에 상자를 놓으면 상자 안의 아이템까지 스스로 꺼내 옵니다. 상자가 빌 때까지 계속합니다.',
    util.vector.topOf(util.grid.at(2, 2, 2)))
    .placeNearTarget()
  scene.idle(120)

  scene.addKeyframe()
  scene.text(110, '창고를 비우거나 화로에 재료를 계속 대 줄 때 이렇게 씁니다.', hopper)
    .placeNearTarget()
  scene.idle(120)
}

Ponder.registry(event => {
  event.create('minecraft:hopper')
    .scene('hopper_furnace', '화로에 넣기', sceneFurnace)
    .scene('hopper_chest', '호퍼 위에 상자', sceneChest)
})
