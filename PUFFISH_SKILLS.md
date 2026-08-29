# 스킬 트리 구상

이 문서는 MoonScenty Presents Minecraft 1.21.1의 Puffish Skills 스킬 트리 설계와 구현 기준을 관리합니다. 실제 데이터는 `kubejs/data/moonscenty/puffish_skills/`에 데이터팩 형식으로 작성합니다.

## 구현 현황

- 대상 모드는 Puffish Skills `0.18.3-1.21-neoforge`입니다.
- 카테고리 4개에 노드를 60개씩, 모두 240개 작성했습니다. 인게임에서 스킬 창이 열리고 네 탭이 표시되는 것까지 확인했으며 수치 검증이 남아 있습니다.
- 노드는 작은 증가량을 여러 번 쌓는 방식입니다. 정의를 재사용해 같은 정의를 여러 노드에 붙입니다.
- KubeJS 스크립트는 사용하지 않습니다. `kubejs/data/`를 데이터팩 경로로만 쓰고 내용은 순수 JSON입니다.
- 네임스페이스는 `moonscenty`입니다.
- 구성 방식은 FTB Evolution과 Craftoria의 실제 설정을 참고했습니다. 아래 「참고한 설정」을 보십시오.

## 설계 원칙

- 탭은 시각적 분류가 아니라 **독립된 진행 축**입니다. 카테고리마다 경험치 원천과 포인트 풀이 따로 있습니다.
- 그러므로 탭은 모드가 아니라 **행동**으로 나눕니다. 검을 휘두른 사람은 전투 포인트만, 요리한 사람은 생활 포인트만 쌓입니다.
- 루트를 제한하지 않습니다. 갈래를 자유롭게 섞을 수 있습니다.
- **`spent_points_limit`은 아예 적지 않습니다.** 페이싱은 오직 경험치 곡선으로 조절합니다. 이 키에 `0`을 넣으면 제한 없음이 아니라 **한 점도 못 쓴다**는 뜻이 됩니다. 쓸 수 있는 포인트를 `min(모은 포인트, spent_points_limit) - 쓴 포인트`로 계산하기 때문입니다. 키가 없으면 기본값이 `Integer.MAX_VALUE`라 사실상 무제한입니다.
- 포인트는 노드 수와 같게 줍니다. 끝까지 하면 한 탭을 전부 채울 수 있습니다.
- 노드 하나하나는 작게 잡습니다. 어느 노드도 반드시 찍어야 하는 것이 되지 않게 합니다.
- **기술 축은 트리에 넣지 않습니다.** Create를 Expert로 재구성한 이유가 병목 설계인데 스킬로 우회하면 의미가 없어집니다.
- **자원 산출량을 늘리지 않습니다.** 광석에서 부스러기, 용탕으로 이어지는 사슬은 석기 시대의 핵심 병목입니다.
- 다른 모드의 진행 체계를 건너뛰게 하지 않습니다. 주문은 위력만 올리고 습득은 Iron's Spells에 맡깁니다.
- 기존 시스템과 역할이 겹치지 않게 합니다. 제련된 도구의 숙련도는 *도구가* 성장하고, 채굴 탭은 *플레이어가* 성장합니다.

## 제외한 것과 사유

| 대상 | 사유 |
| --- | --- |
| 기술 및 제작 탭 (`craft_item`, `smelt_item`) | Create Expert 게이팅을 무력화합니다. |
| 채굴 산출량 증가 | 석기 시대 병목을 무너뜨립니다. |
| `mining_speed`, `mining_efficiency` | 제련된 도구의 숙련도 인챈트와 역할이 겹칩니다. |
| `additional_attributes:school/*`, `innate_spell/*` | 값만 올리면 주문을 통째로 부여해 Iron's Spells의 습득 체계를 건너뜁니다. |
| `exclusive_root` | 사용자 결정에 따라 갈래를 제한하지 않습니다. |
| `criterion` 경험치 원천 | `criterion` 필드가 필수인데 No Advancements로 바닐라 발전 과제를 껐습니다. |

## 탭 구성

| 탭 | 카테고리 ID | 경험치 원천 | 노드 | 정의 | 연결선 |
| --- | --- | --- | --- | --- | --- |
| 채굴 | `moonscenty:mining` | `mine_block` | 60 | 16 | 152 |
| 전투 | `moonscenty:combat` | `kill_entity` | 60 | 20 | 152 |
| 생활 | `moonscenty:living` | `eat_food` `fish_item` | 60 | 13 | 152 |
| 탐험 | `moonscenty:exploration` | `increase_stat` | 60 | 14 | 152 |

