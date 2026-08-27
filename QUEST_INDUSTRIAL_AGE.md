# 산업 시대 설계

Create 기술 시대의 네 번째 장입니다. 황동 시대를 강철 케이싱으로 마친 플레이어가 진입합니다.

## 진행 방식

강철은 이미 손에 있습니다. 그래서 이 시대의 진짜 관문은 **청동**이고, 청동은 주석을 요구합니다. 주석을 뚫으면 정유소가 열리고, 정유소가 열려야 공허 강철에 닿습니다. 최종 목표는 **공허 케이싱**입니다.

```
아연 너깃 + 진한 물약 → 가압 → 주석 너깃 → 주석 주괴
구리 3 + 주석 주괴 1 → 혼합 → 청동
청동 → 증류탑 제어기 · 가스 터빈 · 엔진
펌프잭 → 원유 → 증류 → 등유 · LPG
등유 + 강철 + 엔더 진주 → 가압 → 공허 강철 → 공허 케이싱
```

동력 부품은 황동에서 **강철 티어(128 RPM / 4096 SU)** 로 올라갑니다. FE 발전은 알터네이터에서 **가스 터빈**으로 갈아탑니다.

## 구현 현황

- **레시피 구현 완료.** `kubejs/server_scripts/industrial_age.js`에 있습니다. 제거 30건, 추가 27건입니다.
- 신규 아이템 `tin_ingot`은 `kubejs/startup_scripts/items.js`, `tin_block`은 `blocks.js`에 등록했습니다. 텍스처는 `kubejs/assets/kubejs/textures/`에 있습니다.
- **퀘스트 챕터는 아직 비어 있습니다.** `config/ftbquests/quests/chapters/industrial_age.snbt`가 대상입니다.
- 문서의 레시피 ID 30개와 아이템·태그 ID는 전부 팩에서 실재를 확인했습니다.
- 티어 부품 ID는 `kubejs/startup_scripts/tiers.js`에 등록된 `steel` 티어에서 나옵니다.

**KubeJS 서버 스크립트는 전역 스코프를 공유합니다.** 이 파일의 상수는 전부 `IND_` 로 열어 다른 시대와 겹치지 않게 두었습니다.

## 설계 원칙

- 동력 부품을 **강철 티어로 승급**합니다. 황동 부품에 강철 판을 얹는 방식이라 앞선 두 시대와 같습니다.
- 강철만으로는 시대를 가르지 못하므로 **청동을 관문으로 세웁니다.** Petrochem 설비 대부분이 강철 판만 요구해 그대로 두면 황동 시대 끝에 다 열립니다.
- **FE는 배선하지 않습니다.** Crafts & Additions의 커넥터 계열을 전부 지우고 원거리 전송은 PIPEZ에 맡깁니다.
- 결승선은 **공허 케이싱**이며, 그 앞에 정유소를 세워야 하도록 등유를 요구합니다.
- **공허 강철 티어(256 RPM)는 원자력 시대로 넘깁니다.** 이 시대에서는 재료만 만듭니다.

## 주요 자원

주석, 청동, 강철, 공허 강철

---

## 레시피 명세

### 동력 부품 티어

`steel` 티어는 **128 RPM / 4096 SU**입니다. 황동의 정확히 두 배입니다.

| 부품 | ID |
| --- | --- |
| 축 | `createtiers:shaft_steel` |
| 톱니바퀴 | `createtiers:cogwheel_steel` |
| 큰 톱니바퀴 | `createtiers:large_cogwheel_steel` |
| 기어박스 | `createtiers:gearbox_steel` |
| 세로 기어박스 | `createtiers:vertical_gearbox_steel` |

승급은 앞선 두 시대와 같은 형태입니다.

```
황동 부품 1 + #c:plates/steel 1  →  강철 부품 1   (무형 조합)
```

황동이 **유령 들린 황동 판**을 요구했듯 강철도 **판**을 요구합니다. 강철 판은 정제 코크스를 거쳐야 나오므로 이전 시대의 설비가 그대로 재료 공급원이 됩니다.

