# 황동 시대 설계

Create 기술 시대의 세 번째 장입니다. 안산암 합금 시대를 황동 케이싱으로 마친 플레이어가 진입합니다.

## 진행 방식

황동 케이싱으로 Vintage의 가공 기계들을 세우고, 스프링을 정밀 가공해 원심분리기까지 사슬을 잇습니다. 최종 목표는 **강철 케이싱**입니다.

```
유령 들린 황동 판 → 티어 부품을 황동으로 승급
벨트 그라인더 → 연마 → 스프링 코일링 기계 → 철 스프링
철 스프링 → 진공실 → 정밀 철 스프링
정밀 철 스프링 → 진동대 → 진동 거품기 → 원심분리기
원심분리기 → 정제 코크스 → 합금 → 강철 → 강철 케이싱
```

곁가지로 커빙 프레스가 AE2 인스크라이버를 대신하고, 테슬라 코일이 차저를 대신합니다. AE Generator도 이 시대에 열립니다.

## 구현 현황

- **레시피 구현 완료.** `kubejs/server_scripts/brass_age.js`에 있습니다. 제거 26건, 추가 37건에 원심분리 대량 복사가 더해집니다.
- **퀘스트 챕터 작성 완료.** `config/ftbquests/quests/chapters/brass_age.snbt`에 69개이며 본선 18개, 선택 51개입니다. 제목·부제·설명을 모두 넣었습니다.
- 신규 아이템 다섯은 `kubejs/startup_scripts/items.js`, 강철 케이싱은 `blocks.js`에 등록했습니다.
- 안산암 시대의 임시 트윅이던 `kubejs/server_scripts/ae_generator.js`는 지웠습니다.
- 문서의 레시피 ID 31개와 아이템 ID 54개는 전부 팩에서 실재를 확인했습니다.
- 티어 부품 ID는 `kubejs/startup_scripts/tiers.js`에 등록된 `brass` 티어에서 나옵니다.

**KubeJS 서버 스크립트는 전역 스코프를 공유합니다.** 다른 파일과 같은 이름으로 `const`를 선언하면 그 파일이 통째로 로드되지 않습니다. 시대 스크립트를 더할 때는 상수 이름을 겹치지 않게 두십시오.

## 설계 원칙

- 동력 부품을 **황동 티어로 승급**합니다. 안산암 부품에 유령 들린 황동 판을 얹는 방식이라 이전 시대의 생산 설비가 그대로 재료 공급원이 됩니다.
- Vintage 기계들은 **한 줄로 엮습니다.** 각 기계가 다음 기계의 재료를 만들며, 중간에 KubeJS 신규 아이템 넷을 끼워 순서를 강제합니다.
- 결승선은 **강철 케이싱**이며 관문은 정제 코크스 하나로 모읍니다.
- AE2는 이 시대에 **문만 엽니다.** 인스크라이버와 차저를 Create 기계로 옮겨 두고, 저장망 본격 운용은 산업 시대로 넘깁니다.

## 주요 자원

황동, 철 스프링, 강철

---

## 레시피 명세

### 동력 부품 티어

안산암 부품에 유령 들린 황동 판 하나를 더하면 황동 부품이 됩니다. 전부 shapeless입니다.

| 결과 | 재료 |
| --- | --- |
| `createtiers:shaft_brass` | `createtiers:shaft_andesite_alloy` + `kubejs:haunted_brass_sheet` |
| `createtiers:cogwheel_brass` | `createtiers:cogwheel_andesite_alloy` + `kubejs:haunted_brass_sheet` |
| `createtiers:large_cogwheel_brass` | `createtiers:large_cogwheel_andesite_alloy` + `kubejs:haunted_brass_sheet` |
| `createtiers:gearbox_brass` | `createtiers:gearbox_andesite_alloy` + `kubejs:haunted_brass_sheet` |
| `createtiers:vertical_gearbox_brass` | `createtiers:vertical_gearbox_andesite_alloy` + `kubejs:haunted_brass_sheet` |

기어박스 두 종은 안산암 시대와 같이 서로 뒤집는 shapeless를 함께 둡니다.

```
gearbox_brass          ← vertical_gearbox_brass
vertical_gearbox_brass ← gearbox_brass
```

