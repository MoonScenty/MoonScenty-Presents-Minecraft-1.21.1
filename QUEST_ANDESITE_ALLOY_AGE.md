# 안산암 합금 시대 설계

Create 기술 시대의 두 번째 장입니다. 석기 시대를 안산암 케이싱으로 마친 플레이어가 진입합니다.

## 진행 방식

안산암 합금으로 이 시대의 주요 기계를 세우고, 압착기로 구리 판을 만들어 유체와 고무로 나아가며, 최종 목표인 **황동 케이싱**에 도달합니다.

```
안산암 합금 → 동력 부품과 기계
안산암 합금 → 벨트와 퍼널, 물류의 시작
압착기 → 구리 판 → 구리 케이싱 → 유체 가공 → 고무
고무 → 믹서 → 팬 → 유령 가공 → 황동 케이싱
```

## 구현 현황

- 티어 등록은 `kubejs/startup_scripts/tiers.js`에 있습니다.
- 레시피는 `kubejs/server_scripts/andesite_alloy_age.js`에 있습니다. 제거 24건, 추가 30건입니다.
- 퀘스트는 `config/ftbquests/quests/chapters/andesite_alloy_age.snbt`에 있습니다. 본선 28개, 선택 28개입니다.
- 문서의 레시피 ID 46개와 아이템 ID 16개는 전부 팩에서 실재를 확인했습니다.

## 설계 원칙

- 동력 부품을 **Create Tiers의 티어 부품으로 옮깁니다.** 바닐라 축과 톱니바퀴는 만들 수 없게 하고, 같은 재료·같은 공정으로 티어 부품이 나오게 합니다.
- 진행은 **압착기 → 구리 판 → 고무 → 믹서 → 팬** 순서로 강제합니다. 각 단계가 다음 단계의 재료를 만듭니다.
- 결승선은 **황동 케이싱**이며 관문은 팬 유령 가공 하나로 모읍니다.
- 황동 주괴 자체는 막지 않습니다. 주괴로만 만들 수 있는 물건들은 황동 시대 문서에서 다룹니다.

## 주요 자원

안산암 합금, 구리, 고무

---

## 레시피 명세

### 동력 부품 티어

```js
CreateTiers.registerTiers([
  { name: 'andesite_alloy', level: 1, maxRPM: 32,  maxSU: 1024,     shaftColor: 0xF5FFF6, cogwheelColor: 0xF5FFF6, displayName: 'Andesite Alloy' },
  { name: 'brass',          level: 2, maxRPM: 64,  maxSU: 2048,     shaftColor: 0xFFC672, cogwheelColor: 0xFFC672, displayName: 'Brass' },
  { name: 'steel',          level: 3, maxRPM: 128, maxSU: 4096,     shaftColor: 0xA5A5A5, cogwheelColor: 0xAAAAAA, displayName: 'Steel' },
  { name: 'void_steel',     level: 4, maxRPM: 256, maxSU: 67108864, shaftColor: 0x1E9D8A, cogwheelColor: 0x1EA28E, displayName: 'Void Steel' }
])
```

아이템 ID는 `createtiers:<부품>_<티어>` 형태입니다. 인게임에서 확인했습니다.

#### 색상 값의 의미

두 색은 화면에 그대로 찍히는 값이 아닙니다. Create Tiers는 Create의 원본 텍스처를 Rec.709 휘도로 회색조화한 뒤 바닐라 색 핸들러로 **곱하기 틴트**를 겁니다.

```
화면에 보이는 색 = 회색조 밝기 × 틴트 / 255
```

재질의 색을 그대로 적으면 두 번 어두워집니다. 그래서 기준 텍스처의 평균 휘도로 나눠 되돌린 값을 넣었습니다.

| 항목 | 기준 텍스처 | 평균 휘도 |
| --- | --- | --- |
| shaftColor | `create:block/axis` + `axis_top` | 113.22 |
| cogwheelColor | `create:block/cogwheel_axis` | 110.04 |

| 티어 | 재질 출처 | 재질 평균색 |
| --- | --- | --- |
| 안산암 합금 | `create:block/axis` 원본 | `#6E726F` |
| 황동 | `create:block/brass_block` | `#C89B59` |
| 강철 | `createmetallurgy:block/steel_block` | `#494949` |
| 공허 강철 | `createutilities:block/void_steel_block` | `#0D463D` |

티어마다 두 색이 거의 같은 것은 정상입니다. 둘 다 같은 금속 축을 칠하며 기준 텍스처의 밝기만 다릅니다. 톱니바퀴의 나무 이는 회색조 대상이 아니라 어떤 티어에서도 나무색으로 남습니다.

