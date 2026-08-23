// 동력 전달 부품의 티어.
//
// 티어 이름을 재질 이름으로 둔다. 등급을 나타내는 말(Crude, Rough 같은)보다
// 무엇으로 만드는지가 바로 보이는 편이 낫다.
//
// 시대 대응은 안산암 합금 → 황동 → 강철 → 공허 강철이다. RPM은 32에서
// 두 배씩 오르고 SU도 1024에서 두 배씩 오르되, 마지막만 상한을 사실상
// 없앤다.
//
// Create Tiers는 티어별 부품을 동적으로 만들지만 제작법은 하나도 넣지 않는다.
// 여기서는 등록만 하고, 제작법은 각 시대 작업에서 따로 정의한다.
//
// ── 색상에 대하여 ───────────────────────────────────────────────────────
//
// 두 색은 그대로 화면에 찍히는 값이 아니다. Create Tiers는 Create의 원본
// 텍스처를 Rec.709 휘도(0.2126 / 0.7152 / 0.0722)로 회색조화한 뒤, 바닐라
// 색 핸들러로 곱하기 틴트를 건다.
//
//   화면에 보이는 색 = 회색조 밝기 × 틴트 / 255
//
// 그래서 재질의 색을 그냥 적으면 두 번 어두워진다. 실제로 그 재질처럼
// 보이게 하려면 기준 텍스처의 평균 휘도로 나눠 되돌려야 한다.
//
//   틴트 = 255 × 재질 평균색 / 기준 텍스처 평균 휘도
//
// 기준 텍스처와 평균 휘도는 이렇다. 이 값이 틴트 #FFFFFF일 때 낼 수 있는
// 최대 밝기이기도 하다.
//
//   shaftColor    create:block/axis + axis_top   113.22
//   cogwheelColor create:block/cogwheel_axis     110.04
//
// 두 색이 티어마다 거의 같은 것은 정상이다. 둘 다 같은 금속 축을 칠하며,
// 기준 텍스처의 밝기만 조금 다르다. 톱니바퀴의 나무 이는 회색조 대상이
// 아니라서 어떤 티어에서도 나무색 그대로 남는다.
//
// 황동은 별표가 붙는 경우다. 황동 블록(#C89B59)이 기준 텍스처보다 밝아서
// 곱하기 틴트로는 그 밝기에 닿지 못한다. 색조만 맞추고 밝기는 포기한 값이라
// 화면에서는 조금 어두운 황동으로 보인다.
//
// 강철은 Metallurgy의 강철 블록(#494949)을 기준으로 삼았다. Petrochem에도
// 같은 태그의 강철이 있고 그쪽은 조금 밝다(#585858 → 0xC6C6C6 / 0xCBCBCB).
CreateTiers.registerTiers([
  { name: 'andesite_alloy', level: 1, maxRPM: 32,  maxSU: 1024,     shaftColor: 0xF5FFF6, cogwheelColor: 0xF5FFF6, displayName: 'Andesite Alloy' },
  { name: 'brass',          level: 2, maxRPM: 64,  maxSU: 2048,     shaftColor: 0xFFC672, cogwheelColor: 0xFFC672, displayName: 'Brass' },
  { name: 'steel',          level: 3, maxRPM: 128, maxSU: 4096,     shaftColor: 0xA5A5A5, cogwheelColor: 0xAAAAAA, displayName: 'Steel' },
  { name: 'void_steel',     level: 4, maxRPM: 256, maxSU: 67108864, shaftColor: 0x1E9D8A, cogwheelColor: 0x1EA28E, displayName: 'Void Steel' }
])
