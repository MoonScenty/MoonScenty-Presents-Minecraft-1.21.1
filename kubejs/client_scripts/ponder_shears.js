// 가위 Ponder.
//
// 이 모드팩은 Advancement Disabler로 발전 과제를, NERB로 제작법 책을 껐다.
// 초보가 바닐라 물건의 쓰임새를 알아낼 기본 수단이 둘 다 없으므로 Ponder로
// 메운다. 제작법은 JEI가 이미 보여 주니 여기서는 다루지 않는다.
//
// 가위는 두 가지를 한다. 양털을 깎고, 나뭇잎을 벤다. 장면을 둘로 나눈다.
//
// 무대는 PonderJS 기본 구조물 ponderjs:basic 이다. 5 x 10 x 5 이고 y=0 이
// 바닥 판, 그 위가 전부 공기다. 물건은 y=1 부터 올린다.

Ponder.registry(event => {
  event.create('minecraft:shears')

    // ── 1장. 양털 깎기 ──────────────────────────────────────────────────
    .scene('shear_sheep', '양털 깎기', (scene, util) => {
      // 바닥 판을 잔디로 갈아 둔다. 뒤에서 양이 뜯어 먹어야 하기 때문이다.
      scene.world.setBlocks(util.select.layer(0), 'minecraft:grass_block', false)
      scene.showStructure()
      scene.idle(10)

      const ground = util.grid.at(2, 0, 2)
      const spot = util.vector.topOf(ground)

      const sheep = scene.world.createEntity('minecraft:sheep', spot)
      scene.idle(20)

      scene.text(60, '양은 잔디밭에서 풀을 뜯습니다.', spot)
        .placeNearTarget()
      scene.idle(70)

      // 가위를 들고 우클릭.
      scene.addKeyframe()
      scene.showControls(30, spot, 'down')
        .rightClick()
        .withItem('minecraft:shears')
      scene.idle(20)

      // 양털이 튀어나온다. 세 방향으로 흩어지게 던진다.
      scene.world.createItemEntity(spot, util.vector.of(0.15, 0.25, 0), 'minecraft:white_wool')
      scene.world.createItemEntity(spot, util.vector.of(-0.1, 0.3, 0.1), 'minecraft:white_wool')
      scene.world.createItemEntity(spot, util.vector.of(0, 0.25, -0.15), 'minecraft:white_wool')

      // 깎인 양이 된다. 털이 사라진 모습으로 바뀐다.
      scene.world.modifyEntity(sheep, e => e.setSheared(true))
      scene.idle(20)

      scene.text(80, '가위로 우클릭하면 양털이 나옵니다. 양은 죽지 않습니다.', spot)
        .placeNearTarget()
      scene.idle(90)

      // 풀을 먹으면 잔디가 흙이 되고 털이 다시 자란다.
      scene.addKeyframe()
      scene.world.setBlocks(util.select.position(2, 0, 2), 'minecraft:dirt', true)
      scene.idle(15)
      scene.world.modifyEntity(sheep, e => e.setSheared(false))
      scene.idle(10)

      scene.text(90, '잔디를 먹으면 양털이 다시 자랍니다. 몇 번이고 깎을 수 있습니다.', spot)
        .placeNearTarget()
      scene.idle(100)
    })

    // ── 2장. 나뭇잎 베기 ────────────────────────────────────────────────
    .scene('shear_leaves', '나뭇잎 베기', (scene, util) => {
      // 나무가 땅에서 자란 것처럼 보이도록 바닥 판을 잔디로 갈아 둔다.
      scene.world.setBlocks(util.select.layer(0), 'minecraft:grass_block', false)

      // 작은 참나무 한 그루를 세운다. 잎을 먼저 깔고 줄기로 가운데를 덮는다.
      scene.world.setBlocks(util.select.fromTo(1, 3, 1, 3, 3, 3), 'minecraft:oak_leaves', false)
      scene.world.setBlocks(util.select.position(2, 4, 2), 'minecraft:oak_leaves', false)
      scene.world.setBlocks(util.select.fromTo(2, 1, 2, 2, 3, 2), 'minecraft:oak_log', false)
      scene.showStructure()
      scene.idle(10)

      const leaf = util.grid.at(3, 3, 2)
      const leafTop = util.vector.topOf(leaf)

      scene.text(80, '나뭇잎은 맨손으로 부수면 느리고, 대개 묘목만 조금 떨어집니다.', leafTop)
        .placeNearTarget()
      scene.idle(90)

      // 가위를 들고 좌클릭해서 부순다.
      scene.addKeyframe()
      scene.showControls(30, leafTop, 'down')
        .leftClick()
        .withItem('minecraft:shears')
      scene.idle(25)

      scene.world.setBlocks(util.select.position(3, 3, 2), 'minecraft:air', true)
      scene.world.createItemEntity(leafTop, util.vector.of(0, 0.2, 0), 'minecraft:oak_leaves')
      scene.idle(20)

      scene.text(90, '가위로 부수면 훨씬 빠르고, 나뭇잎 블록이 그대로 떨어집니다.', leafTop)
        .placeNearTarget()
      scene.idle(100)

      // 이어서 두 칸 더 베어 속도를 보여 준다.
      scene.addKeyframe()
      ;[[1, 3, 2], [2, 3, 3]].forEach(([x, y, z]) => {
        const p = util.vector.topOf(util.grid.at(x, y, z))
        scene.world.setBlocks(util.select.position(x, y, z), 'minecraft:air', true)
        scene.world.createItemEntity(p, util.vector.of(0, 0.2, 0), 'minecraft:oak_leaves')
        scene.idle(12)
      })
      scene.idle(20)

      scene.text(90, '나뭇잎을 모아 두면 건축에도 쓰고, 태워서 숯을 굽기도 좋습니다.',
        util.vector.topOf(util.grid.at(2, 4, 2)))
        .placeNearTarget()
      scene.idle(100)
    })
})