네 탭 모두 `unlocked_by_default: true`, `starting_points: 1`, `level_limit: 59`입니다. 시작 포인트를 더해 60개가 되어 노드 수와 일치합니다.

레벨은 자동으로 포인트가 됩니다. 모드가 경험치 곡선에서 현재 레벨을 구해 그 값을 그대로 포인트로 적립합니다. 따로 보상을 걸어 줄 필요가 없습니다.

## 배치

동심 육각 격자입니다. 이웃 노드 사이 거리는 `73.9`이며 가로 간격 `64`, 세로 간격 `36.95`로 놓입니다. FTB Evolution이 쓰는 것과 같은 규격입니다.

고리마다 노드가 1, 6, 12, 18, 23개씩 들어가 60개가 됩니다. 한 칸 떨어진 노드를 모두 이어서 노드당 평균 5.1개의 연결선을 가지는 그물이 됩니다. 막다른 길이 없고 한 노드로 가는 길이 여럿입니다.

안쪽 고리에는 작은 수치, 바깥으로 갈수록 큰 수치를 배치합니다.

---

## 1. 채굴

동굴에서 살아남고 더 넓게 캐는 탭입니다. **산출량은 다루지 않습니다.**

| 정의 | 값 |
| --- | --- |
| `ultimine+3` `ultimine+6` `ultimine+10` | `ftbultimine:max_blocks_modifier` |
| `break_speed+5%` `break_speed+15%` | `player.block_break_speed` |
| `ultimine_exhaustion-4` | `ftbultimine:exhaustion_modifier` |
| `reach+0.5` `reach+1` | `player.block_interaction_range` |
| `safe_fall+1` `fall_dmg-10%` | `safe_fall_distance` / `fall_damage_multiplier` |
| `oxygen+1` `burn-10%` | `oxygen_bonus` / `burning_time` |
| `sneak+5%` `step+0.25` `water_mining+25%` | `sneaking_speed` / `step_height` / `submerged_mining_speed` |

일괄 채굴 개수를 늘리는 것도, 블록 파괴 속도를 올리는 것도 **속도**지 복제가 아니므로 게이팅과 충돌하지 않습니다.

**`ftbultimine`의 수정자 넷 중 셋은 비용입니다.** `max_blocks_modifier`만 올리면 이득이고 `experience_modifier` `exhaustion_modifier` `cooldown_modifier`는 올리면 손해입니다. 계산식이 `max(0, 기준값 + 수정자)`인 덧셈이라 퍼센트로 적어서도 안 됩니다. 이 팩의 기준값은 개수 64, 경험치 소모 0, 허기 20, 대기 0입니다. 기준값이 0인 둘은 손댈 자리가 없으므로 허기만 씁니다.

경험치는 캔 블록에 따라 다릅니다. 심층암 광석 9, 일반 광석 7, 겉돌 0.25이며 그 밖의 블록은 오르지 않습니다. 흙을 파도 소용없습니다.

## 2. 전투

근접, 원거리, 마법을 한 탭에 두되 갈래를 강제하지 않습니다.

| 갈래 | 정의 |
| --- | --- |
| 근접 | `crit_chance+2%/+5%` `crit_damage+5%/+15%` `life_steal+2%` `armor_pierce+1` `sweeping+10%` |
| 원거리 | `draw_speed+10%` `arrow_damage+0.5` `arrow_velocity+10%` `projectile+1` |
| 마법 | `max_mana+10` `mana_regen+10%` `spell_power+5%` `spell_cooldown+10%` `spell_resist+10%` |
| 공통 | `dodge+2%` `armor+1` `absorption+4` |

마법 갈래는 **Iron's Spells 자체 속성만** 씁니다. 주문을 부여하는 `additional_attributes` 항목은 쓰지 않습니다.

경험치는 처치한 몹이 떨군 경험치에 최대 체력의 20분의 1을 더한 값입니다. 청크당 15마리로 제한하고 300초 뒤 초기화해 몹 농장을 막습니다.

## 3. 생활

`eat_food`가 경험치 원천이라 Spice of Life와 **같은 행동**을 씁니다. 새 요리 하나로 최대 체력도 늘고 스킬 포인트도 들어옵니다.

