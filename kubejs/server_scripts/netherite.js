// 네더라이트 Reforged 도구는 주조하지 않는다.
// 바닐라와 같은 방식으로 대장장이 대장간에서 강철 도구를 승급시킨다.
//
//   네더라이트 업그레이드 형판 + 제련된 강철 도구 + 네더라이트 주괴
//
// 바닐라 승급과 마찬가지로 인챈트와 내구도는 그대로 이어진다.
const UPGRADE_TYPES = ['pickaxe', 'axe', 'shovel', 'hoe', 'sword']

ServerEvents.recipes(event => {
  UPGRADE_TYPES.forEach(type => {
    event.smithing(
      `kubejs:reforged_netherite_${type}`,
      'minecraft:netherite_upgrade_smithing_template',
      `kubejs:reforged_steel_${type}`,
      'minecraft:netherite_ingot'
    ).id(`kubejs:smithing/reforged_netherite_${type}`)
  })
})