기어박스 두 종은 서로 뒤집을 수 있습니다.

```
createtiers:gearbox_steel 1           →  createtiers:vertical_gearbox_steel 1
createtiers:vertical_gearbox_steel 1  →  createtiers:gearbox_steel 1
```

### 주석 — 이 시대의 관문

#### 얻는 방법을 기계로 옮깁니다

원본 `petrochem:filling/tin`은 아연 너깃에 진한 물약을 **부어 채우는** 방식이었습니다. 재료는 그대로 두고 기계만 가압기로 옮깁니다.

```
제거   petrochem:filling/tin
추가   kubejs:pressurizing/tin_nugget
```

| | |
| --- | --- |
| 기계 | Vintage 가압기 (`vintageimprovements:pressurizing`) |
| 열 | Heated |
| 입력 | `#c:nuggets/zinc` 1 + 진한 물약 25mB |
| 시간 | 100틱 |
| 출력 | `petrochem:tin_nugget` 1 |

가압기는 황동 시대에 이미 열려 있고 열을 요구하므로, 손으로 하나씩 채우던 것이 설비가 됩니다.

**진한 물약 유체는 구성 요소를 둘 다 적어야 합니다.** `potion_contents`만 적으면 조용히 안 맞습니다.

```json
{
  "type": "neoforge:components",
  "fluids": "create:potion",
  "amount": 25,
  "components": {
    "create:potion_fluid_bottle_type": "regular",
    "minecraft:potion_contents": { "potion": "minecraft:thick" }
  }
}
```

Create 자신의 `filling/glowstone`이 쓰는 형태를 그대로 따른 것입니다.

#### 주괴와 블록은 이 모드팩이 만듭니다

Petrochem은 주석을 **너깃으로만** 들고 있고, 팩 안 어느 모드도 주괴를 내놓지 않습니다. 청동을 주괴 3:1로 묶으려면 주괴가 필요하므로 여기서 만듭니다.

| 아이템 | ID |
| --- | --- |
| Tin Ingot | `kubejs:tin_ingot` |
| Block of Tin | `kubejs:tin_block` |

변환 넷을 직접 씁니다. **Almost Unified는 중복 아이템을 하나로 합칠 뿐 이런 변환을 만들어 주지 않습니다.**

```
너깃 9  →  주괴 1      주괴 1  →  너깃 9
주괴 9  →  블록 1      블록 1  →  주괴 9
```

##### 텍스처

Create 아연의 형태를 그대로 두고 색만 옮겼습니다. 기준은 Petrochem의 주석 너깃이라 너깃·주괴·블록 셋을 나란히 놓아도 같은 금속으로 보입니다.

| | 원본 고유색 | 대응 |
| --- | --- | --- |
| 주괴 | 아연 주괴 9색 | 주석 너깃 9색에 광도 순 **1:1** |
| 블록 | 아연 블록 7색 | 주석 9단계 중 **어두운 쪽 7** |

블록을 밝은 쪽에 맞추면 색이 떠서 금속처럼 보이지 않습니다.

#### 태그는 정확히 셋만 넣습니다

```
c:ingots/tin          kubejs:tin_ingot
c:storage_blocks/tin  kubejs:tin_block      (아이템·블록 양쪽)
c:nuggets/tin         petrochem:tin_nugget  (이미 있음)
```

**아래 셋은 절대 넣지 마십시오.** 지금은 어느 모드도 채우지 않아 잠겨 있습니다.

| 태그 | 넣으면 열리는 것 |
| --- | --- |
| `c:raw_materials/tin` | `create:crushing/raw_tin`이 켜지고, **조건이 없는** `createmetallurgy:melting/tin/raw_crushed`를 타고 용융 주석으로 직행합니다 |
| `c:dusts/tin` | 주석벌 원심분리가 살아납니다 |
| `c:nuggets/bronze` | 구리벌 + 주석벌로 태어나는 **청동벌**이 청동 너깃을 4~6개씩 뽑아냅니다 |

