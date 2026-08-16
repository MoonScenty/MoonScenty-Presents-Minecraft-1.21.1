// Reforged 도구는 다 닳아도 사라지지 않고 "부서진" 아이템으로 바뀐다.
//
// NeoForge에는 아이템 손상 이벤트가 없고 파괴 이벤트는 취소할 수 없다.
// 그래서 부서지는 것 자체는 막지 않고, 부서진 직후 같은 손에 대체 아이템을 쥐여준다.
// 플레이어 입장에서는 아이템을 잃지 않는다.
//
// event.item은 NeoForge의 getOriginal()이라 파괴 전 상태를 그대로 담고 있다.
const MATERIALS = ['andesite_alloy', 'copper', 'brass', 'steel', 'netherite']
const TYPES = ['pickaxe', 'axe', 'shovel', 'hoe', 'sword']

// 부서진 아이템으로 넘겨야 하는 컴포넌트.
// 숙련도를 별도 컴포넌트로 관리하게 되면 여기에 추가한다.
const CARRY_COMPONENTS = [
  'minecraft:enchantments',
  'minecraft:custom_name',
  'minecraft:lore',
  'minecraft:repair_cost',
  'minecraft:custom_data',
  'minecraft:max_damage'
]

function carryOver(from, to) {
  CARRY_COMPONENTS.forEach(id => {
    const value = from.get(id)
    if (value) {
      to.set(id, value)
    }
  })
}

MATERIALS.forEach(mat => {
  TYPES.forEach(type => {
    const tool = `kubejs:reforged_${mat}_${type}`
    const broken = `kubejs:broken_reforged_${mat}_${type}`

    ItemEvents.destroyed(tool, event => {
      const player = event.player
      if (!player) return

      const stack = Item.of(broken)
      carryOver(event.item, stack)
      player.setItemInHand(event.hand, stack)
    })
  })
})

// 부서진 도구는 모루에서 재료를 넣어 되살린다.
// 바닐라 모루는 도구가 아닌 아이템을 수리 대상으로 보지 않으므로 직접 처리한다.
const REPAIR_MATERIAL = {
  andesite_alloy: 'create:andesite_alloy',
  copper: 'minecraft:copper_ingot',
  brass: 'create:brass_ingot',
  steel: 'createmetallurgy:steel_ingot',
  netherite: 'minecraft:netherite_ingot'
}

const REPAIR_COUNT = 1   // 필요한 재료 개수
const REPAIR_COST = 5    // 경험치 레벨

const AnvilUpdateEvent = Java.loadClass('net.neoforged.neoforge.event.AnvilUpdateEvent')

NativeEvents.onEvent(AnvilUpdateEvent, event => {
  const left = event.left
  const right = event.right
  if (!left || left.empty || !right || right.empty) return

  const id = left.id
  if (!id.startsWith('kubejs:broken_reforged_')) return

  const suffix = id.substring('kubejs:broken_reforged_'.length)
  const mat = MATERIALS.find(m => suffix.startsWith(m + '_'))
  if (!mat) return

  if (right.id !== REPAIR_MATERIAL[mat]) return
  if (right.count < REPAIR_COUNT) return

  // 재료 하나로 내구도를 전부 회복시킨다.
  const repaired = Item.of(`kubejs:reforged_${suffix}`)
  carryOver(left, repaired)
  repaired.damageValue = 0

  event.output = repaired
  event.materialCost = REPAIR_COUNT
  event.cost = REPAIR_COST
})