황동만 예외입니다. 황동 블록이 기준 텍스처보다 밝아 곱하기 틴트로는 그 밝기에 닿지 못합니다. 색조만 맞춘 값이라 화면에서는 조금 어두운 황동으로 보입니다.

강철은 Metallurgy 쪽을 기준으로 삼았습니다. Petrochem에도 같은 태그의 강철이 있고 그쪽이 조금 밝습니다(`#585858` → `0xC6C6C6` / `0xCBCBCB`).

```
createtiers:shaft_andesite_alloy
createtiers:cogwheel_andesite_alloy
createtiers:large_cogwheel_andesite_alloy
createtiers:gearbox_andesite_alloy
createtiers:vertical_gearbox_andesite_alloy
```

#### 제거

바닐라 동력 부품과 그것을 재료로 쓰는 파생 레시피 17개를 지웁니다.

```
create:crafting/kinetics/shaft
create:cutting/andesite_alloy
create:crafting/kinetics/cogwheel
create:deploying/cogwheel
create:crafting/kinetics/large_cogwheel
create:crafting/kinetics/large_cogwheel_from_little
create:deploying/large_cogwheel
create:crafting/kinetics/gearbox
create:crafting/kinetics/gearbox_from_conversion
create:crafting/kinetics/vertical_gearbox
create:crafting/kinetics/vertical_gearbox_from_conversion
copycats:stonecutting/copycat_shaft
copycats:crafting/copycat_cogwheel
copycats:crafting/copycat_large_cogwheel
createutilities:shaped/gearcube
createutilities:shaped/lshaped_gearbox
createutilities:shaped/lshaped_gearbox_mirrored
```

Create Utilities J의 기어박스 셋은 산업 시대에 되살립니다. 카피캣 셋은 장식 계열이라 지금은 그대로 둡니다.

#### 추가

| 대상 | 방식 | 재료 |
| --- | --- | --- |
| 축 (4개) | shaped 세로 2칸 | `create:andesite_alloy` 2 |
| 톱니바퀴 | shapeless | 축 1 + `#minecraft:planks` 1 |
| 큰 톱니바퀴 | shapeless | 톱니바퀴 1 + 판자 1 |
| 큰 톱니바퀴 | shapeless | 축 1 + 판자 2 |
| 기어박스 | shapeless | 수직 기어박스 1 |
| 수직 기어박스 | shapeless | 기어박스 1 |

기어박스 두 종은 shaped 배치도 함께 둡니다. `C`는 톱니바퀴, `B`는 `create:andesite_casing`입니다.

```
기어박스        수직 기어박스
 ' C '            'C C'
 'CBC'            ' B '
 ' C '            'C C'
```

### 동력 전달

| 대상 | 제거 | 추가 |
| --- | --- | --- |
| 클러치 | `create:crafting/kinetics/clutch` | shapeless — 안산암 케이싱, 축, `minecraft:redstone` |
| 기어시프트 | `create:crafting/kinetics/gearshift` | shapeless — 안산암 케이싱, 톱니바퀴, 레드스톤 |
| 인케이스드 체인 드라이브 | `create:crafting/kinetics/encased_chain_drive` | 없음 |
| 체인 컨베이어 (2개) | `create:crafting/kinetics/chain_conveyor` | shaped |

체인 드라이브는 아연 판본(`encased_chain_drive_from_zinc`)이 따로 있어 그것만 남깁니다. 철 너깃 판본을 지우면 아연으로 통일됩니다.

체인 컨베이어는 원본이 바닐라 큰 톱니바퀴를 요구하므로 다시 씁니다. `A`는 안산암 케이싱, `C`는 톱니바퀴입니다.

```
' A '
'ACA'
' A '
```

### 동력원

```
제거 : create:crafting/kinetics/water_wheel
제거 : create:crafting/kinetics/large_water_wheel
제거 : create:crafting/kinetics/steam_engine
제거 : create:crafting/kinetics/windmill_bearing
```

물레방아와 풍차는 놓고 잊는 공짜 동력이라 막습니다. 증기 기관은 보일러가 탱크를 키우는 만큼 출력이 올라 이후 시대까지 덮어 버립니다.

돛과 돛 틀은 남기되 **퀘스트에서 장식용임을 명시**합니다.

| 대상 | 제거 | 배치 |
| --- | --- | --- |
| 러닝머신 | `createtreadmill:treadmill` | `' A'` / `' S'` / `'ABA'` |
| 기계식 베어링 | `create:crafting/kinetics/mechanical_bearing` | `' W'` / `' A'` / `' S'` (세로) |
| 플라이휠 | `create:crafting/kinetics/flywheel` | 안산암 판 8 + 축 1 |
| 화로 엔진 | `createfurnaceengine:furnace_engine` | 안산암 판 6 + 안산암 케이싱 + 산업용 철 블록 2 + 피스톤 |

