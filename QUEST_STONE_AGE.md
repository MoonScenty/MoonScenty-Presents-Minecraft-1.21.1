# 석기 시대 설계

Create 기술 시대의 첫 장입니다. 바닐라 튜토리얼의 철기 구간을 마친 플레이어가 진입합니다.

## 진행 방식

안산암과 아연을 얻고 야금 기계와 거푸집, 열원을 만드는 법을 익히면서 최종 목표인 **안산암 케이싱**에 도달하도록 합니다.

## 구현 현황

- **레시피 구현 완료.** `kubejs/server_scripts/`와 `kubejs/startup_scripts/`의 다섯 파일에 들어 있습니다.
- **퀘스트 챕터 작성 완료.** 26개이며 제목, 부제, 설명을 모두 넣었습니다. 인게임 검증이 남아 있습니다.
- 게임 내 기본 언어와 관계없이 같은 문구가 표시되도록 `en_us` 언어 파일에 한글로 작성합니다.
- 설명은 핵심만 세 문장 이내로 적고 문단 사이를 빈 줄로 띄웁니다. 길어지는 것은 선택 퀘스트로 뺍니다.

## 설계 원칙

- 이 시대의 목표는 **안산암 합금을 손으로 만들지 못하게 하는 것**입니다. 갈고 녹이고 섞고 부어야 나오도록 공정을 강제합니다.
- 동력은 **손 크랭크와 손 톱니바퀴까지만** 다룹니다. 맷돌이 유일한 가공 기계이고 나머지는 열과 손으로 처리합니다.
- 진행을 막는 것은 퀘스트가 아니라 레시피입니다. 퀘스트는 순서를 알려주는 안내 장치입니다.
- 다음 시대에 들어가면 이전 시대의 재료는 쉬워져도 됩니다.

## 주요 자원

돌, 구리, 철, 아연

아연이 이 시대의 실질 병목입니다. 설비를 세우는 데 34개, 그 뒤로는 안산암 합금 하나당 하나씩 계속 나갑니다.

---

## 레시피 명세

### 승급 철 블록 (KubeJS 신규)

Create의 산업용 철 블록은 석재 절단으로 **철 주괴 하나에서 두 개**가 나옵니다. 야금 설비를 그것으로 지으면 전체가 철 열일곱 개로 끝나 무게가 없습니다. 아연을 한 겹 얹어 이 시대의 필수 자원과 묶습니다.

| 항목 | 값 |
| --- | --- |
| ID | `kubejs:manufactured_iron_block` |
| 이름 | Block of Manufactured Iron |
| 제작 | `create:item_application` — `create:industrial_iron_block`에 `#c:ingots/zinc` 우클릭 |

### 동력

| 대상 | 제거 | 추가 |
| --- | --- | --- |
| 손 크랭크 | `create:crafting/kinetics/hand_crank` | shaped — `#minecraft:planks` 3, `minecraft:andesite` 1 |
| 손 톱니바퀴 | `createhandcogwheel:hand_cogwheel` | shapeless — `create:hand_crank`, `minecraft:andesite`, `#minecraft:planks` |

원본은 둘 다 안산암 합금을 요구합니다. 합금이 이 시대의 목표이므로 순환이 생겨 안산암 원석으로 내렸습니다.

### 맷돌

| 대상 | 제거 | 추가 |
| --- | --- | --- |
| 맷돌 | `create:crafting/kinetics/millstone` | shaped |

```
LLL     L = #c:stripped_logs
SCS     S = #c:stones
SSS     C = #c:cobblestones
```

원본은 톱니바퀴와 안산암 케이싱을 요구합니다. 케이싱이 이 시대의 결승선이라 맷돌이 시대의 끝에 놓이게 되므로 나무와 돌만으로 내렸습니다.

### 야금 설비

여섯 종 모두 원본은 안산암 합금이나 강화 판금을 요구합니다. 승급 철 블록으로 바꿔 합금 이전에 지을 수 있게 합니다. **블록 34개, 즉 철 17개와 아연 34개**입니다.

| 기계 | 제거할 레시피 | 배치 |
| --- | --- | --- |
| 내화 모르타르 | (제거 없음, 수동 제작법 추가) | shapeless — `#c:sands` 4, `minecraft:water_bucket` 1, `minecraft:clay_ball` 4 |
| Foundry Basin | `createmetallurgy:crafting/content/foundry_basin` | `M M` / `MRM` / `MMM` |
| Foundry Lid | `createmetallurgy:crafting/content/foundry_lid` | `MMM` / `M M` |
| Casting Basin | `createmetallurgy:crafting/content/casting_basin` | `M M` / `M M` / ` M ` |
| Casting Table | `createmetallurgy:crafting/content/casting_table` | `MMM` / `M M` / `M M` |
| Sturdy Whisk | `createmetallurgy:crafting/content/sturdy_whisk` | ` A ` / `MAM` / `MMM` |
| Foundry Mixer | `createmetallurgy:crafting/content/foundry_mixer` | `PAP` / `CLC` / ` W ` |

