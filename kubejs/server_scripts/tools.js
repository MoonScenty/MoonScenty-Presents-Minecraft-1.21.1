// 도구가 다 닳으면 사라지지 않고 "부서진" 아이템으로 바뀐다.
//
// NeoForge에는 아이템 손상 이벤트가 없고 파괴 이벤트는 취소할 수 없다.
// 그래서 부서지는 것 자체는 막지 않고, 부서진 직후 같은 손에 대체 아이템을 쥐여준다.
// 플레이어 입장에서는 아이템을 잃지 않는다.
//
// event.item은 NeoForge의 getOriginal()이라 파괴 전 상태를 그대로 담고 있다.
const BROKEN_TOOLS = {
  'kubejs:copper_pickaxe': 'kubejs:broken_copper_pickaxe'
}

// 부서진 아이템으로 넘겨야 하는 컴포넌트.
// 숙련도를 별도 컴포넌트로 관리하게 되면 여기에 추가한다.
const CARRY_COMPONENTS = [
  'minecraft:enchantments',
  'minecraft:custom_name',
  'minecraft:lore',
  'minecraft:repair_cost'
]

function carryOver(from, to) {
  CARRY_COMPONENTS.forEach(id => {
    const value = from.get(id)
    if (value) {
      to.set(id, value)
    }
  })
}

Object.keys(BROKEN_TOOLS).forEach(id => {
  ItemEvents.destroyed(id, event => {
    const player = event.player
    if (!player) return

    const broken = Item.of(BROKEN_TOOLS[id])
    carryOver(event.item, broken)
    player.setItemInHand(event.hand, broken)
  })
})
