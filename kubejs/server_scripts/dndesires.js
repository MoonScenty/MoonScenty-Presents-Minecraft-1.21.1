ServerEvents.recipes(event => {
  // 톱니 크랭크 계열은 기본이 톱니바퀴를 요구해 안산암 합금에 묶여 있다.
  // 판자만으로 손 크랭크에서 올라가도록 바꾼다.
  // 대형 톱니 크랭크는 제작 경로를 모두 막는다.
  event.remove({ id: 'dndesires:crafting/cog_crank' })
  event.remove({ id: 'dndesires:crafting/large_cog_crank' })
  event.remove({ id: 'dndesires:crafting/cog_crank_to_large' })

  event.shapeless('dndesires:cog_crank', [
    'create:hand_crank',
    '#minecraft:planks'
  ]).id('kubejs:crafting/cog_crank')
})