황동 티어는 64 RPM / 2048 SU입니다. 안산암의 두 배입니다.

**동력은 화로 엔진 그대로 씁니다.** 옆에 붙인 구리 블록을 떼면 32 RPM / 1024 SU에서 64 RPM / 2048 SU로 올라가 이 티어의 상한과 정확히 맞습니다. 새 발전 장치를 세울 필요가 없고, 히트싱크를 떼는 것이 이 시대의 첫 동작이 됩니다. 값은 `config/createfurnaceengine-common.toml`에 있습니다.

#### 최소 RPM

Vintage Improvements의 원심분리는 **레시피마다 최소 회전 속도를 요구합니다.** 스키마의 기본값이 100이라 손대지 않으면 이 시대에서는 하나도 돌지 않습니다. 황동 티어 상한이 64이기 때문입니다.

| 대상 | 최소 RPM | 뜻 |
| --- | --- | --- |
| Honeycomb 가공 · 정제 코크스 · 모드 원본 13건 | 64 | 황동 티어를 꽉 채워야 돕니다 |
| Comb Block 가공 (10배 산출) | 128 | 강철 티어 이후입니다 |

모드 원본 13건은 `minimal_rpm`을 생략해 기본값 100이 걸립니다. 지우고 64를 박아 `kubejs:` 이름으로 다시 넣습니다. 재료와 산출물, 처리 시간은 손대지 않습니다.

`vintageimprovements:` 로 시작하는 ID만 골라내므로 이 스크립트가 추가한 것들은 두 번 처리되지 않습니다.

### 신규 아이템

이 시대에 KubeJS로 여섯을 추가합니다. 텍스처는 전부 기존 모드의 것을 임시로 빌려 씁니다.

| ID | 이름 | 텍스처 출처 | 용도 |
| --- | --- | --- | --- |
| `kubejs:angled_wheel` | Angled Wheel | `vintageimprovements:spring_coiling_machine_wheel` | 코일링 휠의 미가공 상태 |
| `kubejs:precision_iron_spring` | Precision Iron Spring | `vintageimprovements:iron_spring` | 진공 처리한 스프링 |
| `kubejs:vibrated_whisk` | Vibrated Whisk | `create:whisk` | 원심분리기의 핵심 부품 |
| `kubejs:head_mounter` | Head Mounter | `create:crafter_slot_cover` | 커빙 프레스의 헤드 장착부 |
| `kubejs:refined_coke` | Refined Coke | `createmetallurgy:coke` | 강철 합금의 유일한 연료 |
| `kubejs:steel_casing` | Steel Casing | `create:andesite_casing` | 이 시대의 결승선 (블록) |

`kubejs:steel_casing`만 블록입니다. Item Application이 놓여 있는 블록을 바꾸는 방식이라 아이템으로는 만들 수 없습니다. `parentModel`로 등록합니다.

### Vintage 가공 사슬

이 시대의 척추입니다. 원본은 전부 `create:andesite_casing`과 `create:shaft`를 쓰는데, 바닐라 축은 안산암 시대에 제작법을 지웠으므로 **지금 상태로는 다섯 기계 모두 만들 수 없습니다.** 황동 케이싱과 황동 축으로 다시 씁니다.

먼저 Metallurgy가 중복으로 들고 있는 벨트 그라인더 제작법을 지웁니다.

```
제거 : createmetallurgy:crafting/content/mechanical_belt_grinder
```

#### 벨트 그라인더

| 항목 | 값 |
| --- | --- |
| 제거 | `vintageimprovements:craft/belt_grinder` |
| 배치 | `' G '` / `' B '` / `' S '` |

`G` `vintageimprovements:grinder_belt` · `B` `create:brass_casing` · `S` `createtiers:shaft_brass`

원본은 안산암 케이싱 + 바닐라 축이었습니다. 그라인더 벨트는 사포로 만들며 원본 그대로 둡니다.

#### 앵글드 휠 → 코일링 머신 휠

원본 휠은 안산암 합금과 철 블록으로 바로 만들 수 있었습니다. 그 배치를 중간재로 내리고, 연마를 한 단계 끼웁니다.

