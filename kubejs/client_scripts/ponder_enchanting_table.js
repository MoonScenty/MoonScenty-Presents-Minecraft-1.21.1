// 인챈트 테이블 Ponder.
//
// 초보가 거의 반드시 틀리는 것 둘을 잡는다.
//   책장을 테이블에 딱 붙여 놓는다 (두 칸 떨어져야 한다)
//   사이에 횃불이나 블록을 끼워 넣는다 (그 책장은 세지 않는다)
//
// 무대는 ponderjs:basic 이다. 5 x 10 x 5 이고 y=0 이 바닥 판이다.
// 5 x 5 의 바깥 테두리가 곧 "두 칸 떨어진 자리"라 무대 크기가 딱 맞는다.

// 글은 꾸미지 않고 평문으로 쓴다. FTB Quests 의 &l 같은 서식 코드는 여기서
// 먹지 않고, Component 로 굵게 만들어 봐야 Ponder 글상자에서는 티가 안 난다.

// 테이블에서 두 칸 떨어진 자리. 5 x 5 의 테두리 열여섯 칸이다.
const SHELF_RING = []
for (let x = 0; x < 5; x++) {
  for (let z = 0; z < 5; z++) {
    if (x === 0 || x === 4 || z === 0 || z === 4) SHELF_RING.push([x, z])
  }
}

// 앞쪽 가운데 한 칸은 비워 둔다. 드나드는 자리이고, 화면에서 안이 보인다.
const DOOR = [2, 4]
const SHELVES = SHELF_RING.filter(([x, z]) => !(x === DOOR[0] && z === DOOR[1]))

// 무대를 세운다. 두 장면이 같은 배치에서 시작한다.
function buildAltar(scene, util, withShelves) {
  scene.world.setBlocks(util.select.layer(0), 'minecraft:grass_block', false)
  scene.world.setBlocks(util.select.position(2, 1, 2), 'minecraft:enchanting_table', false)
  if (withShelves) {
    SHELVES.forEach(([x, z]) => {
      scene.world.setBlocks(util.select.position(x, 1, z), 'minecraft:bookshelf', false)
    })
  }
}

// ── 1장. 책장 열다섯 개 ───────────────────────────────────────────────
function sceneRing(scene, util) {
  buildAltar(scene, util, false)
  scene.showStructure()
  scene.idle(10)

  const table = util.vector.topOf(util.grid.at(2, 1, 2))

  scene.text(80, '테이블만 놓으면 낮은 레벨의 마법만 걸 수 있습니다.', table)
    .placeNearTarget()
  scene.idle(90)

  // 책장을 한 칸씩 올린다. 고리 모양이 눈에 남게 천천히 놓는다.
  scene.addKeyframe()
  SHELVES.forEach(([x, z]) => {
    scene.world.setBlocks(util.select.position(x, 1, z), 'minecraft:bookshelf', true)
    scene.idle(4)
  })
  scene.idle(15)

  scene.text(100, '책장은 테이블에서 두 칸 떨어진 자리에 놓습니다. 붙여 놓으면 세지 않습니다.', table)
    .placeNearTarget()
  scene.idle(110)

  scene.addKeyframe()
  scene.text(100, '이렇게 빙 둘러 열다섯 개를 놓으면 최대입니다. 30레벨까지 올라갑니다.', table)
    .placeNearTarget()
  scene.idle(110)

  scene.text(90, '앞쪽 한 자리를 비워 두면 드나들 수 있습니다. 더 놓아도 오르지 않습니다.',
    util.vector.topOf(util.grid.at(DOOR[0], 1, DOOR[1])))
    .placeNearTarget()
  scene.idle(100)
}

// ── 2장. 사이를 비워 두세요 ───────────────────────────────────────────
function sceneGap(scene, util) {
  buildAltar(scene, util, true)
  scene.showStructure()
  scene.idle(10)

  const gap = util.grid.at(3, 1, 2)
  const gapTop = util.vector.topOf(gap)

  scene.text(90, '책장과 테이블 사이 한 칸은 반드시 비어 있어야 합니다.', gapTop)
    .placeNearTarget()
  scene.idle(100)

  // 사이에 횃불을 끼워 막아 본다.
  scene.addKeyframe()
  scene.showControls(30, gapTop, 'down')
    .rightClick()
    .withItem('minecraft:torch')
  scene.idle(20)
  scene.world.setBlocks(util.select.position(3, 1, 2), 'minecraft:torch', true)
  scene.idle(20)

  scene.text(100, '여기를 막으면 그 뒤의 책장은 세지 않습니다. 횃불 하나로도 막힙니다.', gapTop)
    .placeNearTarget()
  scene.idle(110)

  // 다시 치운다.
  scene.addKeyframe()
  scene.world.setBlocks(util.select.position(3, 1, 2), 'minecraft:air', true)
  scene.idle(20)
  scene.text(80, '치우면 다시 세집니다. 바닥에 카펫을 까는 것도 괜찮습니다.', gapTop)
    .placeNearTarget()
  scene.idle(90)

  // 한 칸 위에 놓아도 센다.
  scene.addKeyframe()
  ;[[0, 2], [4, 2], [2, 0]].forEach(([x, z]) => {
    scene.world.setBlocks(util.select.position(x, 2, z), 'minecraft:bookshelf', true)
    scene.idle(6)
  })
  scene.idle(15)

  scene.text(100, '책장은 같은 높이와 한 칸 위, 두 층까지 셉니다. 자리가 모자라면 위로 쌓으세요.',
    util.vector.topOf(util.grid.at(2, 2, 0)))
    .placeNearTarget()
  scene.idle(110)
}

Ponder.registry(event => {
  // 테이블과 책장 어느 쪽에서 눌러도 같은 내용이 열리게 둘 다 등록한다.
  event.create('minecraft:enchanting_table')
    .scene('enchanting_altar', '책장 열다섯 개', sceneRing)
    .scene('enchanting_gap', '사이를 비워 두세요', sceneGap)

  event.create('minecraft:bookshelf')
    .scene('bookshelf_altar', '책장 열다섯 개', sceneRing)
    .scene('bookshelf_gap', '사이를 비워 두세요', sceneGap)
})
