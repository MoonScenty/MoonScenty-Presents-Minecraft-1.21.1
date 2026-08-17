ServerEvents.recipes(event => {
  // 분쇄 부산물로 다른 금속의 부스러기를 준다.
  //
  // 광맥에 다른 금속이 섞여 있다는 그림이다. 부족한 자원을 남는 자원으로
  // 메울 수 있게 되고, 초반에 원광을 갈아 만들던 부스러기가 후반에는
  // 저절로 굴러 들어온다. 막자사발 시절의 손해가 소급해서 사라진다.
  //
  // 대상은 원광과 광석 블록뿐이다. 크림사이트나 오크럼처럼 소량만 주는
  // 장식 암석 계열은 건드리지 않는다. 레시피 ID를 하나씩 지정해 지운다.
  //
  // 나머지 원본 분쇄 레시피는 rpm_conversion.js가 일괄로 옮긴다.
  // 여기서는 부산물이 붙는 것만 직접 rpm_crushing으로 다시 쓴다.
  const BYPRODUCT = [
    {
      filing: 'kubejs:zinc_filings',      // 철 광맥에 아연이 섞인다
      recipes: [
        { id: 'create:crushing/raw_iron', ing: { tag: 'c:raw_materials/iron' }, time: 400, out: [{ id: 'create:crushed_raw_iron' }] },
        { id: 'create:crushing/iron_ore', ing: { item: 'minecraft:iron_ore' }, time: 250, out: [{ id: 'create:crushed_raw_iron' }, { chance: 0.75, id: 'create:crushed_raw_iron' }, { chance: 0.125, id: 'minecraft:cobblestone' }] },
        { id: 'create:crushing/deepslate_iron_ore', ing: { item: 'minecraft:deepslate_iron_ore' }, time: 250, out: [{ id: 'create:crushed_raw_iron' }, { chance: 0.75, id: 'create:crushed_raw_iron' }, { chance: 0.125, id: 'minecraft:cobbled_deepslate' }] }
      ]
    },
    {
      filing: 'kubejs:gold_filings',      // 구리 광맥의 금 혼입
      recipes: [
        { id: 'create:crushing/raw_copper', ing: { tag: 'c:raw_materials/copper' }, time: 400, out: [{ id: 'create:crushed_raw_copper' }] },
        { id: 'create:crushing/copper_ore', ing: { item: 'minecraft:copper_ore' }, time: 250, out: [{ id: 'create:crushed_raw_copper' }, { chance: 0.75, id: 'create:crushed_raw_copper' }, { chance: 0.125, id: 'minecraft:cobblestone' }] },
        { id: 'create:crushing/deepslate_copper_ore', ing: { item: 'minecraft:deepslate_copper_ore' }, time: 250, out: [{ id: 'create:crushed_raw_copper' }, { chance: 0.75, id: 'create:crushed_raw_copper' }, { chance: 0.125, id: 'minecraft:cobbled_deepslate' }] }
      ]
    },
    {
      filing: 'kubejs:copper_filings',    // 금 광맥의 구리 혼입
      recipes: [
        { id: 'create:crushing/raw_gold', ing: { tag: 'c:raw_materials/gold' }, time: 400, out: [{ id: 'create:crushed_raw_gold' }] },
        { id: 'create:crushing/gold_ore', ing: { item: 'minecraft:gold_ore' }, time: 250, out: [{ id: 'create:crushed_raw_gold' }, { chance: 0.75, id: 'create:crushed_raw_gold' }, { chance: 0.125, id: 'minecraft:cobblestone' }] },
        { id: 'create:crushing/deepslate_gold_ore', ing: { item: 'minecraft:deepslate_gold_ore' }, time: 250, out: [{ id: 'create:crushed_raw_gold' }, { chance: 0.75, id: 'create:crushed_raw_gold' }, { chance: 0.125, id: 'minecraft:cobbled_deepslate' }] }
      ]
    },
    {
      filing: 'kubejs:iron_filings',      // 아연 광맥의 철 혼입
      recipes: [
        { id: 'create:crushing/raw_zinc', ing: { tag: 'c:raw_materials/zinc' }, time: 400, out: [{ id: 'create:crushed_raw_zinc' }] },
        { id: 'create:crushing/zinc_ore', ing: { item: 'create:zinc_ore' }, time: 250, out: [{ id: 'create:crushed_raw_zinc' }, { chance: 0.75, id: 'create:crushed_raw_zinc' }, { chance: 0.125, id: 'minecraft:cobblestone' }] },
        { id: 'create:crushing/deepslate_zinc_ore', ing: { item: 'create:deepslate_zinc_ore' }, time: 250, out: [{ id: 'create:crushed_raw_zinc' }, { chance: 0.75, id: 'create:crushed_raw_zinc' }, { chance: 0.125, id: 'minecraft:cobbled_deepslate' }] }
      ]
    },
    {
      filing: 'kubejs:iron_filings',      // 울프라마이트는 철과 함께 난다
      recipes: [
        { id: 'createmetallurgy:crushing/raw_wolframite', ing: { tag: 'c:raw_materials/tungsten' }, time: 400, out: [{ id: 'createmetallurgy:crushed_raw_tungsten' }] },
        { id: 'create:crushing/wolframite_ore', ing: { item: 'createmetallurgy:wolframite_ore' }, time: 350, out: [{ id: 'createmetallurgy:crushed_raw_tungsten' }, { chance: 0.125, id: 'minecraft:netherrack' }] }
      ]
    }
  ]

  BYPRODUCT.forEach(b => {
    b.recipes.forEach(r => {
      event.remove({ id: r.id })

      // RPM 분쇄바퀴가 처리하도록 rpm_crushing으로 내보낸다.
      // create:crushing으로 두면 rpm_conversion.js가 다시 옮기게 되어
      // 스크립트 실행 순서에 의존하게 된다.
      event.custom({
        type: 'createrecipeneedrpm:rpm_crushing',
        ingredients: [r.ing],
        processing_time: r.time,
        min_rpm: 32,
        results: r.out
          .concat([{ chance: 0.75, id: 'create:experience_nugget' }])
          .concat([{ chance: 0.25, id: b.filing }])
      }).id(`kubejs:${r.id.split(':')[1]}`)
    })
  })
})