`A` 안산암 케이싱 · `S` `createtiers:shaft_andesite_alloy` · `B` `create:belt_connector` · `W` `#minecraft:wooden_slabs` · 안산암 판 `createdeco:andesite_sheet`

화로 엔진 배치입니다.

```
'DDI'      D = createdeco:andesite_sheet
'DAP'      I = create:industrial_iron_block
'DDI'      A = create:andesite_casing   P = minecraft:piston
```

### 기계

| 대상 | 제거 | 재료 |
| --- | --- | --- |
| 회전판 | `create:crafting/kinetics/turntable` | 나무 반 블록 + 축 (세로) |
| 가중 배출기 | `create:crafting/kinetics/weighted_ejector` | `create:golden_sheet` + `create:depot` + 톱니바퀴 (세로) |
| 기계식 펌프 | `create:crafting/kinetics/mechanical_pump` | shapeless — 톱니바퀴 1 + `create:fluid_pipe` |

### 구리와 케이싱

케이싱을 주괴가 아니라 **판**으로 만들게 바꿔 압착기를 앞에 세웁니다.

| 대상 | 제거 | 추가 |
| --- | --- | --- |
| 구리 케이싱 | `create:item_application/copper_casing_from_log` | Item Application — `#c:stripped_logs`에 `create:copper_sheet` 우클릭 |
| | `create:item_application/copper_casing_from_wood` | Item Application — `#c:stripped_woods`에 `create:copper_sheet` 우클릭 |

**방수 구리 케이싱** (KubeJS 신규)

| 항목 | 값 |
| --- | --- |
| ID | `kubejs:waterproof_copper_casing` |
| 텍스처 | 일단 구리 케이싱과 같게 |
| 제작 | Item Application — 구리 케이싱에 `rubberworks:rubber_sheet` 우클릭 |

유체 기계군이 전부 이 하나를 거치므로 고무 → 케이싱 → 유체 순서가 강제됩니다.

### 고무

| 대상 | 제거 | 배치 |
| --- | --- | --- |
| 수액 채취기 | `rubberworks:crafting/sapper` | `' C '` / `'ANC'` / `' C '` |
| 압축기 | `rubberworks:crafting/compressor` | `' S'` / `' B'` / `' I'` (세로) |

`C` `create:copper_sheet` · `A` 안산암 케이싱 · `N` 톱니바퀴 · `S` 축 · `B` `create:andesite_alloy_block` · `I` `create:industrial_iron_block`

### 유체

전부 방수 구리 케이싱을 요구합니다.

| 대상 | 제거 | 재료 |
| --- | --- | --- |
| 호스 도르래 | `create:crafting/kinetics/hose_pulley` | 방수 케이싱 + `rubberworks:rubber_block` + 구리 판 (세로) |
| 아이템 배수구 | `create:crafting/kinetics/item_drain` | `minecraft:iron_bars` + 방수 케이싱 (세로) |
| 주입구 | `create:crafting/kinetics/spout` | 방수 케이싱 + `rubberworks:rubber_sheet` (세로) |
| 휴대용 유체 인터페이스 | `create:crafting/kinetics/portable_fluid_interface` | shapeless — 방수 케이싱 1 + `create:chute` 1 |

### 요리 연동

| 대상 | 제거 | 배치 |
| --- | --- | --- |
| 슬라이서 | `sliceanddice:slicer` | 톱니바퀴 / 안산암 케이싱 / `create:turntable` (세로) |
| 스프링클러 | `sliceanddice:sprinkler` | `'CWC'` / `' P '` / `' B '` |

`C` 구리 판 · `W` 방수 케이싱 · `P` `create:fluid_pipe` · `B` `minecraft:iron_bars`

### 물류

물류는 이 시대에 열립니다. **레시피는 손대지 않습니다.** 원본이 이미 안산암 합금과 철 판만 요구하므로 시대 구분이 그대로 맞습니다.

