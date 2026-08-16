// 주조로 만드는 Reforged 도구.
//
// 바닐라 도구와 구분하기 위해 이름에 Reforged(제련된)를 붙인다.
// 머리는 거푸집으로 주조하고 손잡이는 바닐라 막대를 쓴다.
// 네더라이트는 여기서 만들지 않는다. 강철 도구를 대장장이 형판으로 승급시킨다.
//
// uses를 지정하지 않으면 대응 티어의 기본 내구도를 그대로 쓴다.
// 황동은 금 티어라 기본이 32뿐이라 실사용이 어려워 따로 올렸다.
// 네더라이트는 머리를 주조하지 않는다. 강철 도구를 대장장이 형판으로 승급시킨다.
// 그래서 fireResistant도 바닐라 네더라이트와 같게 준다.
const TOOL_MATERIALS = [
  { id: 'andesite_alloy', name: 'Andesite Alloy', tier: 'stone' },
  { id: 'copper', name: 'Copper', tier: 'iron' },
  { id: 'brass', name: 'Brass', tier: 'gold', uses: 180 },
  { id: 'steel', name: 'Steel', tier: 'diamond' },
  { id: 'netherite', name: 'Netherite', tier: 'netherite', fireResistant: true }
]

const TOOL_TYPES = [
  { id: 'pickaxe', name: 'Pickaxe' },
  { id: 'axe', name: 'Axe' },
  { id: 'shovel', name: 'Shovel' },
  { id: 'hoe', name: 'Hoe' },
  { id: 'sword', name: 'Sword' }
]

StartupEvents.registry('item', event => {
  TOOL_MATERIALS.forEach(mat => {
    TOOL_TYPES.forEach(type => {
      const builder = event.create(`reforged_${mat.id}_${type.id}`, type.id)
        .tier(mat.tier)
        .displayName(`Reforged ${mat.name} ${type.name}`)

      if (mat.uses) {
        builder.modifyTier(tier => {
          tier.uses = mat.uses
        })
      }

      if (mat.fireResistant) {
        builder.fireResistant()
      }

      // 내구도가 다 하면 이걸로 바뀐다. 도구가 아닌 평범한 아이템이라
      // 아무 기능도 없고, 수리해서 되돌리는 재료로만 쓰인다.
      const brokenBuilder = event.create(`broken_reforged_${mat.id}_${type.id}`)
        .displayName(`Broken Reforged ${mat.name} ${type.name}`)
        .unstackable()

      if (mat.fireResistant) {
        brokenBuilder.fireResistant()
      }
    })
  })
})
