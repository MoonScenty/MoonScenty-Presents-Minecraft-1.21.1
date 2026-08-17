// cogwheelColor는 각 티어가 대응하는 재질의 Create 텍스처에서 뽑은 대표색이다.
// crude=안산암 합금, rough=황동, standard=산업용 철, reinforced=공허 강철
CreateTiers.registerTiers([
  { name: 'crude', level: 1, maxRPM: 32, maxSU: 1024, shaftColor: 0x707572, cogwheelColor: 0x6E7A73, displayName: 'Crude' },
  { name: 'rough', level: 2, maxRPM: 64, maxSU: 2048, shaftColor: 0x707572, cogwheelColor: 0xC89B59, displayName: 'Rough' },
  { name: 'standard', level: 3, maxRPM: 128, maxSU: 4096, shaftColor: 0x707572, cogwheelColor: 0x8A8D91, displayName: 'Standard' },
  { name: 'reinforced', level: 4, maxRPM: 256, maxSU: 67108864, shaftColor: 0x936C3D, cogwheelColor: 0x258474, displayName: 'Reinforced' }
])