| 항목 | 값 |
| --- | --- |
| 추가 | `kubejs:angled_wheel` — shaped |
| 배치 | `' A '` / `'ABA'` / `' A '` |

`A` `create:andesite_alloy` · `B` `minecraft:iron_block`

| 항목 | 값 |
| --- | --- |
| 제거 | `vintageimprovements:craft/spring_coiling_machine_wheel` |
| 추가 | `vintageimprovements:polishing` |
| 입력 | `kubejs:angled_wheel` |
| 출력 | `vintageimprovements:spring_coiling_machine_wheel` |
| 속도 제한 | 없음 (`speed_limits: 0`) |

연마는 벨트 그라인더가 돌립니다. 그라인더가 휠을 만들고 휠이 코일링 기계를 만드는 순서가 이 한 줄로 잠깁니다.

#### 스프링 코일링 기계

| 항목 | 값 |
| --- | --- |
| 제거 | `vintageimprovements:craft/spring_coiling_machine` |
| 배치 | `'I  '` / `'WBS'` / `'I  '` |

`I` `minecraft:iron_ingot` · `W` `vintageimprovements:spring_coiling_machine_wheel` · `B` `create:brass_casing` · `S` `createtiers:shaft_brass`

여기서 `vintageimprovements:iron_spring`이 나옵니다. 이후 모든 기계가 스프링을 요구합니다.

#### 진공실

| 항목 | 값 |
| --- | --- |
| 제거 | `vintageimprovements:craft/vacuum_chamber` |
| 배치 | `'   '` / `'SBS'` / `'APA'` |

`S` `vintageimprovements:iron_spring` · `B` `create:brass_casing` · `A` `create:andesite_alloy` · `P` `create:mechanical_pump`

원본은 `#vintageimprovements:springs/iron` 태그였습니다. 아이템으로 못박아 다른 모드의 스프링이 끼어들 여지를 없앱니다.

**인게임 표시 이름은 `Compressor`입니다.** 고무를 만드는 Rubberworks의 `Compressor`와 표시 이름이 완전히 같습니다. 문서에서는 진공실로 부르지만 JEI에서는 둘을 구분해야 합니다.

#### 정밀 철 스프링

| 항목 | 값 |
| --- | --- |
| 추가 | `vintageimprovements:vacuumizing` |
| 입력 | `vintageimprovements:iron_spring` |
| 출력 | `kubejs:precision_iron_spring` |

이 시대 후반부의 관문입니다. 진동대·원심분리기·커빙 프레스·레이저 넷이 전부 이것을 요구합니다.

#### 진동대

| 항목 | 값 |
| --- | --- |
| 제거 | `vintageimprovements:craft/vibrating_table` |
| 배치 | `'   '` / `'PWP'` / `'PMP'` |

`P` `kubejs:precision_iron_spring` · `W` `#minecraft:wooden_slabs` · `M` `create:mechanical_piston`

#### 진동 거품기

| 항목 | 값 |
| --- | --- |
| 추가 | `vintageimprovements:vibrating` |
| 입력 | `create:whisk` |
| 출력 | `kubejs:vibrated_whisk` |

#### 원심분리기

| 항목 | 값 |
| --- | --- |
| 제거 | `vintageimprovements:craft/centrifuge` |
| 배치 | `'PBP'` / `'LSL'` / `'PVP'` |

`P` `kubejs:precision_iron_spring` · `B` `create:brass_casing` · `L` `#minecraft:logs` · `S` `createtiers:shaft_brass` · `V` `kubejs:vibrated_whisk`

정밀 스프링 넷과 진동 거품기 하나가 들어갑니다. 이 시대에서 가장 비싼 기계이며 결승선 바로 앞에 섭니다.

돌리려면 64 RPM이 필요합니다. 황동 티어의 상한이 정확히 그 값이며, 화로 엔진에서 히트싱크를 떼면 바로 나옵니다.

#### 헤드 마운터 → 커빙 프레스

커빙 프레스는 헤드를 갈아 끼우는 기계입니다. 그 장착부를 별도 부품으로 뽑아 냅니다.

| 항목 | 값 |
| --- | --- |
| 추가 | `kubejs:head_mounter` — shaped |
| 배치 | `' H '` / `'HDH'` / `' H '` |

