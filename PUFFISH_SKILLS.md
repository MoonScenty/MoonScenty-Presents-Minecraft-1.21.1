# 스킬 트리 구상

이 문서는 MoonScenty Presents Minecraft 1.21.1의 Puffish Skills 스킬 트리 설계와 구현 기준을 관리합니다. 실제 데이터는 `kubejs/data/moonscenty/puffish_skills/categories/`에 데이터팩 형식으로 작성합니다.

## 구현 현황

- 대상 모드는 Puffish Skills `0.18.3-1.21-neoforge`입니다.
- 카테고리 4개에 노드를 60개씩, 모두 240개 작성했으며 인게임 검증이 남아 있습니다.
- 노드는 작은 증가량을 여러 번 쌓는 방식입니다. 정의를 재사용해 같은 정의를 여러 노드에 붙입니다.
- 배치는 동심원 다섯 겹을 방사선과 원주선으로 이은 거미줄입니다. 한 노드로 가는 길이 여러 개입니다.
- KubeJS 스크립트는 사용하지 않습니다. `kubejs/data/`를 데이터팩 경로로만 쓰고 내용은 순수 JSON입니다.
- 네임스페이스는 `moonscenty`입니다.
- 게임 내 기본 언어와 관계없이 같은 문구가 표시되도록 JSON에 한글을 직접 적습니다.

## 설계 원칙

- 탭은 시각적 분류가 아니라 **독립된 진행 축**입니다. 카테고리마다 경험치 원천과 포인트 풀이 따로 있습니다.
- 그러므로 탭은 모드가 아니라 **행동**으로 나눕니다. 검을 휘두른 사람은 전투 포인트만, 요리한 사람은 생활 포인트만 쌓입니다.
- 루트를 제한하지 않습니다. `exclusive_root`는 모든 탭에서 `false`이며 갈래를 자유롭게 섞을 수 있습니다.
- `spent_points_limit`도 걸지 않습니다. 페이싱은 오직 경험치 곡선으로 조절합니다.
- 포인트는 노드 수와 같게 줍니다. 끝까지 하면 한 탭을 전부 채울 수 있습니다.
- 노드 하나하나는 작게 잡습니다. 어느 노드도 반드시 찍어야 하는 것이 되지 않게 합니다.
- **기술 축은 트리에 넣지 않습니다.** Create를 Expert로 재구성한 이유가 병목 설계인데 스킬로 우회하면 의미가 없어집니다.
- **자원 산출량을 늘리지 않습니다.** 광석에서 부스러기, 용탕으로 이어지는 사슬은 석기 시대의 핵심 병목입니다. 속도와 범위만 다룹니다.
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

## 탭 구성

| 탭 | 카테고리 ID | 경험치 원천 | 노드 | 정의 | 포인트 |
| --- | --- | --- | --- | --- | --- |
| 채굴 | `moonscenty:mining` | `mine_block` | 60 | 14 | 60 |
| 전투 | `moonscenty:combat` | `kill_entity` `deal_damage` `take_damage` | 60 | 18 | 60 |
| 생활 | `moonscenty:living` | `eat_food` `fish_item` `heal` | 60 | 14 | 60 |
| 탐험 | `moonscenty:exploration` | **없음 (미결정)** | 60 | 15 | 1 |

네 탭 모두 `unlocked_by_default: true`, `starting_points: 1`입니다. 탐험을 뺀 세 탭은 `level_limit: 59`라 시작 포인트를 더해 60개가 되어 노드 수와 일치합니다.

각 탭의 연결선은 118개입니다. 고리 안에서 옆으로도 이어져 있어 막다른 길이 없습니다.

---

## 1. 채굴

동굴에서 살아남고 더 넓게 캐는 탭입니다. **산출량은 다루지 않습니다.**

```text
                   [일괄 채굴 경험치]
                          │
        [대기 단축] ─ [광맥째로] ─ [허기 절감]
                          │
                     [한 줌 더]
                          │
[화상] ─ [착지] ─ [헛디뎌도] ─ ★곡괭이를 들다 ─ [팔] ─ [웅크림] ─ [물속]
                     │                                  │
                  [숨 참기]                           [턱 넘기]
```