| 기호 | 재료 | ID |
| --- | --- | --- |
| `M` | 승급 철 블록 | `kubejs:manufactured_iron_block` |
| `R` | 내화 모르타르 | `createmetallurgy:refractory_mortar` |
| `A` | 안산암 | `minecraft:andesite` |
| `P` | 판자 | `#minecraft:planks` |
| `C` | 구리 주괴 | `#c:ingots/copper` |
| `L` | 껍질 벗긴 원목 | `#c:stripped_logs` |
| `W` | 튼튼한 거품기 | `createmetallurgy:sturdy_whisk` |

내화 모르타르의 원본은 혼합기(모래 2 + 점토 1 + 물 100mb)를 씁니다. 혼합기는 안산암 케이싱을 먹으므로 이 시대에 없습니다. 재료를 더 들이는 대신 손으로 만들 수 있게 했습니다.

믹서만 승급 철을 쓰지 않습니다. 나무와 구리로 짜서 다른 설비와 결을 나눕니다.

### 열원

| 대상 | 제거 | 추가 |
| --- | --- | --- |
| 기초 버너 | `createlowheated:basic_burner` | shaped — `M M` / ` M ` |

원본은 안산암 합금 3개입니다. 용해로의 열원인데 합금이 용해로에서 나오므로 순환이 생깁니다.

### 거푸집 (KubeJS 신규)

두 등급입니다. 흑연은 재사용되고 내화 모르타르는 **주조 한 번에 사라집니다.**

| 항목 | 값 |
| --- | --- |
| ID | `kubejs:refractory_mortar_{blank,ingot,nugget,plate,rod,gear}_mold` |
| 빈 거푸집 제작 | shaped — `createmetallurgy:refractory_mortar_ball` 8개를 테두리에, **1개 출력** |
| 형태 변환 | 석재 절단, 태그 `#kubejs:refractory_mortar_molds` |

모르타르 볼은 자체 제작법이 없습니다. 모르타르 블록을 분해해야만 나오므로 **거푸집 1개는 블록 2개, 즉 모래 8개와 점토 8개**입니다. 거푸집이 일회용이므로 이것이 그대로 주조의 유지비가 됩니다.

Metallurgy의 기본 주조 레시피는 거푸집을 태그가 아니라 **아이템으로 직접 지정**합니다. 태그에 넣는 것만으로는 호환되지 않으므로, `casting_in_table`을 훑어 거푸집만 내화로 바꾸고 `mold_consumed`를 붙인 판본을 따로 만듭니다. 활성 금속 7종 × 거푸집 5종으로 35건이 생깁니다.

### 분쇄와 용해

| 공정 | 입력 | 출력 |
| --- | --- | --- |
| 밀링 | 안산암 | `kubejs:andesite_dust` |
| 밀링 | `#c:raw_materials/zinc` | `createmetallurgy:zinc_dust` |
| 용해 (lowheated, 2.0s) | 안산암 가루 | `kubejs:molten_andesite` 45mb |
| 용해 (lowheated, 2.0s) | 아연 가루 | `createmetallurgy:molten_zinc` 45mb |
| 합금 (lowheated, 2.0s) | 용융 아연 45 + 용융 안산암 45 | `kubejs:molten_andesite_alloy` 90mb |
| 주조 (3.0s) | 용융 합금 90mb + 잉곳 거푸집 | `create:andesite_alloy` 1 |

`create:milling/andesite`의 원본은 조약돌을 뱉으므로 제거하고 가루로 바꿉니다.

**안산암 하나와 원광 아연 하나가 합금 하나**가 됩니다. Create 기본이 안산암 1에 아연 너깃 1이므로 아연을 아홉 배 씁니다.

### 우회로 차단

팩 277개 jar를 전수 조사해 안산암 합금을 만드는 레시피 여섯 개를 찾았습니다. 그중 넷을 지웁니다.

| 레시피 | 조치 | 비용 |
| --- | --- | --- |
| `create:crafting/materials/andesite_alloy` | 제거 | 안산암 2 + 철 너깃 2 |
| `create:crafting/materials/andesite_alloy_from_zinc` | 제거 | 안산암 2 + 아연 너깃 2 |
| `createmetallurgy:casting_in_basin/andesite_alloy_from_iron` | 제거 | 용융 철 90mb + 안산암 1 → 합금 블록 |
| `createmetallurgy:casting_in_basin/andesite_alloy_from_zinc` | 제거 | 용융 아연 90mb + 안산암 1 → 합금 블록 |
| `create:mixing/andesite_alloy` | **유지** | 혼합기 필요, 다음 시대 |
| `create:mixing/andesite_alloy_from_zinc` | **유지** | 같음 |