`H` `kubejs:haunted_brass_sheet` · `D` `createdeco:andesite_sheet`

| 항목 | 값 |
| --- | --- |
| 제거 | `vintageimprovements:craft/curving_press` |
| 배치 | `' B '` / `' S '` / `'PMP'` |

`B` `create:brass_casing` · `S` `createtiers:shaft_brass` · `P` `kubejs:precision_iron_spring` · `M` `kubejs:head_mounter`

#### 레이저

| 항목 | 값 |
| --- | --- |
| 제거 | `vintageimprovements:craft/laser` |
| 배치 | `'CRC'` / `'PBS'` / `'QLQ'` |

`C` `createtiers:cogwheel_brass` · `R` `minecraft:redstone_block` · `P` `create:precision_mechanism` · `B` `create:brass_casing` · `S` `kubejs:precision_iron_spring` · `Q` `minecraft:quartz` · `L` `vintageimprovements:laser_item`

배치는 원본 그대로입니다. 바뀐 것은 톱니바퀴를 황동 티어로, 스프링 태그(`#vintageimprovements:springs/iron`)를 정밀 스프링으로 올린 둘뿐입니다. 석영도 태그(`#c:gems/quartz`)에서 바닐라 석영으로 좁힙니다.

`mechanical_crafting/laser.json` 쪽 두 번째 경로는 축도 톱니도 쓰지 않으므로 그대로 둡니다.

#### 헬브 해머와 선반

기계식 제작 레시피이며 배치가 큽니다. **`create:shaft`만 `createtiers:shaft_brass`로 바꾸고 나머지는 원본을 그대로 씁니다.**

| 대상 | 축 개수 | 함께 쓰는 재료 |
| --- | --- | --- |
| `vintageimprovements:helve_hammer` | 1 | 철 블록, 원목, 철 스프링 태그, 안산암 케이싱 |
| `vintageimprovements:lathe` | 2 | 철 블록, 철 스프링 태그, 안산암 케이싱, 정밀 기구, 안산암 합금 |

둘 다 안산암 케이싱을 쓰지만 축 때문에 이 시대로 넘어옵니다. 선반은 정밀 기구도 요구하므로 아래 조립 라인 뒤에 섭니다.

### Create 본체 — 황동 기계

#### 드릴·톱·수확기

원본이 안산암 케이싱만 요구해 이전 시대에 열려 버립니다. 케이싱을 황동으로 올립니다.

| 대상 | 제거 | 배치 |
| --- | --- | --- |
| 기계식 톱 | `create:crafting/kinetics/mechanical_saw` | `' S '` / `'SIS'` / `' B '` |
| 기계식 드릴 | `create:crafting/kinetics/mechanical_drill` | `' A '` / `'AIA'` / `' B '` |
| 기계식 수확기 | `create:crafting/kinetics/mechanical_harvester` | `' A '` / `'AIA'` / `' B '` |

`S` `create:iron_sheet` · `A` `create:andesite_alloy` · `I` `minecraft:iron_ingot` · `B` `create:brass_casing`

수확기는 원본이 3×3이었으나 드릴과 같은 배치로 줄입니다.

#### 물류 — 황동 판을 유령 판으로

전부 `#c:ingots/brass`나 `#c:plates/brass`를 쓰고 있어 황동 주괴만 있으면 만들어집니다. 유령 들린 황동 판으로 바꿔 팬을 다시 거치게 합니다.

| 대상 | 제거 | 배치 |
| --- | --- | --- |
| 황동 퍼널 ×2 | `create:crafting/logistics/brass_funnel` | `' E '` / `' H '` / `' R '` |
| 황동 터널 ×2 | `create:crafting/logistics/brass_tunnel` | `' E '` / `'HH '` / `'RR '` |
| 스마트 슈트 | `create:crafting/kinetics/smart_chute` | `' H '` / `' C '` / `' E '` |
| 스마트 유체 파이프 | `create:crafting/kinetics/smart_fluid_pipe` | `' H '` / `' F '` / `' E '` |
| 브라스 핸드 | `create:crafting/kinetics/brass_hand` | `' A '` / `'HHH'` / `' H '` |
| 전개기 | `create:crafting/kinetics/deployer` | `' E '` / `' B '` / `' N '` |

