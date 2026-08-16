// 도구 머리 주조.
//
// 거푸집 두 등급 모두로 만들 수 있다.
//   내화 모르타르 - 주조 1회로 소모된다
//   흑연         - 소모되지 않는다
//
// 쇳물 양은 바닐라 제작법의 재료 수를 그대로 따른다. 주괴 하나가 90mb다.
const MOLTEN = {
  andesite_alloy: 'kubejs:molten_andesite_alloy',
  copper: 'createmetallurgy:molten_copper',
  brass: 'createmetallurgy:molten_brass',
  steel: 'createmetallurgy:molten_steel'
}

// 머리: [바닐라 재료 수, 주조 시간(틱)]
const HEADS = {
  pickaxe: [3, 120],
  axe: [3, 120],
  sword: [2, 100],
  hoe: [2, 100],
  shovel: [1, 80]
}

const INGOT_MB = 90

ServerEvents.recipes(event => {
  Object.keys(MOLTEN).forEach(mat => {
    Object.keys(HEADS).forEach(head => {
      const [ingots, time] = HEADS[head]
      const amount = ingots * INGOT_MB

      const cast = (moldId, consumed, suffix) => {
        event.custom({
          type: 'createmetallurgy:casting_in_table',
          ingredients: [
            { type: 'neoforge:single', amount: amount, fluid: MOLTEN[mat] },
            { item: moldId }
          ],
          processing_time: time,
          mold_consumed: consumed,
          result: { item: { count: 1, id: `kubejs:${mat}_${head}_head` } }
        }).id(`kubejs:casting_in_table/${mat}_${head}_head_${suffix}`)
      }

      cast(`kubejs:refractory_mortar_${head}_mold`, true, 'mortar')
      cast(`kubejs:graphite_${head}_mold`, false, 'graphite')
    })
  })

  // 머리 + 막대 -> 도구. 손잡이는 바닐라 막대를 쓴다.
  // 검만 막대 1개, 나머지는 2개로 바닐라 제작법과 같다.
  Object.keys(MOLTEN).forEach(mat => {
    Object.keys(HEADS).forEach(head => {
      const pattern = head === 'sword' ? ['H', 'S'] : ['H', 'S', 'S']
      event.shaped(`kubejs:reforged_${mat}_${head}`, pattern, {
        H: `kubejs:${mat}_${head}_head`,
        S: 'minecraft:stick'
      }).id(`kubejs:crafting/reforged_${mat}_${head}`)
    })
  })
})