| 갈래 | 노드 | 속성 |
| --- | --- | --- |
| 뿌리 | 곡괭이를 들다 | `player.block_interaction_range` +0.5 |
| Ultimine | 한 줌 더 / 광맥째로 | `ftbultimine:max_blocks_modifier` +8 / +16 |
| Ultimine | 쉴 틈 없이 / 지치지 않는 팔 | `cooldown_modifier` / `exhaustion_modifier` −0.25 |
| Ultimine | 한 번에 쓸어담기 | `ftbultimine:experience_modifier` +0.5 |
| 동굴 생존 | 발을 헛디뎌도 / 굴러서 착지 | `safe_fall_distance` +2 / `fall_damage_multiplier` −0.15 |
| 동굴 생존 | 숨이 길다 | `oxygen_bonus` +3, `additional_attributes:respiration` +1 |
| 동굴 생존 | 불에 그을려도 | `burning_time` −0.3 |
| 작업 편의 | 팔이 길어졌다 / 웅크려도 빠르게 | `block_interaction_range` +1 / `sneaking_speed` +0.15 |
| 작업 편의 | 턱을 넘어 / 물속에서도 | `step_height` +0.5 / `submerged_mining_speed` +0.5 |

`ftbultimine:max_blocks_modifier`가 이 탭의 간판입니다. 한 번에 캐는 개수를 늘리는 것은 **속도**지 복제가 아니므로 게이팅과 충돌하지 않습니다.

## 2. 전투

근접, 원거리, 마법을 한 탭에 두되 갈래를 강제하지 않습니다. 셋 다 찍어도 되고 하나만 파도 됩니다.

```text
              [방어력]
                 │
              [회피]
                 │
[흡혈]─[치명 피해]─[치명타]─ ★싸울 준비 ─[시위]─[화살]─[투사체]
        │      │                            │
     [휩쓸기] [관통]                      [탄속]
                 │
              [마나]
                 │
       [위력]─[회복]─[대기 단축]
                 │
              [저항]
```

| 갈래 | 노드 | 속성 |
| --- | --- | --- |
| 공통 | 싸울 준비 / 스치듯 피하기 / 한 겹 더 | `max_absorption` +2 / `dodge_chance` +0.03 / `armor` +1 |
| 근접 | 급소를 노려 / 깊게 찌르기 | `crit_chance` +0.05 / `crit_damage` +0.15 |
| 근접 | 피를 마시는 칼 / 휘둘러 베기 / 갑옷을 뚫고 | `life_steal` +0.05 / `sweeping_damage_ratio` +0.1 / `armor_pierce` +1 |
| 원거리 | 빠른 시위 / 묵직한 화살 | `draw_speed` +0.15 / `arrow_damage` +0.5 |
| 원거리 | 곧게 날아가 / 던지는 것마다 | `arrow_velocity` +0.2 / `projectile_damage` +0.5 |
| 마법 | 마나의 그릇 / 차오르는 마나 | `irons_spellbooks:max_mana` +20 / `mana_regen` +0.2 |
| 마법 | 주문에 힘을 / 쉼 없는 영창 | `spell_power` +0.1 / `cooldown_reduction`·`cast_time_reduction` +0.05 |
| 마법 | 마법을 흘려보내다 | `irons_spellbooks:spell_resist` +0.1 |

마법 갈래는 **Iron's Spells 자체 속성만** 씁니다. 주문을 부여하는 `additional_attributes` 항목은 쓰지 않습니다.

## 3. 생활

`eat_food`가 경험치 원천이라 Spice of Life와 **같은 행동**을 씁니다. 새 요리 하나로 최대 체력도 늘고 스킬 포인트도 들어옵니다.