하나만 넣어도 3:1 비율이 통째로 무의미해집니다. 황동 시대에 원심분리 사슬을 이미 깔아 두었으므로 벌 노선은 기계가 준비된 상태입니다.

### 청동

원본은 구리 주괴 1에 주석 **너깃** 1이라 주괴로 환산하면 9:1이 넘습니다. 주괴 기준 3:1로 맞춥니다.

```
제거   petrochem:mixing/bronze_alloy
추가   kubejs:mixing/bronze_ingot
```

| | |
| --- | --- |
| 기계 | 기계식 믹서 |
| 열 | Heated |
| 입력 | 구리 주괴 3 + `kubejs:tin_ingot` 1 |
| 출력 | `petrochem:bronze_ingot` 1 |

#### Metallurgy 합금 노선은 일부러 남깁니다

```
createmetallurgy:alloying/bronze    조건 없음 — 지금도 살아 있습니다
   용융 구리 30mB + 용융 주석 10mB  →  용융 청동 40mB
   →  casting_in_table/bronze/ingot  →  청동 주괴
```

**부피비가 마침 3:1로 같아서 비율을 어기지 않습니다.** 주조 설비를 갖춘 플레이어에게 주는 다른 길로 둡니다.

`c:ingots/tin`을 채우는 순간 Metallurgy의 주석 라인 전체가 함께 열립니다. 용해·주조·기어·막대·판까지 딸려 오는데, 전부 자기가 만든 주석을 되돌리는 것이라 문제가 없습니다.

### FE — 알터네이터에서 가스 터빈으로

#### 왜 갈아타는가

| | 출력 | 대가 |
| --- | --- | --- |
| 알터네이터 (황동 64 RPM) | 90 FE/t | **응력** |
| 알터네이터 (강철 128 RPM) | 180 FE/t | **응력** |
| 가스 터빈 | 128 FE/t | **LPG** — 상압증류 부산물 |

계산식은 `RPM / 256 × fe_at_max_rpm(480) × generator_efficiency(0.75)` 입니다.

숫자만 보면 강철 티어 알터네이터가 앞섭니다. 하지만 **그 180은 응력 예산을 깎아먹는 180**입니다. RPM과 SU가 티어로 묶인 팩에서는 회전축을 건드리지 않는 128이 더 낫습니다.

#### 터빈은 증기로도 돕니다

```
petrochem:turbine_fuel/lpg     LPG   1mB / 10틱
petrochem:turbine_fuel/steam   증기 500mB / 1틱
petrochem:mixing/steam         물 100mB → 증기 1000mB   (믹서 + Heated)
```

물만 있으면 정유소 없이도 터빈이 돕니다. **막지 않습니다.** 소모량이 LPG의 **5,000배**라 터빈 하나를 계속 돌리려면 믹서를 수십 대 붙여야 하고, 그 응력과 열도 다 내야 합니다.

정유소를 세우기 전에 터빈을 미리 켜 볼 수 있는 고통스러운 부트스트랩 경로로 남겨 둡니다.

#### LPG는 윤활유와 경합합니다

```
mixing/basic_deasphalting    중유 300 + LPG 50  →  아스팔트 2 + 윤활유 100
```

**윤활유의 유일한 생산 경로이고 LPG를 먹습니다.** 그런데 소형·중형 엔진 둘 다 윤활유를 요구합니다. LPG 한 통을 터빈에 태울지 윤활유로 바꿀지 고르게 됩니다.

### Crafts & Additions 정리

제거 목록입니다.