`E` `create:electron_tube` · `H` `kubejs:haunted_brass_sheet` · `R` `rubberworks:rubber_sheet` · `C` `create:chute` · `F` `create:fluid_pipe` · `A` `create:andesite_alloy` · `B` `create:brass_casing` · `N` `create:brass_hand`

배치는 전부 원본과 같습니다. 재료만 올렸습니다. 전개기는 케이싱도 안산암에서 황동으로 올립니다.

레드스톤 기계류, 확장 집게, 대칭의 지팡이, 기묘한 종, 플래카드는 **바꾸지 않습니다.** 전자관을 요구하므로 이미 이 시대에 맞습니다.

#### 정밀 기구

원본은 조립 라인에서 바닐라 톱니바퀴를 요구합니다. 티어 부품으로 바꾸면서 부산물 표도 함께 옮깁니다.

```
제거 : create:sequenced_assembly/precision_mechanism
```

```javascript
event.custom({
  type: 'create:sequenced_assembly',
  ingredient: { tag: 'c:plates/gold' },
  loops: 5,
  results: [
    { chance: 120.0, id: 'create:precision_mechanism' },
    { chance:   8.0, id: 'create:golden_sheet' },
    { chance:   8.0, id: 'create:andesite_alloy' },
    { chance:   5.0, id: 'createtiers:cogwheel_andesite_alloy' },
    { chance:   3.0, id: 'minecraft:gold_nugget' },
    { chance:   2.0, id: 'createtiers:shaft_andesite_alloy' },
    { chance:   2.0, id: 'create:crushed_raw_gold' },
    { id: 'minecraft:iron_ingot' },
    { id: 'minecraft:clock' }
  ],
  sequence: [
    { type: 'create:deploying',
      ingredients: [{ item: 'create:incomplete_precision_mechanism' },
                    { item: 'createtiers:cogwheel_andesite_alloy' }],
      results: [{ id: 'create:incomplete_precision_mechanism' }] },
    { type: 'create:deploying',
      ingredients: [{ item: 'create:incomplete_precision_mechanism' },
                    { item: 'createtiers:large_cogwheel_andesite_alloy' }],
      results: [{ id: 'create:incomplete_precision_mechanism' }] },
    { type: 'create:deploying',
      ingredients: [{ item: 'create:incomplete_precision_mechanism' },
                    { tag: 'c:nuggets/iron' }],
      results: [{ id: 'create:incomplete_precision_mechanism' }] }
  ],
  transitional_item: { id: 'create:incomplete_precision_mechanism' }
}).id('kubejs:sequenced_assembly/precision_mechanism')
```

**안산암 티어를 씁니다.** 조립 라인은 전개기를 요구하고 전개기는 황동 케이싱을 요구하므로 시대 구분은 이미 맞습니다. 여기서 황동 부품까지 요구하면 이중 관문이 됩니다.

#### 시퀀스드 기어시프트

| 항목 | 값 |
| --- | --- |
| 제거 | `create:crafting/kinetics/sequenced_gearshift` |
| 추가 | shapeless |
| 재료 | `create:brass_casing` + `createtiers:cogwheel_brass` + `create:electron_tube` |

원본과 같은 무형 조합이며 톱니바퀴만 티어로 올렸습니다.

### AE2 — 문 열기

AE2는 이 시대에 **설비만 갖춥니다.** 저장망 운용은 산업 시대입니다.

#### 운동 에너지 수용기

AE 전력의 유일한 입구입니다. `config/ae2-common.toml`에서 `[powerRatios] forgeEnergy`를 `1.0E-9`로 내려 두었으므로 다른 모드 발전기로는 AE가 차지 않습니다.

| 항목 | 값 |
| --- | --- |
| 제거 | `create_ae_generator:kinetic_acceptor` |
| 배치 | `' T '` / `'SCS'` / `' F '` |

`T` `create_ae_generator:stator` · `S` `createtiers:shaft_brass` · `C` `ae2:energy_acceptor` · `F` `ae2:fluix_crystal`