| 갈래 | 정의 |
| --- | --- |
| 몸 | `health+1/+2/+4` `healing+5%` `absorption+2` `overheal+5%` |
| 식탁 | `eating+10%` `harvest+0.5/+1` |
| 낚시 | `fishing_luck+0.5` `fishing_lure+0.5` `looting+0.5` |

음식 한 번에 25, 낚시 한 번에 40입니다. 작물 수확량은 Create 병목이 아니므로 `harvest` 증가는 허용합니다.

## 4. 탐험

| 갈래 | 정의 |
| --- | --- |
| 육상 | `speed+2%/+5%` `sprint+5%` `sprint_step+0.25` `jump+5%` |
| 수상 | `swim+10%` `water_move+10%` |
| 지형 | `snow+10%` `slip+10%` |
| 발견 | `luck+0.5/+2` `nametag+4` `reputation+5` |

경험치는 통계 증가에서 가져오되 **대상을 걸러냅니다.** 달리기 0.5, 걷기 0.2, 수영 0.5, 등반 1, 점프 1이며 그 밖의 통계는 세지 않습니다. 거르지 않으면 `play_time`까지 들어가 가만히 서 있어도 오릅니다.

---

## 파일 구조와 스키마

Puffish Skills는 데이터팩 JSON만 읽습니다. 스크립트 API가 없으므로 KubeJS는 데이터팩 경로로만 씁니다.

```text
kubejs/data/moonscenty/puffish_skills/
    config.json                카테고리 목록 선언 (없으면 아무것도 읽지 않는다)
    categories/<카테고리>/
        category.json          탭 제목, 아이콘, 배경, 해금 규칙
        definitions.json       노드 정의 (제목, 아이콘, 비용, 보상)
        skills.json            노드 배치 (정의 참조, x, y, root)
        connections.json       노드 연결선
        experience.json        경험치 원천과 성장 곡선 (선택)
```

**`config.json`은 반드시 있어야 합니다.** 모드는 `puffish_skills/` 아래에서 `config.json`으로 끝나는 파일을 찾은 뒤, 거기 적힌 `categories` 목록에 있는 것만 읽습니다. 폴더만 만들어 두면 오류 한 줄 없이 조용히 무시됩니다.

```json
{ "version": 3, "categories": ["mining", "combat", "living", "exploration"] }
```

**category.json**

| 키 | 값 |
| --- | --- |
| `title` `description` | 텍스트 |
| `icon` | `{"type":"item","data":{"item":"..."}}` — `item` `effect` `texture` |
| `background` | `{"texture":"...","position":"tile","width":16,"height":16}` — `none` `tile` `fill` `fill_height` |
| `unlocked_by_default` `starting_points` `exclusive_root` `spent_points_limit` `erase_on_death` | 해금과 제한 |

**definitions.json** — 정의 ID를 키로 하는 객체

`title` `description` `icon` `frame` `size` `rewards` `cost` `required_skills` `required_points` `required_spent_points` `required_exclusions` `required_mods`

`frame`은 `{"type":"advancement","data":{"frame":"task|goal|challenge"}}`입니다.

**skills.json** — 노드 ID를 키로 하는 객체. `definition` `x` `y` `root`

여러 노드가 같은 정의를 참조할 수 있습니다. 그물 트리는 이 재사용으로 만듭니다.

**connections.json**

```json
{ "normal": { "bidirectional": [["1","2"]], "unidirectional": [] },
  "exclusive": { "bidirectional": [], "unidirectional": [] } }
```

**보상 형식**

```json
{ "type": "puffish_skills:attribute",
  "data": { "attribute": "minecraft:generic.max_health", "value": 4, "operation": "addition" } }
```

`operation`은 `addition`(`add_value`, `add`), `multiply_base`(`add_multiplied_base`), `multiply_total`(`add_multiplied_total`)입니다. 보상 종류는 `puffish_skills:` 뒤에 `attribute` `command` `points` `scoreboard` `tag`가 옵니다.

**experience.json**

```json
{
  "level_limit": 59,
  "experience_per_level": { "type": "expression", "data": { "expression": "min(level ^ 2.6 + 300, 6000)" } },
  "sources": [ { "type": "puffish_skills:mine_block", "data": { } } ]
}
```