| ID | 이유 |
| --- | --- |
| `createaddition:mechanical_crafting/electric_motor` | FE를 회전으로 되돌립니다. 이 팩에서 회전은 회전으로 얻습니다 |
| `createaddition:crafting/rolling_mill` | Vintage 벨트 그라인더와 역할이 겹칩니다 |
| `createaddition:crafting/connector` | 배선은 PIPEZ에 맡깁니다 |
| `createaddition:crafting/small_light_connector` | 〃 |
| `createaddition:crafting/large_connector` | 〃 |
| `createaddition:crafting/redstone_relay` | 〃 |
| `createaddition:crafting/barbed_wire` | 〃 |
| `createaddition:crafting/portable_energy_interface` | 〃 |
| `createaddition:mixing/bioethanol` | 에탄올 노선을 접습니다 |
| `createaddition:mixing/biomass_from_honeycomb` | 〃 |
| `createaddition:compacting/seed_oil` | 〃 |
| `createaddition:crafting/spool` | 스풀 다섯 종을 전부 접습니다 |
| `createaddition:crafting/copper_spool` | 〃 |
| `createaddition:crafting/gold_spool` | 〃 |
| `createaddition:crafting/electrum_spool` | 〃 |
| `createaddition:crafting/festive_spool` | 〃 |

#### 바이오매스를 막는 지렛대는 씨앗 기름입니다

바이오매스 여덟 갈래가 **전부** `c:plantoil` 100mB를 요구합니다. 벌집 레시피도 예외가 아닙니다.

```
c:plantoil = createaddition:seed_oil   (이 모드만 채웁니다)
seed_oil 을 만드는 레시피 = createaddition:compacting/seed_oil   단 하나
```

**`compacting/seed_oil` 하나만 지우면 여덟 갈래가 동시에 죽습니다.** 벌집과 에탄올을 따로 지우는 것은 JEI에서 이유를 분명히 하려는 것이지 그것들이 지렛대라서가 아닙니다.

씨앗 기름이 사라지면 액체 블레이즈 버너의 `liquid_burning/plantoil`도 함께 죽습니다. 디젤·가솔린·크레오소트·용암이 남으므로 실질 손해는 없습니다.

#### 스풀은 다섯 종을 전부 접습니다

커넥터와 전기 모터가 사라지면 스풀 대부분이 갈 곳을 잃습니다. 남아 있던 소비처 둘도 황동 시대에서 이미 뗐습니다.

| 소비처 | 처리 | 어디서 |
| --- | --- | --- |
| 교류발전기 | 구리 스풀 → 황동 판 | 황동 시대 |
| 테슬라 코일 | 구리 스풀 → `#c:ingots/brass` | 황동 시대 |
| 커넥터 3종 · 중계기 · 철조망 · 휴대용 인터페이스 | 제작법 제거 | 이 시대 |
| 전기 모터 | 제작법 제거 | 이 시대 |

그래서 다섯 종을 전부 지웁니다.

```
createaddition:crafting/spool
createaddition:crafting/copper_spool
createaddition:crafting/gold_spool
createaddition:crafting/electrum_spool
createaddition:crafting/festive_spool
```

> **`createmetallurgy:tungsten_wire_spool` 은 이름만 같은 별개입니다.**
> 전구 16종이 전부 이것을 요구합니다. 스풀을 하나만 남기지 않기 위해 이것도 지우되,
> 전구가 대신 텅스텐 주괴를 바로 받게 했습니다. 시대 진행과 무관한 정리라
> `kubejs/server_scripts/metallurgy_light_bulbs.js` 에 따로 둡니다.

`createaddition:crafting/modular_accumulator` 는 남아 있습니다.

### Petrochem 설비

원본은 대부분 강철 판과 주괴만 요구해 황동 시대 끝에 다 열려 버립니다. **강철 케이싱과 강철 티어 축**을 끼워 이 시대의 물건으로 만듭니다.

#### 펌프잭 팔

배치는 원본 그대로 두고 축과 오른쪽 끝만 올립니다. 7×2 기계식 제작입니다.

```
S S S S S S C
H . I A I . .
```

| | |
| --- | --- |
| S | `#c:plates/steel` |
| C | `kubejs:steel_casing` |
| H | `minecraft:chain` |
| I | `#c:ingots/steel` |
| A | `createtiers:shaft_steel` |

#### 펌프잭 크랭크

