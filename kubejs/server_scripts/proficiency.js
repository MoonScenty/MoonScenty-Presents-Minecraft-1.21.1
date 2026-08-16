// 숙련도: 쓸수록 도구가 성장한다.
//
// 사용 횟수를 도구 스택에 기록하고, 문턱을 넘을 때마다 숙련도 인챈트를
// 한 단계 올리면서 최대 내구도도 함께 늘린다.
//
// 누적치는 minecraft:custom_data에 넣는다. 부서졌다 되살아나도 유지되어야
// "쓸수록 익는다"는 의도가 지켜지므로, tools.js의 승계 목록에도 들어 있다.
const PROFICIENCY_MATERIALS = ['andesite_alloy', 'copper', 'brass', 'steel', 'netherite']
const MINING_TYPES = ['pickaxe', 'axe', 'shovel', 'hoe']

// 티어가 높을수록 익는 데 오래 걸린다. 아래 값이 1레벨 도달에 필요한 횟수다.
// 테스트할 때는 이 숫자만 잠깐 낮추면 된다.
const TIER_BASE = {
  andesite_alloy: 100,
  copper: 200,
  brass: 300,
  steel: 400,
  netherite: 500
}

// 레벨별 배수와 최대 내구도 증가량. 필요 횟수는 티어 기준값 × 배수다.
const LEVEL_STEPS = [
  { level: 1, multiplier: 1, bonus: 50 },
  { level: 2, multiplier: 3, bonus: 150 },
  { level: 3, multiplier: 6, bonus: 300 }
]

const MAX_LEVEL_STEP = LEVEL_STEPS[LEVEL_STEPS.length - 1]

// 인챈트가 붙을 대상을 태그로 묶는다. 인챈트 정의가 이 태그를 참조한다.
ServerEvents.tags('item', event => {
  PROFICIENCY_MATERIALS.forEach(mat => {
    MINING_TYPES.forEach(type => {
      event.add('kubejs:reforged_mining', `kubejs:reforged_${mat}_${type}`)
    })
    event.add('kubejs:reforged_swords', `kubejs:reforged_${mat}_sword`)
  })
})

function materialOf(id) {
  const suffix = id.substring('kubejs:reforged_'.length)
  return PROFICIENCY_MATERIALS.find(m => suffix.startsWith(m + '_'))
}

function addUse(stack) {
  if (!stack || stack.empty) return
  if (!stack.id.startsWith('kubejs:reforged_')) return

  const material = materialOf(stack.id)
  if (!material) return

  const base = TIER_BASE[material]
  const maxUses = base * MAX_LEVEL_STEP.multiplier

  // custom_data는 평범한 객체가 아니라 CompoundTag를 감싼 컴포넌트다.
  // 컴포넌트로 읽으면 필드 접근이 되지 않으므로 NBT API를 쓴다.
  const data = stack.customData
  const prevUses = data.getInt('proficiency_uses')

  // 최대 레벨에 도달했으면 더 쌓지 않는다. 값이 무한정 커질 이유가 없다.
  if (prevUses >= maxUses) return

  const uses = prevUses + 1
  const prevBonus = data.getInt('proficiency_bonus')

  let level = 0
  let bonus = 0
  LEVEL_STEPS.forEach(step => {
    if (uses >= base * step.multiplier) {
      level = step.level
      bonus = step.bonus
    }
  })

  if (level > 0 && bonus !== prevBonus) {
    // 이전 보너스를 뺀 원래 최대 내구도에 새 보너스를 더한다.
    // Rhino가 블록 안의 const를 함수 스코프로 끌어올려 재선언 오류를 내므로
    // 여기서는 지역 변수를 두지 않고 식으로 바로 계산한다.
    stack.set('minecraft:max_damage', (stack.maxDamage - prevBonus) + bonus)
    stack.enchant(stack.id.endsWith('_sword') ? 'kubejs:combat_proficiency' : 'kubejs:proficiency', level)
    data.putInt('proficiency_bonus', bonus)
  }

  data.putInt('proficiency_uses', uses)
  stack.customData = data
}

// 채굴 도구는 블록을 캘 때 익는다.
BlockEvents.broken(event => {
  const player = event.player
  if (player) {
    addUse(player.mainHandItem)
  }
})

// 검은 적을 때릴 때 익는다.
EntityEvents.afterHurt(event => {
  const attacker = event.source.entity
  if (attacker && attacker.player) {
    addUse(attacker.mainHandItem)
  }
})
