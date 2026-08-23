// 동력 전달 부품의 티어.
//
// 티어 이름을 재질 이름으로 둔다. 등급을 나타내는 말(Crude, Rough 같은)보다
// 무엇으로 만드는지가 바로 보이는 편이 낫다.
//
// 시대 대응은 안산암 합금 → 황동 → 강철 → 공허 강철이다. RPM은 32에서
// 두 배씩 오르고 SU도 1024에서 두 배씩 오르되, 마지막만 상한을 사실상
// 없앤다.
//
// shaftColor는 마지막 티어만 다르다. 축은 회색으로 두고 톱니바퀴 색으로
// 티어를 구분하다가, 공허 강철에서만 축까지 바뀐다.
// cogwheelColor는 각 티어가 대응하는 재질의 Create 텍스처에서 뽑은 대표색이다.
//
// Create Tiers는 티어별 부품을 동적으로 만들지만 제작법은 하나도 넣지 않는다.
// 여기서는 등록만 하고, 제작법은 안산암 합금 시대 작업에서 따로 정의한다.
CreateTiers.registerTiers([
  { name: 'andesite_alloy', level: 1, maxRPM: 32,  maxSU: 1024,     shaftColor: 0x707572, cogwheelColor: 0x6E7A73, displayName: 'Andesite Alloy' },
  { name: 'brass',          level: 2, maxRPM: 64,  maxSU: 2048,     shaftColor: 0x707572, cogwheelColor: 0xC89B59, displayName: 'Brass' },
  { name: 'steel',          level: 3, maxRPM: 128, maxSU: 4096,     shaftColor: 0x707572, cogwheelColor: 0x8A8D91, displayName: 'Steel' },
  { name: 'void_steel',     level: 4, maxRPM: 256, maxSU: 67108864, shaftColor: 0x936C3D, cogwheelColor: 0x258474, displayName: 'Void Steel' }
])