회전 속도 제어기를 심어 속도를 다루는 기계임을 재료로 드러냅니다.

```
S C S      S = #c:plates/steel
S R S      C = kubejs:steel_casing
S C S      R = create:rotation_speed_controller
```

#### 강철 유체관

원본 둘(가로·세로)을 하나로 합치고 한 번에 넷이 나오게 합니다.

```
. S .      S = #c:plates/steel
. I .      I = #c:ingots/steel
. S .      →  petrochem:steel_fluid_pipe ×4
```

#### 증류탑 제어기

**청동을 요구하므로 주석을 뚫어야 손이 닿습니다.**

```
. B .      B = #c:plates/bronze
P C P      P = petrochem:steel_fluid_pipe
S B S      C = kubejs:steel_casing
           S = #c:plates/steel
```

#### 강철 펌프

```
createtiers:cogwheel_steel 1 + petrochem:steel_fluid_pipe 1   (무형 조합)
```

#### 소형 엔진

```
B L B      B = #c:plates/bronze
A C A      L = petrochem:lubricant_bucket
S S S      A = createtiers:shaft_steel
           C = kubejs:steel_casing
           S = #c:plates/steel
```

#### 중형 엔진 (디젤 엔진)

```
. C .      C = kubejs:steel_casing
B L B      B = #c:plates/bronze
K K K      L = petrochem:lubricant_bucket
           K = #c:storage_blocks/steel
```

**이 엔진들은 Create의 동력 축을 씁니다.** Create Tiers의 티어 축과 맞물리게 하는 것이 `createtiersenginecompat`입니다. 그 모드가 없으면 강철 축을 물릴 수 없습니다.

#### 기존 레시피를 유지하는 것들

| 블록 | 요구 | 열리는 시점 |
| --- | --- | --- |
| 펌프잭 유정 | 강철 판 · 강철 유체관 | 황동 시대 끝 |
| 강철 유체 탱크 | 강철 판 · 나무통 | 황동 시대 끝 |
| **전해조** | 강철 판 2 · 구리 너깃 2 · 기계식 믹서 · 아연 주괴 | 황동 시대 끝 |
| 증류 출력구 | 강철 판 · 강철 유체관 | 황동 시대 끝 |
| 강철 유체 밸브 | 강철 판 · 강철 유체관 | 황동 시대 끝 |
| 플레어스택 | + **청동 판** | 산업 시대 |
| 스마트 유체관 | + **청동 판** · 전자관 | 산업 시대 |
| **가스 터빈** | + **청동 판 2** · 프로펠러 3 | 산업 시대 |

**전해조가 강철만으로 열리는 것은 의도입니다.** 전해조를 먼저 손에 넣고 알터네이터로 돌리다가, 청동을 뚫으면 가스 터빈으로 갈아타는 구간이 생깁니다.

#### 개발용 잔재 제거

```
제거   petrochem:distilling/test
```

입력 유체 `gearbox:petroleum`을 가진 모드가 팩에 없어 쓸 수도 없고 로그만 더럽힙니다.

### 황 — 정유소의 곁가지

**미구현.** 설계만 되어 있습니다.

바닐라 백포트가 `minecraft:sulfur`와 전용 동굴 바이옴(`minecraft:sulfur_caves`)을 들고 왔는데 팩 안에서 완전히 고립돼 있습니다. 태그에도 안 들어가 있고 가공 경로도 없어 순수 건축 블록입니다.

반대로 **Vintage의 황 화학은 사슬이 완성돼 있는데 재료가 없습니다.** 아수린과 스코리아를 분쇄할 때 부산물로 조금 나오는 것이 전부입니다.

**둘을 잇습니다.**

```
minecraft:sulfur        → 분쇄 → vintageimprovements:sulfur
minecraft:potent_sulfur → 분쇄 → 더 많이     (황 5개를 압축한 블록)
minecraft:sulfur_spike  → 조합 → minecraft:sulfur ×4   (바닐라 백포트 원본)
```

