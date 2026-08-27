// 전구와 텅스텐 와이어 스풀.
//
// Metallurgy의 색깔 전구 16종이 텅스텐 와이어 스풀을 요구한다. 그런데 이
// 모드팩은 스풀이라는 중간 부품을 쓰지 않기로 했다. Crafts & Additions의
// 스풀 다섯 종은 산업 시대에서 지우고, 그때 쓰던 자리는 황동 판과 황동
// 주괴로 옮겼다.
//
// 텅스텐 스풀만 남겨 두면 이유 없이 하나가 튀므로 같이 지운다. 다만 그냥
// 지우면 전구 16종이 통째로 죽는다. 텅스텐은 이 팩에서 온전히 얻어지고
// (볼프라마이트 광석 → 분쇄 → 세척 → 주조) 전구도 살려 둘 값어치가 있다.
//
// 그래서 전구가 스풀 대신 텅스텐 주괴를 바로 받게 한다. 배치와 나머지
// 재료는 원본 그대로다.
//
// 재염색 레시피 16종(light_bulbs/..._from_other_light_bulb)은 스풀을 쓰지
// 않으므로 손대지 않는다.
//
// 시대 진행과 무관한 정리라 시대 파일에 넣지 않는다. 상수는 이벤트 안에
// 둔다. KubeJS 서버 스크립트는 전역 스코프를 공유한다.

ServerEvents.recipes(event => {
  const COLORS = [
    'black', 'blue', 'brown', 'cyan',
    'gray', 'green', 'light_blue', 'light_gray',
    'lime', 'magenta', 'orange', 'pink',
    'purple', 'red', 'white', 'yellow'
  ]

  // 스풀 자체를 지운다. 남는 소비처가 없다.
  event.remove({ id: 'createmetallurgy:crafting/materials/tungsten_wire_spool' })

  COLORS.forEach(color => {
    event.remove({ id: `createmetallurgy:crafting/${color}_light_bulb` })
    event.shaped(`createmetallurgy:${color}_light_bulb`, [
      'G',
      'T',
      'S'
    ], {
      G: `minecraft:${color}_stained_glass`,
      T: 'createmetallurgy:tungsten_ingot',
      S: 'create:iron_sheet'
    }).id(`kubejs:crafting/${color}_light_bulb`)
  })
})