`kubejs/server_scripts/ae_generator.js`가 지금 안산암 축과 서투스 수정으로 임시 트윅해 두었습니다. **이 시대 구현 시 그 스크립트를 지웁니다.**

#### 차저를 테슬라 코일로

| 항목 | 값 |
| --- | --- |
| 제거 | `ae2:network/blocks/crystal_processing_charger` |

Create Crafts & Additions의 테슬라 코일이 대신합니다. 테슬라 코일 제작법은 그대로 둡니다.

| 추가 (`createaddition:charging`) | 입력 | 에너지 | 출력 |
| --- | --- | --- | --- |
| 액정 수정 | `ae2:certus_quartz_crystal` | 1.6K | `ae2:charged_certus_quartz_crystal` |
| 안내서 | `minecraft:book` | 1.6K | `ae2:guide` |
| 운석 나침반 | `minecraft:compass` | 1.6K | `ae2:meteorite_compass` |

`createaddition:compat/ae2/charged_certus_quartz.json`이 이미 기본 탑재되어 있으므로 액정 수정은 원래도 충전으로 얻을 수 있었습니다. 위 셋은 차저가 하던 나머지 역할을 옮기는 것입니다.

#### 인스크라이버 각인을 커빙 프레스로

먼저 프레스 넷을 커빙 헤드 태그에 넣습니다.

```
vintageimprovements:curving_heads
  + ae2:logic_processor_press
  + ae2:calculation_processor_press
  + ae2:silicon_press
  + ae2:engineering_processor_press
```

전부 `vintageimprovements:curving`이며 `DAMAGE`는 0입니다. 프레스에 내구도가 없어 소모되지 않습니다.

| 헤드 | 입력 | 출력 |
| --- | --- | --- |
| `ae2:logic_processor_press` | `minecraft:iron_block` | `ae2:logic_processor_press` |
| `ae2:logic_processor_press` | `minecraft:gold_ingot` | `ae2:printed_logic_processor` |
| `ae2:calculation_processor_press` | `minecraft:iron_block` | `ae2:calculation_processor_press` |
| `ae2:calculation_processor_press` | `ae2:certus_quartz_crystal` | `ae2:printed_calculation_processor` |
| `ae2:silicon_press` | `minecraft:iron_block` | `ae2:silicon_press` |
| `ae2:silicon_press` | `ae2:silicon` | `ae2:printed_silicon` |
| `ae2:engineering_processor_press` | `minecraft:iron_block` | `ae2:engineering_processor_press` |
| `ae2:engineering_processor_press` | `minecraft:diamond` | `ae2:printed_engineering_processor` |

프레스가 자기 자신을 복제하는 구조는 AE2 원본과 같습니다. 첫 프레스는 운석에서 얻으며, 그것이 이 계통의 유일한 시작점입니다.

#### 인스크라이버 압착을 진공실로

전부 `vintageimprovements:pressurizing`이며 `heat`는 `heated`입니다.

| 입력 1 | 입력 2 | 입력 3 | 출력 |
| --- | --- | --- | --- |
| `ae2:printed_calculation_processor` | `minecraft:redstone` | `ae2:printed_silicon` | `ae2:calculation_processor` |
| `ae2:printed_logic_processor` | `minecraft:redstone` | `ae2:printed_silicon` | `ae2:logic_processor` |
| `ae2:printed_engineering_processor` | `minecraft:redstone` | `ae2:printed_silicon` | `ae2:engineering_processor` |

### 벌과 원심분리

Productive Bees는 자기 원심분리기 넷을 들고 있습니다. 전부 지우고 Vintage 원심분리기 하나로 모읍니다.

```
제거 : productivebees:centrifuge_cauldron
제거 : productivebees:centrifuge
제거 : productivebees:powered_centrifuge/vanilla
제거 : productivebees:heated_centrifuge
```

`centrifugation/honey_comb`은 **지우지 않습니다.** 바닐라 벌집을 `create:honey` 100mb로 바꾸는 유일한 경로이며, 최소 RPM만 64로 내립니다.

#### 복사

`productivebees:centrifuge` 타입 레시피를 `vintageimprovements:centrifugation`으로 옮깁니다.