그러면 굶고 있던 사슬이 살아납니다.

```
c:gems/sulfur ─[가압 · 가열 600틱]→ 이산화황 1,000mB
이산화황 250 + c:nuggets/iron ─[가압]→ 삼산화황 250
삼산화황 1,000 ─[가압]→ 황산 1,000
```

**황 하나가 황산 1,000mB입니다.**

#### 왜 산업 시대인가

정유는 원래 황을 다루는 일입니다. Petrochem이 `desulfurized_heavy_diesel` · `desulfurized_heavy_naphta` · `desulfurized_kerosene` 셋을 **등록만 해 두고 레시피를 비워 둔 것**도 그 자리입니다.

황 동굴을 이 시대에 열면 **정유소를 세우는 시점과 황을 다루기 시작하는 시점이 겹칩니다.** 주제가 맞습니다.

그리고 황산 자체는 이 시대에서도 쓸 데가 있습니다.

```
황산 200 + 물 200 + 구리 주괴 ─[가압]→ vintageimprovements:copper_sulfate
```

**본격적인 소비처는 원자력 시대입니다.** 우라늄 재정제가 배치마다 황산 1,000mB를 먹습니다. 자세한 것은 [QUEST_ATOMIC_AGE.md](QUEST_ATOMIC_AGE.md)를 보십시오.

#### 죽은 아이템 하나를 같이 살립니다

`petrochem:sulfur_dust`는 만드는 레시피가 없고 유일한 소비처도 `petrochem_expert` 조건이라 꺼져 있습니다. 이것을 `c:dusts/sulfur`에 넣으면 Vintage가 준비해 둔 호환 레시피가 켜집니다.

```json
// pressurizing/compat/sulfur_dioxide_from_dust.json
"conditions": [{ "not": { "tag_empty": "c:dusts/sulfur" } }]
```

**태그가 비어 있지 않으면 저절로 켜지는 레시피입니다.** 다른 모드 황을 받아 줄 문을 Vintage가 미리 열어 둔 셈입니다.

#### 남겨 둔 것

`desulfurized_*` 셋에 레시피를 넣어 **정제 과정에서 황이 나오게** 만들 수도 있습니다. 실제 수첨탈황이 그 공정이고요. 다만 그러려면 수소가 필요한데 수소는 원자력 시대에서 되살립니다. **지금은 황을 캐는 것으로만 둡니다.**

### 공허 강철 — 결승선

#### 주괴

원본은 **네더라이트 주괴**를 요구했습니다. 네더라이트는 이 팩의 진행 축과 상관이 없으므로 강철과 등유로 바꿉니다.

```
제거   createutilities:mixing/void_steel_ingot
제거   createmetallurgy:alloying/void_steel        (용융 네더라이트를 요구합니다)
추가   kubejs:pressurizing/void_steel_ingot
```

| | |
| --- | --- |
| 기계 | Vintage 가압기 |
| 열 | Heated |
| 입력 | 엔더 진주 1 + `#c:ingots/steel` 1 + `petrochem:kerosene` 1000mB |
| 시간 | 200틱 |
| 출력 | `createutilities:void_steel_ingot` 1 |

**등유는 상압증류에서만 나옵니다.** 정유소를 세워야 공허 강철에 닿습니다.

#### 주조와 용해

Metallurgy에 같은 것이 이미 있지만 `c:ingots/void_steel` 태그가 비어 있어 꺼져 있습니다. 태그를 채우면 너깃·막대·기어까지 한꺼번에 열리므로 **주괴와 판만 직접 씁니다.**

| 방향 | 입력 | 출력 |
| --- | --- | --- |
| 주조 (60틱) | 용융 공허 강철 90mB + 거푸집 | 공허 강철 주괴 / 판 |
| 용해 (40틱, Heated) | 공허 강철 주괴 / 판 | 용융 공허 강철 90mB |

거푸집은 두 등급을 **둘 다 직접 씁니다.**