주조 두 건이 특히 위험합니다. 결과가 합금 블록이고 `andesite_alloy_from_block`이 블록 하나를 합금 아홉 개로 되돌리므로, 금속 주괴 하나와 안산암 하나로 합금 아홉 개가 나옵니다.

혼합기 둘은 남깁니다. 혼합기가 안산암 케이싱을 요구해 이 시대에는 닿지 않으며, 다음 시대에 합금이 싸지는 것은 의도한 바입니다.

---

## 퀘스트 구성

챕터 `stone_age`에 퀘스트 26개를 아홉 묶음으로 배치했습니다.

```text
[튜토리얼: 철기 구간]
   │
   └─ 원광 아연 ─┬─ 아연 주괴 ─ 산업용 철 블록 ─ 승급 철 블록 ─┬─ 내화 모르타르 ─┬─ 용해로 대야 ─ 뚜껑
                 │                                              │                 │
                 └─ 안산암 ─ 손 크랭크 ─ 손 톱니바퀴 ─ 맷돌 ─┐  │                 ├─ 기초 버너
                                                              │  │                 ├─ 주조 대야
                                             ┌────────────────┘  │                 ├─ 주조 탁자
                                             ├─ 안산암 가루      │                 └─ 거품기 ─ 믹서 ─ (선택) 뚜껑 창
                                             └─ 아연 가루        │
                                                                 └─ 모르타르 볼 ─ 빈 거푸집 ─ 잉곳 거푸집
                                                                                                  │
                                                                       안산암 합금 ───────────────┘
                                                                            │
                                                                     안산암 케이싱
```

합금 퀘스트에 기초 버너, 믹서, 잉곳 거푸집, 안산암 가루, 아연 가루 다섯 갈래가 모입니다. 설비를 다 세우지 않으면 닿지 않습니다.

| 장 | 내용 | 개수 |
| --- | --- | --- |
| 1 | 자원 — 원광 아연, 아연 주괴, 안산암 | 3 |
| 2 | 손 동력 — 손 크랭크, 손 톱니바퀴, 맷돌 | 3 |
| 3 | 승급 철 — 산업용 철 블록, 승급 철 블록 | 2 |
| 4 | 용해로 — 내화 모르타르, 대야, 뚜껑, 기초 버너 | 4 |
| 5 | 주조 설비 — 주조 대야, 주조 탁자, 거품기, 믹서, (선택) 뚜껑 창 | 5 |
| 6 | 거푸집 — 모르타르 볼, 빈 거푸집, 잉곳 거푸집, 소모 안내 | 4 |
| 7 | 분쇄 — 안산암 가루, 아연 가루 | 2 |
| 8 | 합금 — 안산암 합금, 지름길 없음 안내 | 2 |
| 9 | 결승선 — 안산암 케이싱 | 1 |

### 선택 퀘스트

**뚜껑에 창을 냅니다** — `foundry_lid`에는 `window` 상태가 따로 있고, 렌치로 창을 내지 않으면 믹서가 아래 쇳물을 섞지 않습니다. 믹서 퀘스트 본문에 넣으면 세 문장을 넘겨 떼어냈습니다.

설명에 적은 조작은 모드의 Ponder 문구에서 확인한 것만 씁니다. 용해로 대야가 같은 종류 아홉 개까지 담는 것, 뚜껑이 닫혀야 공정이 시작되는 것, 주조 탁자의 잠금 칸도 같은 출처입니다.

## 검토가 필요한 부분

- **점토 소모.** 거푸집이 일회용이라 합금 하나당 모래 8개와 점토 8개가 나갑니다. 점토는 초반에 물가에서 손으로 캐는 자원이라 실질 병목이 여기로 옮겨갈 수 있습니다. 케이싱 하나에 합금이 몇 개 필요한지에 따라 체감이 달라지므로 실제 플레이로 확인합니다.
- **아연 획득 경로가 셋입니다.** 원광 제련, 광석 블록 직접 제련, 분쇄 원광 제련 모두 화로면 됩니다. 막을 이유는 없어 보이지만 후반에 분쇄기가 생기면 수율이 올라갑니다.
- 승급 철 블록이 아연 34개를 요구합니다. 설비를 세우는 초반 부담이 적절한지 측정합니다.
- 흑연 거푸집은 이 시대에서 얻을 수 없습니다. 재사용 거푸집을 어느 시대에 열지 정해야 합니다.

## 참고 자료

- `kubejs/server_scripts/stone_age.js` — 기계, 동력, 분쇄, 용해, 합금, 우회로 차단
- `kubejs/server_scripts/molds.js` — 거푸집 체계와 기본 주조 레시피 미러링
- `kubejs/startup_scripts/blocks.js` — 승급 철 블록
- `kubejs/startup_scripts/fluids.js` — 용융 안산암, 용융 안산암 합금
- `kubejs/startup_scripts/items.js` — 안산암 가루, 거푸집 6종
- [README.md](README.md) — 시대 구분과 동력 계보