| 항목 | 값 |
| --- | --- |
| 데이터팩에 있는 수 | 325개 |
| **이 팩에서 실제로 옮겨지는 수** | **55개** |
| `processing_time` | 50 |
| `minimal_rpm` | 64 |

325개 중 294개가 `neoforge:mod_loaded` 조건을 달고 있고, 그 위에 `productivebees:bee_exists` 조건이 또 걸립니다. **하드코딩하지 말고 `event.forEachRecipe`로 실제 적재된 것만 훑어야 합니다.** 그래야 조건이 알아서 걸러집니다.

옮길 때 두 가지를 챙겨야 합니다.

- **유체 산출물.** 325개 중 39개가 `outputs`가 아니라 별도의 `fluid` 필드로 유체를 내놓습니다. Create의 가공 결과는 아이템과 유체를 같은 배열에 담으므로 `{ id, amount }`로 밀어 넣습니다. 태그로 적힌 10건은 이 팩에 없는 모드 것이라 버립니다.
- **바닐라 벌집은 건너뜁니다.** Productive Bees에도 `minecraft:honeycomb`을 받는 레시피가 있지만 Vintage가 이미 꿀 100mb로 바꾸는 레시피를 들고 있습니다. 그쪽이 Create의 꿀을 내주어 이 팩에서 더 쓸모가 있고, 같은 입력에 레시피가 둘이면 기계가 어느 쪽을 고를지 알 수 없습니다.

#### Comb Block 판본 추가

같은 벌 종류의 `productivebees:configurable_comb` 입력을 새로 만듭니다. 인게임 표시 이름은 **Comb Block**이고, 낱개 쪽은 **Honeycomb**입니다.

| 항목 | 값 |
| --- | --- |
| 입력 | `productivebees:configurable_comb[productivebees:bee_type="<BEE_TYPE>"]` |
| 생산물 | Honeycomb 판본의 10배 (유체도 10배) |
| `processing_time` | 100 |
| `minimal_rpm` | 128 |

`comb_breeze`와 `comb_blazing` 둘은 모드가 이미 들고 있으므로 건너뜁니다.

**128 RPM은 황동 티어로 못 냅니다.** 강철 축이 나온 뒤에야 돌릴 수 있으므로 10배 산출은 산업 시대의 몫이 됩니다.

### 강철 — 결승선

#### 정제 코크스

| 항목 | 값 |
| --- | --- |
| 추가 | `vintageimprovements:centrifugation` |
| 입력 | `createmetallurgy:coke` |
| 출력 | `kubejs:refined_coke` |
| `processing_time` | 100 |
| `minimal_rpm` | 64 |

원심분리기가 있어야 나옵니다. 위 사슬 전체가 이 한 아이템으로 수렴합니다.

#### 강철 합금

```
제거 : createmetallurgy:alloying/steel
제거 : petrochem:mixing/steel_alloy_coal
```

| 항목 | 값 |
| --- | --- |
| 추가 | `createmetallurgy:alloying` |
| 입력 1 | `kubejs:refined_coke` |
| 입력 2 | `createmetallurgy:molten_iron` 270mb |
| `heat_requirement` | `heated` |
| 출력 | `createmetallurgy:molten_steel` 270mb |

원본은 `#c:coal_coke` 태그를 받았습니다. 그 태그에는 `createmetallurgy:coke` 하나뿐이므로 아이템으로 못박아도 잃는 것이 없고, 대신 원심분리를 건너뛸 길이 사라집니다.

Petrochem 쪽 철 주괴 + 석탄 혼합은 강철을 그냥 내주므로 함께 지웁니다.

**석유 코크스 우회는 자기 자신이 막습니다.** 증류탑 제어기가 `#c:plates/steel`을 요구하므로 강철 없이는 석유 코크스에 닿지 못합니다.

Metallurgy 강철 주괴를 압착하면 Petrochem 강철 판이 나옵니다. Almost Unified가 두 모드의 강철을 같은 태그로 묶어 두어 생기는 일이며, 어느 쪽 강철이든 `#c:plates/steel`로 통합됩니다.

#### 강철 케이싱