`experience_per_level`의 `type`은 `expression` 또는 `values`입니다. 표현식에서 `level` 변수와 `min`, `^` 같은 연산을 쓸 수 있습니다.

원천의 `data`는 다음과 같습니다. **`experience`는 문자열이거나 `{condition, expression}` 배열입니다.** 객체가 아닙니다.

```json
{
  "variables": {
    "ores": { "operations": [
      { "type": "get_mined_block_state" },
      { "type": "puffish_skills:test", "data": { "block": "#c:ores" } }
    ] }
  },
  "experience": [ { "condition": "ores", "expression": "7" } ]
}
```

`variables`는 이름 붙인 값입니다. 게터로 대상을 꺼내고 `puffish_skills:test`로 판정하면 참·거짓 변수가 됩니다. 게터는 원천마다 다릅니다.

| 원천 | 게터 |
| --- | --- |
| `mine_block` | `get_mined_block_state` `get_tool_item_stack` `get_player` |
| `kill_entity` | `get_killed_living_entity` `get_dropped_experience` `get_weapon_item_stack` `get_damage_source` |
| `eat_food` | `get_eaten_item_stack` `get_player` |
| `increase_stat` | `get_stat` `get_increase_amount` |

`test`의 데이터 키는 판정 대상에 따라 `block` `item` `entity` `stat` `nbt` 등이 옵니다. `kill_entity`는 `anti_farming`으로 `limit_per_chunk`와 `reset_after_seconds`를 지정할 수 있습니다.

**경험치 원천 종류**

`break_block` `mine_block` `craft_item` `smelt_item` `enchant_item` `kill_entity` `shared_kill_entity` `deal_damage` `take_damage` `eat_food` `fish_item` `heal` `increase_stat` `criterion`

## 노드 이름 규칙

**노드 제목은 그 노드가 건드리는 속성의 인게임 이름을 그대로 씁니다.** 플레이어가 스킬 창에서 본 이름을 F3 화면이나 아이템 툴팁에서 다시 만나야 같은 것인 줄 압니다. 임의로 줄이거나 새로 지으면 무엇이 오른 건지 확인할 방법이 없어집니다.

- 바닐라 속성은 `attribute.name.*`을 따릅니다. `max_health`는 최대 체력이 아니라 **최대 생명력**, `movement_speed`는 **속도**, `armor`는 **방어**, `step_height`는 **걸음 높이**입니다.
- 모드 속성은 그 모드 `ko_kr.json`의 속성 이름을 따릅니다. Iron's Spells는 `spell_power`가 **주문력**, `mana_regen`이 **마나 재생**, `spell_resist`가 **주문 저항**입니다.
- 한국어 번역이 없는 모드는 뜻이 통하는 한국어를 쓰되 **설명에 영문 표기를 함께 적습니다.** Apothic Attributes와 Artifacts가 여기 해당합니다.

**이름만으로 갈리지 않는 것은 설명에서 갈라 줍니다.** 서로 헷갈리는 짝이 실제로 여럿 있습니다.

| 헷갈리는 짝 | 무엇이 다른가 |
| --- | --- |
| 최대 흡수 · 흡혈 · 과회복 | 상한을 올리는 것, 체력을 채우는 것, 보호막을 쌓는 것 |
| 치명타 확률 · 치명타 피해 | 얼마나 자주 터지는가, 터졌을 때 얼마나 아픈가 |
| 최대 마나 · 마나 재생 | 그릇의 크기, 차오르는 속도 |
| 최대 생명력 · 받는 회복량 | 하트 칸 수, 들어오는 회복의 배수 |
| 수영 속도 · 수중 이동 효율 | 헤엄치는 속도, 물속에서 걸을 때 덜 느려지는 정도 |
| 걸음 높이 · 달릴 때 걸음 높이 | 항상 적용, 달리는 동안만 적용 |

**퍼센트로 적을지 숫자로 적을지는 기준값을 보고 정합니다.** 배수형 속성에 `addition`을 걸면 원시 숫자와 체감이 다릅니다.

| 속성 | 기준값 | `+0.5`의 뜻 |
| --- | --- | --- |
| `apothic_attributes:arrow_damage` | 1.0 | 화살 피해 +50% |
| `apothic_attributes:projectile_damage` | 1.0 | 투사체 피해 +50% |
| `apothic_attributes:crit_damage` | 1.5 | 치명타 배수 150% → 200% |
| `additional_attributes:*` | 0 | **절반의 확률로 +1** |