```
createmetallurgy:graphite_<shape>_mold        남습니다
kubejs:refractory_mortar_<shape>_mold         mold_consumed — 한 번에 사라집니다
```

> **`molds.js`에 맡기면 안 됩니다.**
> 그쪽은 `event.forEachRecipe`로 Metallurgy 주조 레시피를 훑어 내화 판본을 만드는데, **`forEachRecipe`는 데이터팩 원본만 돌고 KubeJS가 같은 이벤트에서 추가한 것은 보지 못합니다.** 파일 이름 순서와 무관하게 안 잡힙니다.

#### 공허 케이싱

이 시대의 결승선입니다. 원본은 주괴를 얹었는데 **판**으로 올려 압착을 한 번 더 거치게 합니다.

```
제거   createutilities:item_application/void_casing
추가   kubejs:item_application/void_casing
```

```
minecraft:obsidian 에 createutilities:void_steel_sheet 를 우클릭
```

---

## 알려진 문제

**선택 퀴스트 `0102 Hydrogen` · `0103 Oxygen` 은 지금 완료할 수 없습니다.**

```
electrolyzing/water_electrolysis
  조건: mod_loaded "petrochem_expert"   <- 팩에 없으므로 비활성
```

수소·산소를 내는 유일한 레시피가 꺼져 있고, 팩 안에 소비처도 하나 없습니다.

**원자력 시대에서 되살립니다.** 산소가 우라늄 농축의 재료가 되므로 챕터는 그대로 두고, 그때까지는 미완료로 남습니다. 상세는 [QUEST_ATOMIC_AGE.md](QUEST_ATOMIC_AGE.md) 를 보십시오.

## 다음 시대로 넘긴 것

- **공허 강철 티어(256 RPM / 67108864 SU).** `tiers.js`에 등록만 되어 있고 부품 제작법이 없습니다. 원자력 시대에서 엽니다.
- **Petrochem 탈황 유체 셋** (`desulfurized_heavy_diesel` 등). 등록만 되어 있고 레시피가 전혀 없습니다. 원유 정제 부산물로 황이 나오는 구조를 짜 넣을 자리가 통째로 비어 있습니다.
- **`petrochem:sulfur_dust`.** 만드는 레시피가 없고 유일한 소비처도 `petrochem_expert` 모드가 있어야 켜집니다. 지금은 죽은 아이템입니다.

## 밸런스

수치 조정은 릴리즈 후 의견을 모아 진행합니다.

| 항목 | 값 |
| --- | --- |
| 티어 승급 | 황동 부품 1 + 강철 판 1 |
| 주석 너깃 | 아연 너깃 1 + 진한 물약 25mB (가압 100틱, Heated) |
| 청동 주괴 | 구리 3 + 주석 주괴 1 (혼합, Heated) |
| 청동 1개당 주석 너깃 | **9개** |
| 가스 터빈 | 128 FE/t · LPG 1mB/10틱 |
| 공허 강철 주괴 | 엔더 진주 1 + 강철 1 + 등유 1000mB (가압 200틱) |

**청동 하나에 주석 너깃 아홉이 들어갑니다.** 주석 너깃은 아연 너깃 하나와 진한 물약 25mB에서 하나씩 나오므로, 청동 주괴 하나는 아연 너깃 아홉과 물약 225mB입니다. 이 시대에서 가장 무거운 병목이고 의도한 것입니다.

한 번 정유소를 세우고 나면 등유는 계속 나옵니다. 고통은 일회성이고 끝에 공허 케이싱이 옵니다.

## 참고 자료

- [QUEST_BRASS_AGE.md](QUEST_BRASS_AGE.md) — 이전 시대
- [README.md](README.md) — 시대 구분과 동력 계보
- `kubejs/startup_scripts/tiers.js` — 티어 등록
- `kubejs/server_scripts/molds.js` — 내화 거푸집 자동 생성
- `config/petrochem-common.toml` — 가스 터빈 출력
- `config/createaddition-common.toml` — FE 환율과 알터네이터 효율