| 항목 | 값 |
| --- | --- |
| ID | `kubejs:steel_casing` |
| 텍스처 | 일단 안산암 케이싱과 같게 |
| 추가 | Item Application — `create:andesite_casing`에 `#c:plates/steel` 우클릭 |

이 시대의 결승선입니다.

### 기계식 압출기

안산암 판본은 이전 시대에 열려 있습니다. **황동 판본**이 이 시대에 열립니다.

| 항목 | 값 |
| --- | --- |
| 대상 | `create_mechanical_extruder:mechanical_brass_extruder` |
| 제작법 | 원본 유지 |

원본이 황동 케이싱과 황동 판, 금속 거더, 틀 유리 다락문을 요구하므로 조정 없이 시대가 맞습니다. 퀘스트 라인에만 넣습니다.

---

## AE2 챕터와 어긋나는 곳

이 시대의 레시피 변경이 기존 AE2 챕터를 두 군데 깨뜨립니다. **아직 고치지 않았습니다.**

- **충전기 퀘스트가 완료 불가.** `ae2:charger`를 만드는 레시피는 팩 전체에 `network/blocks/crystal_processing_charger` 하나뿐인데 이 시대에서 지웁니다. AE2 챕터의 「전기를 먹여 봅시다」가 죽습니다. 테슬라 코일로 바꿔야 합니다.
- **사슬 순서가 뒤집힘.** AE2 챕터는 스테이터 → 운동 에너지 수용기 → 충전기 → 액정 수정 순입니다. 그런데 이 시대에서 운동 에너지 수용기가 액정 수정을 요구하도록 바꿨습니다. 순환은 아닙니다. 테슬라 코일이 FE로 돌아 AE를 먹지 않기 때문입니다. 퀘스트 배치만 어긋납니다.
- **스테이터와 운동 에너지 수용기가 두 챕터에 중복**됩니다. AE2 챕터가 이미 코일 → 스테이터 → 수용기를 다룹니다.

## 다음 시대로 넘긴 것

**애드온 기계들**입니다. 전부 바닐라 축이나 톱니바퀴를 요구해 지금은 만들 수 없으며, 산업 시대 문서에서 재료를 조정합니다.

| 모드 | 대상 |
| --- | --- |
| Create Crafts & Additions | 롤링 밀 (2건) |
| Create: Atomic | 증기 터빈 |
| Create Utilities J | 공허 모터, 기어박스 3종 |
| Create: Enchantment Industry | 기계식 숫돌 |
| Create: Bitterballen | 기계식 튀김기 |
| Create: Transmission | 전동 체인 |
| Create: Petrochem | 소형 엔진, 펌프잭 암, 강철 펌프 |

AE2 저장망, 고급 물류, 높은 RPM 구간도 산업 시대입니다.

## 밸런스

수치 조정은 릴리즈 후 의견을 모아 진행합니다.

| 항목 | 값 |
| --- | --- |
| 티어 승급 | 안산암 부품 1 + 유령 들린 황동 판 1 |
| 정밀 철 스프링 | 철 스프링 1 (진공 1회) |
| 원심분리기 | 정밀 스프링 4 + 진동 거품기 1 + 황동 케이싱 1 + 황동 축 1 |
| 정제 코크스 | 코크스 1 (원심분리 100틱 · 64 RPM) |
| 동력 | 화로 엔진, 히트싱크 제거 (64 RPM / 2048 SU) |
| 강철 | 정제 코크스 1 + 용융 철 270mb |

원심분리기까지 가는 길이 이 시대에서 가장 깁니다. 그라인더 → 휠 → 코일링 → 스프링 → 진공 → 정밀 스프링 → 진동대 → 거품기 → 원심분리기로 아홉 단계입니다. 다만 한 번 세우고 나면 강철은 코크스 하나당 270mb로 계속 나옵니다. 고통은 일회성이고 끝에 큰 보상이 옵니다.

## 참고 자료

- [QUEST_ANDESITE_ALLOY_AGE.md](QUEST_ANDESITE_ALLOY_AGE.md) — 이전 시대
- [README.md](README.md) — 시대 구분과 동력 계보
- `kubejs/startup_scripts/tiers.js` — 티어 등록
- `config/ae2-common.toml` — AE 전력 환율
