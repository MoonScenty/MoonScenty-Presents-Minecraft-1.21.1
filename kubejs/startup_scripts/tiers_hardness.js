// Create Tiers 블록의 단단하기.
//
// 원본은 strength(3.0, 4.8)을 준다. Create의 축·톱니바퀴·큰 톱니바퀴·기어박스는
// 넷 다 SharedProperties::stone, 곧 안산암을 그대로 베껴 strength(1.5, 6.0)이다.
// 티어 부품이 원본 부품보다 두 배 단단할 이유가 없어 같은 값으로 맞춘다.
//
// ── 진짜 아팠던 이유 ────────────────────────────────────────────────────
//
// 단단하기 3.0은 사실 곁가지였다. Create Tiers는 광질 태그와 전리품표를
// 동적 데이터팩으로 만드는데, 경로가 1.20 규격이다.
//
//   tags/blocks/mineable/pickaxe   → 1.21은 tags/block/
//   loot_tables/blocks/<이름>       → 1.21은 loot_table/
//
// 두 폴더 이름 모두 1.21에서 단수로 바뀌었다. 그래서 게임은 이 파일들을
// 아예 읽지 않는다. 블록에는 requiresCorrectToolForDrops가 걸려 있는데
// 곡괭이 태그가 없으니 어떤 도구로도 "맞는 도구"가 되지 못한다.
//
//   지금  곡괭이가 태그 밖 → 도구 속도 1.0, 수확 불가 판정
//         1.0 / 3.0 / 100 = 틱당 0.0033  →  300틱, 15초
//   이후  철 곡괭이가 태그 안 → 도구 속도 6.0, 수확 가능 판정
//         6.0 / 1.5 / 30  = 틱당 0.1333  →  7.5틱, 0.4초
//
// 게다가 전리품표까지 읽히지 않아 15초를 캐고도 아무것도 떨어지지 않았다.
// 세로 기어박스만 예외인데, TieredGearboxBlock이 세로일 때만 getDrops를
// 직접 재정의해 아이템을 돌려주기 때문이다. 가로 기어박스는 전리품표를 탄다.
//
// 태그와 전리품표는 kubejs/data에 올바른 경로로 다시 깔았다.
//
//   kubejs/data/minecraft/tags/block/mineable/pickaxe.json
//   kubejs/data/createtiers/loot_table/blocks/<이름>.json   (40개)
//
// 그쪽은 블록 하나마다 파일이 필요해 티어를 늘리면 같이 늘려야 한다.
// 단단하기만 정규식으로 걸어 두어 새 티어에도 저절로 붙는다.

BlockEvents.modification(event => {
  event.modify(/^createtiers:/, block => {
    block.setDestroySpeed(1.5)
    block.setExplosionResistance(6.0)
  })
})
