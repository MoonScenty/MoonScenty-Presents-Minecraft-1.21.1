// 원자력 시대.
//
// 우라늄은 캐면 나온다. 문제는 정제 우라늄이다. 원본은 세척 한 번으로 끝나서
// 못 쓰는 우라늄이 1.7 배로 쌓이기만 한다.
//
// 여기에 재정제 2단계를 넣어 순환을 닫는다. 그리고 그 두 단계가 각각 자기
// 화학 라인을 끌고 온다.
//
// 목표는 궁극 케이싱이고, 그 유일한 쓸모는 천사의 반지다.
//
// 상수 이름이 다른 시대 파일과 겹치면 그 파일이 통째로 로드되지 않는다.
// KubeJS 서버 스크립트는 전역 스코프를 공유한다. 그래서 이름을 ATOM_ 로 연다.

const ATOM_VOID = {
  shaft: 'createtiers:shaft_void_steel',
  cog: 'createtiers:cogwheel_void_steel',
  large: 'createtiers:large_cogwheel_void_steel',
  gearbox: 'createtiers:gearbox_void_steel',
  vertical: 'createtiers:vertical_gearbox_void_steel'
}

const ATOM_STEEL = {
  shaft: 'createtiers:shaft_steel',
  cog: 'createtiers:cogwheel_steel',
  large: 'createtiers:large_cogwheel_steel',
  gearbox: 'createtiers:gearbox_steel',
  vertical: 'createtiers:vertical_gearbox_steel'
}

const ATOM_VOID_SHEET = 'createutilities:void_steel_sheet'
const ATOM_DENSE = 'createatomic:dense_alloy'
const ATOM_PLUTONIUM = '#c:ingots/plutonium'
const ATOM_CASING = 'kubejs:ultimate_casing'
const ATOM_CHARGE = 'kubejs:hydrogen_charge'