마지막 줄이 특히 중요합니다. Additional Attributes의 `harvest` `looting` `fishing_luck` `fishing_lure`는 정수로 쓰이는데, 소수점은 버려지지 않고 **확률로 처리됩니다.** `getIntValue`가 `(int)값`을 취한 뒤 나머지 소수만큼의 확률로 1을 더합니다. 그래서 `+0.5`는 죽은 노드가 아니라 반반 도박입니다. 설명에 이 사실을 적어 둡니다.

**FTB Ultimine의 네 수정자는 모두 덧셈이고 그중 셋은 비용입니다.**

| 수정자 | 뜻 | 이 팩의 기준값 |
| --- | --- | --- |
| `max_blocks_modifier` | 한 번에 캐는 블록 수 | 64 |
| `experience_modifier` | 블록당 경험치 **소모** | **0** |
| `exhaustion_modifier` | 블록당 허기 소모 | 20 |
| `cooldown_modifier` | 재사용 대기 틱 | **0** |

계산식은 `max(0, 기준값 + 수정자)`입니다. 배수가 아니므로 퍼센트로 적으면 안 되고, 소모 쪽은 **부호가 반대**입니다. 올리면 손해입니다.

## 참고한 설정

모드 jar에서 스키마를 추론하는 방식으로는 `experience` 항목의 형태를 알아내지 못했습니다. 같은 컴퓨터에 설치되어 있던 다른 모드팩의 실제 설정을 열어 보고 해결했습니다.

| 모드팩 | 경로 | 참고한 것 |
| --- | --- | --- |
| Craftoria | `kubejs/data/puffish_skills/puffish_skills/` | `variables`와 `experience` 형태, `mine_block` 광물 판정, `kill_entity` 농장 방지 |
| FTB Evolution | `datapacks/ftb/data/puffish_skills/puffish_skills/` | 육각 격자 좌표 규격, 정의 이름 규칙, `increase_stat` 통계 판정 |

앞으로 이 모드의 설정을 다룰 때는 이 두 곳을 먼저 확인하는 편이 빠릅니다.

## 검증 현황

- 인게임에서 스킬 창이 열리고 네 탭이 모두 표시되는 것을 확인했습니다.
- 작성한 정의의 보상 속성을 AttributeFix가 뽑아 둔 등록 속성 361개와 대조해 미등록 참조가 없음을 확인했습니다.
- 고립된 노드, 좌표 충돌, 정의 참조 누락, 쓰이지 않는 정의가 없음을 확인했습니다.
- 채굴 탭에서 찍으면 손해이던 노드 아홉 개를 블록 파괴 속도와 허기 절감으로 갈아끼웠습니다.
- `spent_points_limit: 0`이 네 탭 모두에 들어가 있어 경험치를 아무리 쌓아도 포인트를 한 점도 쓸 수 없던 것을 확인하고 키를 지웠습니다.
- 노드 63개의 제목을 인게임 속성 이름에 맞추고 설명을 모두 채웠습니다. 보상으로 걸린 속성의 기준값과 연산 방향을 모드 jar에서 하나씩 확인했습니다.
- `ftbultimine`의 네 수정자가 배수가 아니라 덧셈이고, 그중 셋이 비용이라는 것을 확인했습니다.

아직 확인하지 않은 것은 다음과 같습니다.

| 항목 | 확인할 것 |
| --- | --- |
| 경험치 곡선 | 네 탭이 비슷한 속도로 오르는지. 특히 탐험은 통계 증가 빈도를 몰라 추정으로 잡았습니다. |
| 광물 태그 | `#c:ores`와 `#c:ores_in_ground/deepslate`가 이 모드팩의 광석을 모두 포함하는지. |
| 최대치 합계 | 모든 노드를 찍었을 때 능력치 총합이 과한지. 생활 탭만으로 하트가 여러 개 늘어납니다. |

## 남은 작업

- 인게임 수치 검증과 곡선 조정
- 꿀팁과 노하우 챕터에 스킬 트리 안내 항목 추가
- 시대 진행과 연동할지 결정 — `unlocked_by_default: false`와 `CommandReward`로 탭을 잠글 수 있습니다
- 퀘스트 보상으로 포인트를 주는 방안 검토 — `puffish_skills:points` 보상을 씁니다