| 갈래 | 노드 | 속성 |
| --- | --- | --- |
| 뿌리 | 잘 먹고 잘 살기 | `max_health` +2 |
| 몸 | 튼튼한 몸 / 빨리 낫는다 / 넘치도록 | `max_health` +4 / `healing_received` +0.15 / `overheal` +0.2 |
| 식탁 | 한입에 꿀꺽 | `eating_speed`·`drinking_speed` +0.25 |
| 식탁 | 한 포기 더 / 든든한 배 | `additional_attributes:harvest` +1 / `max_absorption` +4 |
| 낚시 | 손맛을 알다 / 금방 물어요 / 건져 올린 보물 | `fishing_luck` / `fishing_lure` / `looting` +1 |

작물 수확량은 Create 병목이 아니므로 `harvest` 증가는 허용합니다.

## 4. 탐험

| 갈래 | 노드 | 속성 |
| --- | --- | --- |
| 뿌리 | 길을 나서다 | `movement_speed` +0.01 |
| 육상 | 달리기 시작 / 멈추지 않고 | `sprinting_speed` +0.1 / `sprinting_step_height` +0.5 |
| 육상 | 어디를 밟든 | `movement_speed_on_snow` +0.2, `slip_resistance` +0.3 |
| 수상 | 물살을 가르며 / 물이 밀지 못한다 | `neoforge:swim_speed` +0.2 / `water_movement_efficiency` +0.3 |
| 발견 | 운이 따른다 / 높이 뛰어 | `luck` +1 / `jump_strength` +0.1 |
| 발견 | 멀리 내다보기 / 낯이 익은 얼굴 | `nametag_distance` +16 / `villager_reputation` +20 |

`generic.luck`은 상자 전리품 품질에만 걸립니다. 광석 드랍은 행운 인챈트 소관이라 게이팅에 영향이 없습니다.

---

## 파일 구조와 스키마

Puffish Skills는 데이터팩 JSON만 읽습니다. 스크립트 API가 없으므로 KubeJS는 데이터팩 경로로만 씁니다.

```text
kubejs/data/moonscenty/puffish_skills/categories/<카테고리>/
    category.json      탭 제목, 아이콘, 배경, 해금 규칙
    definitions.json   노드 정의 (제목, 아이콘, 비용, 보상)
    skills.json        노드 배치 (정의 참조, x, y, root)
    connections.json   노드 연결선
    experience.json    경험치 원천과 성장 곡선
```

아래 스키마는 모드 jar의 파서(`ConfigReader`, `GeneralConfig`, `SkillDefinitionConfig` 등)에서 직접 확인한 것입니다. 버전이 올라가면 다시 확인해야 합니다.

**category.json**

| 키 | 값 |
| --- | --- |
| `title` `description` `extra_description` | 텍스트 |
| `icon` | `{"type":"item","data":{"item":"..."}}` — `item` `effect` `texture` |
| `background` | `{"texture":"...","position":"tile","width":16,"height":16}` — `none` `tile` `fill` |
| `unlocked_by_default` `starting_points` `exclusive_root` `spent_points_limit` `erase_on_death` | 해금과 제한 |

**definitions.json** — 정의 ID를 키로 하는 객체

`title` `description` `extra_description` `icon` `frame` `size` `rewards` `cost` `required_skills` `required_points` `required_spent_points` `required_exclusions` `required_mods` `metadata`

`frame`은 `{"type":"advancement","data":{"frame":"task|goal|challenge"}}`입니다.

**skills.json** — 노드 ID를 키로 하는 객체. `definition` `x` `y` `root`

**connections.json**

```json
{
  "normal":    { "bidirectional": [["a","b"]], "unidirectional": [] },
  "exclusive": { "bidirectional": [],          "unidirectional": [] }
}
```

**experience.json**

```json
{
  "enabled": true,
  "level_limit": 30,
  "experience_per_level": { "type": "expression", "data": { "expression": "600 + 120 * level" } },
  "sources": [
    { "type": "puffish_skills:mine_block",
      "data": { "calculation": { "operations": [], "fallback": 1 } } }
  ],
  "reset_on_death": false
}
```

`experience_per_level`의 `type`은 `expression` 또는 `values`입니다.

**보상 형식**

```json
{ "type": "puffish_skills:attribute",
  "data": { "attribute": "minecraft:generic.max_health", "value": 4, "operation": "add_value" } }
```