ServerEvents.recipes(event => {
  // ── 동력 부품을 공허 강철로 승급 ──────────────────────────────────────
  //
  // 강철 부품에 공허 강철 판 하나를 얹는다. 앞선 세 시대와 같은 방식이다.
  //
  // 공허 강철 판은 태그가 아니라 아이템으로 직접 쓴다. c:plates/void_steel 을
  // 채우는 모드가 없고, 산업 시대에서도 그 태그를 비워 둔 채 주조 레시피를
  // 직접 썼다.
  //
  // 공허 강철 판은 산업 시대 결승선 바로 앞 재료라, 이 시대에 들어서자마자
  // 티어를 올릴 수 있다. 강철 부품이 산업 시대 초입에 열렸던 것과 같다.
  ;[
    [ATOM_VOID.shaft, ATOM_STEEL.shaft, 'shaft'],
    [ATOM_VOID.cog, ATOM_STEEL.cog, 'cogwheel'],
    [ATOM_VOID.large, ATOM_STEEL.large, 'large_cogwheel'],
    [ATOM_VOID.gearbox, ATOM_STEEL.gearbox, 'gearbox'],
    [ATOM_VOID.vertical, ATOM_STEEL.vertical, 'vertical_gearbox']
  ].forEach(([out, from, name]) => {
    event.shapeless(out, [from, ATOM_VOID_SHEET]).id(`kubejs:crafting/${name}_void_steel`)
  })

  // 기어박스 두 종은 서로 뒤집을 수 있다. 앞선 세 시대와 같다.
  event.shapeless(ATOM_VOID.gearbox, [ATOM_VOID.vertical])
    .id('kubejs:crafting/gearbox_void_steel_from_conversion')
  event.shapeless(ATOM_VOID.vertical, [ATOM_VOID.gearbox])
    .id('kubejs:crafting/vertical_gearbox_void_steel_from_conversion')

  // ── Dense Alloy ───────────────────────────────────────────────────────
  //
  // 원자력 제작 레시피 21 개 중 16 개가 이것을 요구한다. 관문이 아니라
  // 바탕이므로 잠그지 않고 무겁게만 한다. 재료 등급만 올리고 양은 그대로다.
  //
  // 잠그면 시대 전체가 한 번에 막혀 순서가 생기지 않는다. 이 시대에서
  // 청동 자리에 해당하는 것은 정제 우라늄이다.
  //
  // 석탄은 그대로 둔다. Metallurgy 가 createmetallurgy:coke 를 minecraft:coals
  // 태그에 넣어 두어 코크스를 태워도 된다.
  //
  // 납 노선은 c:ingots/lead 가 비어 있어 어차피 죽어 있지만 명시적으로 지운다.
  event.remove({ id: 'createatomic:mixing/mixing/dense_alloy' })
  event.remove({ id: 'createatomic:mixing/mixing/dense_alloy_alt' })
  event.custom({
    type: 'create:mixing',
    ingredients: [
      { tag: 'c:ingots/steel' },
      { tag: 'c:ingots/steel' },
      { tag: 'c:ingots/bronze' },
      { tag: 'minecraft:coals' }
    ],
    results: [{ id: ATOM_DENSE }]
  }).id('kubejs:mixing/dense_alloy')

  // ── 증기 터빈 ─────────────────────────────────────────────────────────
  //
  // 원본이 바닐라 축을 요구하는데 그 제작법은 안산암 합금 시대에 지웠다.
  // 지금 상태로는 만들 수 없다. 공허 강철 축으로 바꾼다.
  //
  // 배치와 나머지 재료는 원본 그대로다. 원본에 있던 두 번째 판본(turbine_alt)은
  // 구리 판 태그만 다른 같은 레시피라 함께 지우고 하나로 합친다.
  event.remove({ id: 'createatomic:crafting/turbine' })
  event.remove({ id: 'createatomic:crafting/turbine_alt' })
  event.shaped('createatomic:steam_turbine', [
    'DCC',
    'FPP',
    'DCC'
  ], {
    D: ATOM_DENSE,
    C: '#c:plates/copper',
    F: ATOM_VOID.shaft,
    P: 'create:propeller'
  }).id('kubejs:crafting/steam_turbine')

  // ── 화학 1 — 물을 가른다 ──────────────────────────────────────────────
  //
  // Petrochem 원본이 petrochem_expert 조건이라 꺼져 있다. 조건 없이 다시 넣는다.
  //
  // 산소는 우라늄 농축에 쓰고, 수소는 두 배로 남아 수소 폭탄으로 간다.
  //
  // 이것이 켜지면 산업 시대 선택 퀘스트 0102 Hydrogen 과 0103 Oxygen 이
  // 완료 가능해진다.
  event.custom({
    type: 'petrochem:electrolyzing',
    energy: 150,
    ingredients: [{ type: 'neoforge:single', amount: 300, fluid: 'minecraft:water' }],
    results: [
      { amount: 200, id: 'petrochem:hydrogen' },
      { amount: 100, id: 'petrochem:oxygen' }
    ]
  }).id('kubejs:electrolyzing/water_electrolysis')

  // ── 재정제 사이클 ─────────────────────────────────────────────────────
  //
  // 원본 수치는 이렇다.
  //
  //   우라늄 광석 → 분쇄 → 부스러기 평균 2.5
  //   부스러기 1 → 세척 → 우라늄 너깃 6 + 정제 너깃 3.5
  //
  // 광석 하나당 우라늄 1.67 주괴, 정제 우라늄 0.97 주괴다. 쓸 수 있는 것보다
  // 못 쓰는 것이 1.7 배 많다.
  //
  // 그래서 우라늄 4 를 정제 우라늄 2 로 바꾼다. 2 대 1 이다. 광석 하나당
  // 정제 우라늄이 0.97 에서 1.80 주괴가 되고 남는 우라늄이 정확히 사라진다.
  //
  // 더 후하면 세척 노선이 무의미해지고, 더 박하면 우라늄이 계속 쌓인다.

  // 앞 — 농축. 옐로케이크는 Create: Atomic 에 에셋만 남아 있고 AtomicBlocks 에도
  // AtomicItems 에도 등록되어 있지 않다. 게임 안에 없는 유령이라 이 팩이 아이템으로
  // 따로 만들었다. 실제 우라늄 정련의 중간체이기도 하다.
  //
  // minimal_rpm 256 을 걸어 공허 강철 티어를 강제한다. 황동 64, Comb Block
  // 128 로 올라온 사다리의 마지막 칸이다.
  event.custom({
    type: 'vintageimprovements:centrifugation',
    ingredients: [
      { item: 'createatomic:uranium_ingot' },
      { item: 'createatomic:uranium_ingot' },
      { item: 'createatomic:uranium_ingot' },
      { item: 'createatomic:uranium_ingot' },
      { type: 'neoforge:single', amount: 500, fluid: 'petrochem:oxygen' }
    ],
    results: [{ count: 1, id: 'kubejs:yellow_cake' }],
    processing_time: 600,
    minimal_rpm: 256
  }).id('kubejs:centrifugation/yellow_cake')

  // 뒤 — 재변환. 농축한 뒤 화학으로 연료 형태로 되돌리는 실제 공정과 같다.
  //
  // 전해조를 두 번 쓰게 되는 것이 이 설계의 요점이다. 산업 시대에 세운
  // 기계가 장식으로 남지 않는다.
  //
  // 황산 1,000mB 는 황 하나다. 황은 산업 시대에서 연다.
  event.custom({
    type: 'petrochem:electrolyzing',
    energy: 400,
    ingredients: [
      { item: 'kubejs:yellow_cake' },
      { type: 'neoforge:tag', amount: 1000, tag: 'c:sulfuric_acid' }
    ],
    results: [
      { count: 2, id: 'createatomic:refined_uranium_ingot' }
    ]
  }).id('kubejs:electrolyzing/refined_uranium')

  // ── 수소 폭탄 ─────────────────────────────────────────────────────────
  //
  // 재정제 배치 하나가 산소 500mB 를 쓰면서 수소 1,000mB 를 남긴다.
  // 배치 세 번이면 폭탄 하나 분량이 모인다.
  //
  // 배치는 원본 그대로고 화약 자리만 수소 장약으로 바뀐다. 폭탄 하나에
  // 수소 3,000mB 다.
  event.custom({
    type: 'create:filling',
    ingredients: [
      { item: 'minecraft:gunpowder' },
      { type: 'neoforge:single', amount: 500, fluid: 'petrochem:hydrogen' }
    ],
    results: [{ id: ATOM_CHARGE }]
  }).id('kubejs:filling/hydrogen_charge')

  event.remove({ id: 'createatomic:crafting/crude_nuclear_bomb' })
  event.shaped('createatomic:crude_nuclear_bomb', [
    'HDH',
    'HPH',
    'HDH'
  ], {
    H: ATOM_CHARGE,
    D: ATOM_DENSE,
    P: ATOM_PLUTONIUM
  }).id('kubejs:crafting/crude_nuclear_bomb')

  // ── 궁극 케이싱 — 결승선 ──────────────────────────────────────────────
  //
  // 이 모드팩 전체의 마지막 아이템이다. 앞선 다섯 시대의 케이싱을 전부
  // 모은다. 한가운데가 플루토늄인 것이 요점이다. 플루토늄은 원자로를
  // 실제로 돌려야만 나오므로 재료를 사 모으는 것으로는 만들 수 없다.
  event.custom({
    type: 'create:mechanical_crafting',
    accept_mirrored: false,
    key: {
      A: { item: 'create:andesite_casing' },
      C: { item: 'create:copper_casing' },
      W: { item: 'kubejs:waterproof_copper_casing' },
      B: { item: 'create:brass_casing' },
      S: { item: 'kubejs:steel_casing' },
      U: { item: 'createutilities:void_casing' },
      V: { item: ATOM_VOID_SHEET },
      P: { tag: 'c:ingots/plutonium' }
    },
    pattern: [
      'ACW',
      'BPS',
      'VUV'
    ],
    result: { count: 1, id: ATOM_CASING }
  }).id('kubejs:mechanical_crafting/ultimate_casing')

  // ── 천사의 반지 ───────────────────────────────────────────────────────
  //
  // 궁극 케이싱의 유일한 쓸모다.
  //
  // 이 팩은 다섯 시대 내내 땅에서 회전축을 다뤄 왔다. 그 마지막에 땅을
  // 떠나는 것보다 어울리는 보상이 없다.
  //
  // 배치는 원본 그대로 두고 금 블록 하나를 궁극 케이싱으로 바꾼다. 원본은
  // 한가운데가 다이아 반지고 금 블록이 셋이었다.
  //
  // 다이아 반지는 그대로 둔다. 엘리트라를 요구하므로 엔드는 다녀와야 한다.
  //
  // 팩 안에 다른 상시 비행 수단은 없다. Artifacts 의 헬륨 플라밍고는
  // 시간제 부양이고 Relics 의 운동 벨트는 진짜로 날게 하지 않는다.
  event.remove({ id: 'angelring:angel_ring' })
  event.shaped('angelring:angel_ring', [
    'FXF',
    'GUG',
    'NRN'
  ], {
    F: 'minecraft:feather',
    X: 'minecraft:blaze_rod',
    G: 'minecraft:gold_block',
    U: ATOM_CASING,
    N: 'minecraft:nether_star',
    R: 'angelring:diamond_ring'
  }).id('kubejs:crafting/angel_ring')
})