| 대상 | 재료 | 열리는 시점 |
| --- | --- | --- |
| 벨트 | `minecraft:dried_kelp` 6 | 바로 |
| 안산암 퍼널 · 터널 | 안산암 합금 + 말린 켈프 | 바로 |
| 디팟 | 안산암 합금 + 안산암 케이싱 | 바로 |
| 우편함 | 안산암 합금 + 통 + 염료 | 바로 |
| 아이템 해치 | 안산암 합금 + 철 다락문 | 바로 |
| 슈트 | `#c:plates/iron` + 철 주괴 | 압착기 이후 |
| 아이템 보관함 | 철 판 + `#c:barrels/wooden` | 압착기 이후 |
| 데스크 벨 | 안산암 케이싱 + `#c:plates/gold` | 압착기 이후 |
| 휴대용 저장고 인터페이스 | 안산암 케이싱 + 슈트 | 슈트 이후 |
| 송신기 | `#c:plates/copper` + 피뢰침 + 레드스톤 | 구리 판 이후 |
| 레드스톤 링크 | 송신기 + 안산암 케이싱 | 송신기 이후 |

**택배 계통**도 이 시대에 전부 열립니다. 골판지가 관문이며 믹서와 압착기를 함께 요구합니다.

```
대나무·사탕수수·묘목 4 + 물 250 → 펄프   (create:mixing)
펄프 → 골판지                            (create:pressing)
```

골판지 다음으로 포장기, 우편함, 프로그포트, 스톡 링크, 스톡 티커, 레드스톤 리퀘스터가 이어집니다. 팩토리 게이지만 정밀 기구를 요구해 황동 시대로 넘어갑니다.

아래 것들은 **황동 케이싱이나 전자관을 요구해 자연히 다음 시대**입니다. 따로 막을 필요가 없습니다.

재고 스위치, 내용물 감지기, 디스플레이 링크, 팩토리 게이지, 기계식 팔

### 황동 — 결승선

관문을 케이싱 한 곳에 모읍니다. 황동 주괴와 판은 자유롭게 만들 수 있고, **케이싱만 유령 가공을 거칩니다.**

**유령 들린 황동 판** (KubeJS 신규)

| 항목 | 값 |
| --- | --- |
| ID | `kubejs:haunted_brass_sheet` |
| 텍스처 | 일단 황동 판과 같게 |
| 제작 | Fan Haunting — `create:brass_sheet`을 유령 가공 |

| 대상 | 제거 | 추가 |
| --- | --- | --- |
| 황동 케이싱 | `create:item_application/brass_casing_from_log` | Item Application — `#c:stripped_logs`에 유령 들린 황동 판 우클릭 |
| | `create:item_application/brass_casing_from_wood` | Item Application — `#c:stripped_woods`에 유령 들린 황동 판 우클릭 |
| | `createmetallurgy:casting_in_basin/brass_casing` | |

팩 전체를 훑어 `create:brass_casing`을 만드는 레시피가 이 셋뿐임을 확인했습니다. 셋을 모두 지우면 유령 가공이 유일한 경로가 되고, 유령 가공은 인케이스드 팬을 요구하므로 팬이 이 시대의 마지막 관문이 됩니다.

---

## 다음 시대로 넘긴 것

**황동 주괴만 있으면 만들 수 있는 것들**입니다. 황동 주괴를 막지 않기로 했으므로 이들은 황동 시대 문서에서 재료를 조정합니다.

황동 퍼널, 황동 터널, 스마트 슈트, 스마트 유체 파이프, 브라스 핸드, 펄스 연장기·반복기·타이머, 확장 집게, 대칭의 지팡이, 기묘한 종, 플래카드

황동 창살·사다리·비계·식탁보는 장식이라 그대로 둡니다.

**기계식 드릴·톱·수확기**도 황동 시대 문서에서 다룹니다. 원본이 안산암 합금과 안산암 케이싱만 요구하므로 조정 없이는 이 시대에 열립니다.

**기계식 압출기**는 이 시대에 열리는 것이 맞습니다. 퀘스트 라인에 넣되 레시피는 원본을 그대로 씁니다.

## 밸런스

수치 조정은 릴리즈 후 의견을 모아 진행합니다.

| 항목 | 값 |
| --- | --- |
| 축 | 안산암 합금 2 → 4개 |
| 톱니바퀴 | 축 1 + 판자 1 |
| 큰 톱니바퀴 | 톱니바퀴 1 + 판자 1, 또는 축 1 + 판자 2 |

축 수량이 이전 설계(합금 2개 → 8개)의 절반입니다. 기계식 톱으로 합금을 켜서 축을 뽑던 경로(`create:cutting/andesite_alloy`)도 제거하고 대체를 두지 않았습니다. 톱이 황동 시대이므로 일관됩니다.

## 참고 자료

- [QUEST_STONE_AGE.md](QUEST_STONE_AGE.md) — 이전 시대
- [README.md](README.md) — 시대 구분과 동력 계보
- `kubejs/startup_scripts/tiers.js` — 티어 등록