`operation`은 `add_value`(`addition`, `add`), `add_multiplied_base`(`multiply_base`), `add_multiplied_total`(`multiply_total`)입니다.

보상 종류는 `puffish_skills:` 뒤에 `attribute` `command` `points` `scoreboard` `tag`가 옵니다.

**경험치 원천 종류**

`break_block` `mine_block` `craft_item` `smelt_item` `enchant_item` `kill_entity` `shared_kill_entity` `deal_damage` `take_damage` `eat_food` `fish_item` `heal` `increase_stat` `criterion`

## 탐험 탭의 경험치 원천 (미결정)

탐험만 경험치 원천이 비어 있습니다. `enabled: false`로 두었고 포인트는 외부에서만 들어옵니다. 쓸 수 있는 원천이 둘 다 막혔기 때문입니다.

| 후보 | 막힌 이유 |
| --- | --- |
| `criterion` | `criterion` 필드가 필수인데 이 모드팩은 No Advancements로 바닐라 발전 과제를 껐습니다. |
| `increase_stat` | 대상 통계를 거르지 않으면 `play_time`까지 세어 가만히 서 있어도 초당 20씩 오릅니다. |

`increase_stat`을 거르려면 `calculation`의 `operations`에 `StatCondition`을 넣어야 합니다. 이 연산은 데이터로 `stat`과 `test`를 받는 것까지는 확인했으나, 연산 등록 ID가 클래스 상수에 남아 있지 않아 확정하지 못했습니다. 잘못 적으면 카테고리 전체가 로드되지 않습니다.

당장 쓸 수 있는 우회는 `PointsReward`입니다. 다른 탭의 큰 노드나 FTB Quests 보상에서 탐험 포인트를 직접 지급할 수 있습니다.

```json
{ "type": "puffish_skills:points",
  "data": { "category": "moonscenty:exploration", "points": 1 } }
```

퀘스트로 포인트를 주는 방식은 오히려 이 모드팩과 잘 맞습니다. 걸은 거리를 쌓는 대신 **탐험 퀘스트를 깨면 포인트가 들어오는** 구조가 되기 때문입니다. 다만 해당 퀘스트가 아직 없어서 지금은 시작 포인트 1개만 있습니다.

## 검증 현황

작성한 51개 노드를 AttributeFix가 뽑아 둔 실제 등록 속성 361개와 대조했습니다.

- 미등록 속성 참조: 0건
- 존재하지 않는 노드를 가리키는 연결선: 0건
- 정의 참조 누락: 0건
- 좌표 충돌: 0건
- 루트 노드 누락: 0건

**다만 인게임 로드는 아직 확인하지 않았습니다.** 아래는 실제로 켜 봐야 확정됩니다.

| 항목 | 확인할 것 |
| --- | --- |
| 경험치 곡선 | `mine_block`이 흙과 돌에도 붙어 채굴 탭이 지나치게 빨리 오를 수 있습니다. |
| `ftbultimine` 수치 | `cooldown_modifier`와 `exhaustion_modifier`의 기준값을 몰라 `add_value` −0.25로 잡았습니다. 배수형이면 연산을 바꿔야 합니다. |
| `criterion` 원천 | 발전 과제 ID를 지정하지 않은 상태라 동작 방식 확인이 필요합니다. |
| 노드 간격 | 좌표 간격을 24로 잡았습니다. 화면에서 겹치거나 너무 벌어지면 조정합니다. |
| 배경 텍스처 | `position: tile`로 깔았을 때 보기 좋은지 확인합니다. |

## 남은 작업

- 인게임 로드 확인 및 오류 로그 정리
- 경험치 곡선 실측 조정 — 특히 채굴 탭
- 광물에만 가중치를 주는 `calculation` 작성 (`operations`에 조건 연산 추가)
- 노드 배치를 웹 편집기로 다듬고 좌표 반영
- 꿀팁과 노하우 챕터에 스킬 트리 안내 항목 추가
- 시대 진행과 연동할지 결정 — `unlocked_by_default: false`와 `CommandReward`로 탭을 잠글 수 있습니다
