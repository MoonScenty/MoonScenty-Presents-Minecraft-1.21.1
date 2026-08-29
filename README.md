# MoonScenty Presents Minecraft 1.21.1

Minecraft 1.21.1과 NeoForge 21.1.248를 기반으로 제작한 모드팩입니다. packwiz를 사용해 모드와 설정을 관리합니다.

현재 버전은 **0.2.0a**입니다. Create 기술 시대 다섯이 모두 들어간 첫 알파 릴리즈이며, 변경 내역은 [CHANGELOG.md](CHANGELOG.md)에 있습니다.

## 모드팩 콘셉트

바닐라 마인크래프트의 기본 진행 방식은 가능한 한 유지하면서, Create를 중심으로 한 Expert 스타일의 기술 발전을 제공합니다. 플레이어는 다섯 개의 기술 시대를 순서대로 거치며 새로운 재료, 기계와 생산 방식을 확보하게 됩니다. 다섯 시대는 한 줄로 이어지며 마지막은 궁극 케이싱입니다.

기술 축 바깥에는 건축, 전투, 모험과 마법 콘텐츠를 폭넓게 함께 담았습니다. 이쪽은 진행을 강제하지 않는 선택 콘텐츠이며, 플레이어가 기술 진행에 지치면 언제든 다른 방향으로 놀 수 있게 하는 것이 목적입니다.

### 모드 조정 방침

모드마다 손을 대는 정도를 다르게 가져갑니다.

| 분류 | 조정 방침 |
| --- | --- |
| **Create와 그 확장** | Expert 방식으로 전면 재구성합니다. 제작법, 시대 게이팅과 RPM 요구를 직접 설계합니다. |
| **물류 및 기술 모드** | 일부를 Create 진행에 종속시킵니다. 규모가 큰 모드는 별도의 퀘스트 챕터로 분리해 다룹니다. |
| **건축, RPG, 전투, 모험, 마법** | **별도의 트윅을 하지 않습니다.** 모드 개발자가 의도한 그대로 두고, 퀘스트로 소개만 합니다. |

### 핵심 설계 원칙

- 바닐라의 기본 생존 및 진행 구조는 웬만하면 변경하지 않습니다.
- 시대를 건너뛰는 것은 어렵게 만들되, 다음 시대에 진입하면 이전 시대의 자원과 부품은 더 쉽게 생산할 수 있어야 합니다.
- 시대 진행은 퀘스트 보상이 아닌 제작법과 생산 설비의 발전으로 이루어집니다.
- 실제 진행 제한과 레시피 조정은 KubeJS로 구현합니다.
- 기술 축에 참여하지 않는 모드는 조정하지 않습니다. 밸런스가 어긋나 보여도 해당 모드의 설계를 존중합니다.
- 전기는 핵심 동력원으로 사용하지 않으며 Create의 회전력을 중심으로 모든 산업을 구성합니다.
- 일부 전기 장치는 Create Crafts & Additions를 통해 제한적으로만 허용합니다.

### 기술 시대

| 시대 | 주요 콘텐츠 | 동력 및 진행 목표 |
| --- | --- | --- |
| **Stone Age (석기 시대)** | Create: Metallurgy | 원시적인 자원 가공과 야금으로 안산암 합금 생산 기반을 준비합니다. 동력은 손 크랭크와 손 톱니바퀴까지만 다룹니다. |
| **Andesite Alloy Age (안산암 합금 시대)** | 기본 Create 기계, Create Tiers, Create: Rubberworks, Create Mechanical Extruder | 안산암 합금 티어(32 RPM / 1024 SU) 안에서 기계식 자원 생산 설비를 구축합니다. 러닝머신으로 손 크랭크를 벗어나고, 압착기와 구리 판을 거쳐 고무와 화로 엔진에 도달합니다. 황동 케이싱을 손에 넣는 것이 결승선입니다. |
| **Brass Age (황동 시대)** | Vintage Improvements, Create Tiers, Create: AE Generator, Create Crafts & Additions | 황동 티어(64 RPM / 2048 SU)를 해금하고 Vintage의 가공 기계 사슬을 세웁니다. 화로 엔진에서 히트싱크를 떼면 이 티어를 그대로 채웁니다. 커빙 프레스와 테슬라 코일이 AE2의 회로 인쇄기와 충전기를 대신하며 AE Generator로 AE 전력의 문이 열립니다. 강철 케이싱을 손에 넣는 것이 결승선입니다. |
| **Industrial Age (산업 시대)** | Create: Petrochem, Applied Energistics 2, Create Utilities J, Create Tiers | 강철 티어(128 RPM / 4096 SU)를 해금합니다. 강철은 이미 손에 있으므로 진짜 관문은 **청동**이고, 청동은 주석을 요구합니다. 주석을 뚫으면 정유소가 열리고 FE 발전이 교류발전기에서 가스 터빈으로 넘어갑니다. 공허 케이싱을 손에 넣는 것이 결승선입니다. |
| **Atomic Age (원자력 시대)** | Create: Atomic | 공허 강철 티어(256 RPM)를 엽니다. 우라늄 정제에 **산소와 황산을 쓰는 재정제 사이클**을 넣어 앞선 시대의 전해조와 가압기를 다시 돌립니다. 원자로를 세워 증기 터빈으로 SU 를 내고, 마지막에는 다섯 시대의 케이싱을 모아 **궁극 케이싱**을 만듭니다. |

### 레시피와 동력 설계

#### 동력 계보

동력은 손 크랭크에서 시작해 한 줄로 이어집니다. 앞 단계를 세우지 않으면 다음 단계에 닿을 수 없습니다.

| 단계 | 동력원 | 시대 | 출력 | 유지 조건 |
| --- | --- | --- | --- | --- |
| 1 | 손 크랭크 | 석기 | — | 잡고 있어야 함 |
| 2 | 손 톱니바퀴 | 석기 말 | — | 잡고 있어야 함 |
| 3 | 러닝머신 | 안산암 초 | 32 RPM / 512 SU | 동물이 걸어야 함 |
| 4 | 화로 엔진 (히트싱크) | 안산암 말 | 32 RPM / 1024 SU | 연료 |
| 5 | 화로 엔진 (히트싱크 없음) | 황동 | 64 RPM / 2048 SU | 연료 |
| 6 | Petrochem 소형 · 중형 엔진 | 산업 | 강철 티어까지 | 디젤 · 가솔린 |
| 7 | 증기 터빈 (원자로) | 원자력 | 터빈당 2 SU/RPM | 연료봉과 냉각수 |

물레방아, 대형 물레방아와 풍차 베어링은 놓고 잊는 공짜 동력이므로 제작법을 제거했습니다. 돛과 돛 틀은 남기되 퀘스트에서 장식용임을 밝힙니다.

증기 기관도 제작법을 제거했습니다. 보일러가 유체 탱크를 키우는 만큼 출력이 올라 이후 시대의 요구까지 한 번에 덮어 버리기 때문입니다.

**화로 엔진 하나가 두 시대를 덮습니다.** 옆에 구리 블록을 붙이면 32 RPM / 1024 SU로 떨어지고, 떼면 64 RPM / 2048 SU를 냅니다. 두 값이 안산암 티어와 황동 티어의 상한과 정확히 같습니다. 티어를 올리기 전에는 히트싱크를 붙여 부품이 터지지 않게 하고, 황동 부품을 갖춘 뒤에 떼어 전력을 두 배로 씁니다.

값은 `config/createfurnaceengine-common.toml`에서 관리합니다.

```
baseRpm     = 64    heatSinkRpm      = 32
baseSuPerRpm = 32   heatSinkSuPerRpm = 32
heatSinkBlock = "minecraft:copper_block"
```

강철 티어가 128 RPM이므로 화로 엔진으로는 닿지 않습니다. **산업 시대의 동력은 Petrochem의 소형 · 중형 엔진입니다.** 둘 다 Create의 동력 축을 쓰므로 티어 축과 맞물리게 하려면 `Create Tiers: Engine Compat`이 필요합니다. 직접 만들어 팩에 넣었습니다.

**원자력 시대의 동력은 증기 터빈입니다.** 원자로 면에 붙여 노심의 열을 회전력으로 바꿉니다. 공허 강철 티어가 256 RPM이고, 이 티어부터는 응력 상한이 사실상 없습니다.

#### FE는 곁가지로 둡니다

FE는 회전력을 대신하지 않습니다. 팩 안에서 FE를 실제로 소비하는 것은 **전해조 · 테슬라 코일 · 레이저** 셋뿐입니다.

| 발전 | 시대 | 출력 | 대가 |
| --- | --- | --- | --- |
| 교류발전기 | 황동 | 90 FE/t (64 RPM) | 응력 |
| 교류발전기 | 산업 | 180 FE/t (128 RPM) | 응력 |
| 가스 터빈 | 산업 | 128 FE/t | LPG (상압증류 부산물) |

숫자만 보면 강철 티어 교류발전기가 앞서지만 **그 180은 응력 예산을 깎아먹는 180**입니다. 회전축을 건드리지 않는 128이 더 낫습니다.

**배선은 하지 않습니다.** Crafts & Additions의 커넥터 계열과 전기 모터를 전부 지우고 원거리 전송은 PIPEZ에 맡깁니다. 스풀 여섯 종도 함께 지웠습니다.

#### 동력 부품 티어

Create Tiers로 시대별 회전 속도 상한과 최대 응력을 나눕니다. 티어 이름은 재질을 그대로 씁니다.

| 티어 | 시대 | 최대 RPM | 최대 SU |
| --- | --- | --- | --- |
| Andesite Alloy | 안산암 합금 | 32 | 1,024 |
| Brass | 황동 | 64 | 2,048 |
| Steel | 산업 | 128 | 4,096 |
| Void Steel | 원자력 | 256 | 67,108,864 |

바닐라 축과 톱니바퀴는 제작법을 지웠습니다. 같은 재료와 같은 공정으로 티어 부품이 나오며, 다음 시대의 부품은 이전 시대 부품에 그 시대의 재료를 얹어 승급합니다. 등록은 `kubejs/startup_scripts/tiers.js`에 있습니다.

레시피마다 최소 회전 속도를 요구하는 체계는 직접 만드는 `Create: Recipe Need RPM`으로 구현할 계획이며 **아직 모드팩에 포함하지 않았습니다.** 최소 속도에 못 미치면 처리가 느려지는 것이 아니라 아예 시작하지 않고, 같은 입력에 여러 판본이 있으면 현재 속도를 넘지 않는 것 중 가장 높은 쪽이 선택되는 구조를 목표로 합니다.

다만 **Vintage Improvements는 이미 자기 기계에 최소 RPM을 걸고 있습니다.** 원심분리는 레시피마다 값을 두며 기본값이 100입니다. 티어 상한과 어긋나면 그 시대에서 기계가 아예 돌지 않으므로, 시대별로 값을 맞춰 줍니다. 황동 시대는 64, Comb Block처럼 뒤로 미룰 것만 128을 씁니다.

#### 재료 게이팅

**케이싱이 시대를 나눕니다.** 원목에서 바로 만드는 경로와 주조 경로를 모두 막고, 케이싱마다 그 시대에만 얻을 수 있는 판을 우클릭하도록 바꿨습니다.

| 케이싱 | 시대 | 만드는 법 |
| --- | --- | --- |
| 안산암 케이싱 | 석기 (결승선) | 야금 공정으로 얻은 안산암 합금 |
| 구리 케이싱 | 안산암 합금 | 벗긴 원목에 구리 판 |
| 방수 구리 케이싱 | 안산암 합금 | 구리 케이싱에 고무 판 |
| 황동 케이싱 | 안산암 합금 (결승선) | 벗긴 원목에 유령 들린 황동 판 |
| 강철 케이싱 | 황동 (결승선) | 안산암 케이싱에 강철 판 |
| 공허 케이싱 | 산업 (결승선) | 흑요석에 공허 강철 판 |
| **궁극 케이싱** | 원자력 (결승선) | 케이싱 다섯 종 + 플루토늄 (조합기) |

방수 구리 케이싱과 강철 케이싱, 궁극 케이싱, 유령 들린 황동 판은 이 모드팩이 추가한 것입니다. 구리 판은 압착기를, 유령 들린 황동 판은 인케이스드 팬을, 강철 판은 황동 시대의 가공 사슬 전체를 요구하므로 케이싱 하나가 그 시대의 관문이 됩니다.

**궁극 케이싱만 성격이 다릅니다.** 다음 시대가 없으므로 관문이 아니라 도착점입니다. 앞선 다섯 종을 전부 모으고 한가운데에 플루토늄을 놓아야 하며, 플루토늄은 원자로를 실제로 돌려야만 나옵니다. 쓸 데는 천사의 반지 하나뿐입니다.

그 밖의 게이팅입니다.

- 초기에는 내구도 16의 막자사발로 철·구리·금·아연·울프라마이트 원광을 광물 부스러기로 수동 가공합니다. 광물 손해가 나지만 용해로에 바로 넣을 수 있습니다.
- 기계식 분쇄에는 다른 금속의 부스러기가 낮은 확률로 섞여 나옵니다. 한 종류만 캐도 다른 금속이 조금씩 쌓입니다.
- 다음 시대에 진입하면 이전 시대 재료의 생산량을 높이거나 제작 공정을 단순화합니다.
- Create Mechanical Extruder는 안산암 합금 시대(황동 판본은 황동 시대), Create Utilities J는 산업 시대에 해금합니다.
- **AE 전력은 Create 회전력으로만 만듭니다.** `config/ae2-common.toml`의 `[powerRatios] forgeEnergy`를 `1.0E-9`로 내려 두어 다른 모드의 발전기를 물려도 AE가 차지 않습니다. Create: AE Generator의 운동 에너지 수용기가 유일한 입구입니다.

### 퀘스트 구성

퀘스트는 기능을 직접 해금하는 수단이 아니라 플레이어에게 목표와 진행 방향을 알려주는 안내 장치로 사용합니다.

챕터는 여섯 개의 그룹으로 나눠 배치합니다. 현재 18개 챕터에 퀘스트 869개가 들어 있습니다.

| 그룹 | 챕터 | 퀘스트 | 내용 |
| --- | --- | --- | --- |
| **시작하기** | 환영합니다 | 2 | 첫 접속 안내 |
| | 튜토리얼 | 263 | 첫 원목부터 엔더 드래곤과 에필로그까지 |
| | 꿀팁과 노하우 | 56 | 알려주지 않으면 발견할 수 없는 것들 |
| **기술 시대** | 석기 시대 | 26 | 야금과 안산암 케이싱 |
| | 안산암 합금 시대 | 56 | 기계식 생산 설비와 황동 케이싱 |
| | 황동 시대 | 69 | Vintage 가공 사슬과 강철 케이싱 |
| | 산업 시대 | 51 | 주석과 청동, 정유소와 공허 케이싱 |
| | 원자력 시대 | 42 | 우라늄 재정제와 원자로, 궁극 케이싱 |
| **물류** | Applied Energistics 2 | 39 | 저장망과 자동 제작 |
| | 저장과 운반 | 39 | 서랍, 가방, 파이프와 운송 |
| **생활과 탐험** | 요리와 식탁 | 26 | 조리 기구와 주방 설비 |
| | 양봉과 벌통 | 30 | Productive Bees |
| | 모험과 구조물 | 38 | 던전, 구조물과 전리품 |
| | 황혼의 숲 | 38 | 보스 순서를 따르는 진행 |
| | 건축과 장식 | 33 | 건축 도구와 장식 블록 |
| **마법** | Iron's Spells 'n Spellbooks | 32 | 주문 학파와 마법 전투 |
| | Forbidden and Arcanus | 29 | 의식과 마법 재료 |
| **도전** | 챌린지 미션 | — | 미작성 |

기술 시대 챕터만 진행을 안내하는 사슬이고, 나머지는 해당 모드의 존재와 진입점을 알리는 평면 목록에 가깝습니다.

**다섯 시대가 한 줄로 이어집니다.** 각 시대의 마지막 퀘스트가 다음 시대의 첫 퀘스트를 열며, 마지막은 궁극 케이싱입니다.

#### 아이템 이름 표기 규칙

퀘스트 본문에 아이템을 적을 때는 **인게임에 실제로 표시되는 이름을 그대로 씁니다.**

- 해당 모드에 한국어 번역이 있으면 그 번역을 따릅니다. 예를 들어 Inscriber는 `회로 인쇄기`, Fluix Crystal은 `액정 수정`, ME Controller는 `ME 제어기`입니다.
- 번역이 없으면 **영문 이름을 그대로 적습니다.** Productive Bees처럼 한국어가 아예 없는 모드는 `Honey Treat`, `Advanced Oak Beehive`처럼 씁니다.

임의로 번역해 적으면 플레이어가 JEI에서 검색해도 찾지 못합니다. 새 퀘스트를 쓰기 전에 해당 모드 jar의 `lang/ko_kr.json` 유무를 먼저 확인하세요.

굵은 글씨는 마크다운이 아니라 마인크래프트 서식 코드를 씁니다. `&l`로 시작해 `&r`로 되돌립니다.

마인크래프트 튜토리얼 퀘스트의 세부 구조와 구현 현황은 [QUEST_TUTORIAL.md](QUEST_TUTORIAL.md)에서 관리합니다. 실제 퀘스트는 `Tutorial` 단일 챕터의 큰 진행도로 구성하며 게임 내 기본 문구는 영어로 작성합니다.

Create 기술 시대는 시대별로 설계 문서를 나눠 관리합니다. 문서에는 퀘스트 구성뿐 아니라 그 시대에 손대는 레시피 명세가 함께 들어 있습니다.

| 시대 | 문서 | 상태 |
| --- | --- | --- |
| 석기 시대 | [QUEST_STONE_AGE.md](QUEST_STONE_AGE.md) | 레시피·퀘스트 구현 완료 |
| 안산암 합금 시대 | [QUEST_ANDESITE_ALLOY_AGE.md](QUEST_ANDESITE_ALLOY_AGE.md) | 레시피·퀘스트 구현 완료 |
| 황동 시대 | [QUEST_BRASS_AGE.md](QUEST_BRASS_AGE.md) | 레시피·퀘스트 구현 완료 |
| 산업 시대 | [QUEST_INDUSTRIAL_AGE.md](QUEST_INDUSTRIAL_AGE.md) | 레시피·퀘스트 구현 완료 |
| 원자력 시대 | [QUEST_ATOMIC_AGE.md](QUEST_ATOMIC_AGE.md) | 레시피·퀘스트 구현 완료 |

그 밖의 문서입니다.

| 문서 | 다루는 것 |
| --- | --- |
| [QUEST_TUTORIAL.md](QUEST_TUTORIAL.md) | 바닐라 튜토리얼 퀘스트라인의 장 구분과 구현 기준 |
| [QUEST_TIPS_AND_TRICKS.md](QUEST_TIPS_AND_TRICKS.md) | 진행도와 무관한 꿀팁 목록 |
| [PUFFISH_SKILLS.md](PUFFISH_SKILLS.md) | 네 갈래 스킬 트리와 노드 240개 |
| [CHANGELOG.md](CHANGELOG.md) | 릴리즈별 변경 기록 |

다른 모드팩의 구조를 훑어둔 조사 기록입니다. 이 팩에 넣는 모드가 아니며, 시대를 나누는 방식을 참고하려고 정리한 것입니다.

| 문서 | 보는 것 |
| --- | --- |
| [NOTE_MEKANISM_ORE_PROCESSING.md](NOTE_MEKANISM_ORE_PROCESSING.md) | 사슬이 **길이**로 자라는 방식. 티어마다 앞에 단계가 붙고 화학물질이 설비를 끌고 옵니다 |
| [NOTE_GREGTECH_AGE.md](NOTE_GREGTECH_AGE.md) | 티어가 **너비**로 자라는 방식. 전압 · 온도 · 구조물 세 겹으로 잠겁니다 |
| [NOTE_ENIGMATICA2_EXPERT.md](NOTE_ENIGMATICA2_EXPERT.md) | 팩 전체가 **격자**가 되는 방식. 티어마다 갈림길을 놓고 끝에서 다시 만납니다 |
| [NOTE_REGROWTH.md](NOTE_REGROWTH.md) | **평판 누적**으로 잠그는 방식. 퀴스트를 깨면 평판이 쌓이고 그것이 모드 전체를 엽니다 |

기술 시대 외의 챕터는 아직 별도 설계 문서를 두지 않고 챕터 파일에서 바로 관리합니다.

### 향후 확장

탐험 쪽은 YUNG's 계열 구조물 모드 13종과 Dungeon Crawl을 넣어 한 차례 넓혔습니다. 앞으로 더 추가하는 모험 모드의 아이템도 같은 원칙을 따릅니다. **기술 시대의 필수 진행 재료로는 쓰지 않고**, 퀘스트라인의 특별 보상이나 성취감을 주는 보상으로만 씁니다.

**기술 축은 다섯 시대가 모두 끝났습니다.** 석기에서 원자력까지 레시피와 퀘스트가 다 들어갔습니다. 남은 것은 **챌린지 미션 챕터**뿐입니다.

## 모드 목록 (279개)

각 모드는 주된 역할과 **조정 방침**을 기준으로 분류했습니다. 여러 기능을 가진 모드는 모드팩에서 가장 크게 활용되는 분류에 배치했습니다.

### 직접 만든 모드

필요한 기능이 기존 모드에 없어 직접 작성한 Create 애드온입니다. 저장소는 따로 두고 빌드한 jar만 팩에 넣습니다.

| 모드 | 팩 포함 | 하는 일 |
| --- | --- | --- |
| Create: Hand Cogwheel | 포함 | 손 크랭크의 수동 입력과 톱니바퀴의 회전 전달을 한 블록에 합칩니다. 석기 시대의 유일한 동력 전달 수단입니다. |
| Create: Furnace Engine | 포함 | 구버전 Create의 화로 엔진을 되살립니다. 안산암 합금 시대의 마지막 동력원입니다. |
| Create Tiers: Engine Compat | 포함 | Create의 동력 축을 쓰는 엔진들이 Create Tiers의 티어 축을 받아들이게 합니다. Petrochem 엔진을 쓰려면 필요합니다. |
| Create: Recipe Need RPM | 개발 중 | 가공 레시피에 최소 회전 속도 조건을 붙입니다. |
| Create: Mob Masher | 개발 중 | 회전력으로 몹을 처리해 전리품을 얻습니다. |

### 핵심 콘텐츠 및 대형 시스템 (7개)

- **Create** — 회전력, 톱니바퀴, 컨베이어와 움직이는 구조물을 이용한 기계식 자동화를 추가합니다. 이 모드팩 기술 축의 중심입니다.
- **Applied Energistics 2** — 아이템과 유체를 디지털 네트워크에 저장하고 자동화하는 대규모 물류 시스템을 추가합니다.
- **Quark** — 바닐라 분위기를 유지하면서 건축, 탐험, 자동화와 편의 기능을 다양하게 확장합니다.
- **Farmer's Delight** — 새로운 작물, 조리 도구, 음식과 농사 중심의 생활 콘텐츠를 추가합니다.
- **The Twilight Forest** — 보스와 던전으로 구성된 대형 모험 차원을 추가합니다.
- **Iron's Spells 'n Spellbooks** — 주문서와 마법 학파를 갖춘 본격적인 마법 전투 시스템을 추가합니다.
- **Forbidden and Arcanus** — 어두운 분위기의 마법 재료, 의식과 장비를 추가합니다.

### Create 생산·기술 확장 (20개)

Expert 방식으로 전면 재구성하는 대상입니다.

- **Create Crafts & Additions** — 전기 모터, 발전기, 전선 및 추가 자동화 장치를 더합니다.
- **Create Low-Heated** — 수동 가열을 연료가 필요한 기본 버너로 대체하고 저온 가열 단계를 추가합니다.
- **Create Mechanical Extruder** — 유체와 블록 조건을 조합해 자원을 생산하는 압출기를 추가합니다.
- **Create Tiers** — Create 장치에 여러 성능 등급과 업그레이드 요소를 추가합니다.
- **Create Tiers: Engine Compat** — 증기 기관과 Petrochem 엔진이 Create Tiers의 티어 축을 받아들이게 합니다. 티어별 동력 축을 더합니다. 직접 제작했습니다.
- **Create Ultimine** — Create 관련 블록을 일괄 채굴할 수 있게 합니다.
- **Create Utilities J** — Create 자동화와 건축에 활용하는 편의 장치와 부품을 추가합니다.
- **Create: AE Generator** — Create의 회전력을 Applied Energistics 2 네트워크용 에너지로 바꿉니다.
- **Create: Atomic** — 원자력·에너지 관련 콘텐츠와 생산 과정을 추가합니다.
- **Create: Dragons Plus** — 새로운 기계 장치, 재료, 유체 처리와 자동화 콘텐츠를 확장합니다.
- **Create: Enchantment Industry** — 액체 경험치와 인쇄 공정으로 마법 부여를 자동화합니다.
- **Create: Furnace Engine** — 옛 Create의 화로 엔진을 되살립니다. 화로를 열원으로 회전력을 생산하며 히트싱크로 출력을 낮춰 연료를 아낄 수 있습니다. 직접 제작했습니다.
- **Create: Hand Cogwheel** — 손 크랭크의 수동 입력과 톱니바퀴의 회전 전달을 합친 블록입니다. 직접 제작했습니다.
- **Create: Integrated Farming** — Create 장치와 연계되는 농업 기계와 작물 자동화를 추가합니다.
- **Create: Metallurgy** — 금속을 녹이고 주조하는 Create 기반 야금 생산 체계를 추가합니다.
- **Create: Petrochem** — 원유 정제, 석유화학 물질과 관련 자동화 공정을 추가합니다.
- **Create: Rubberworks** — 고무 생산과 가공을 Create 기계로 자동화합니다.
- **Create: Transmission!** — 회전력을 전달하고 분배하는 추가 동력 장치를 제공합니다.
- **Create: Treadmill** — 몹이 러닝머신을 움직여 회전력을 생산하게 합니다.
- **Create: Vintage Improvements** — 벨트 그라인더, 스프링 코일링 기계, 진공실, 진동대, 원심분리기, 커빙 프레스와 레이저 등 구버전 Create 계열 가공 기계를 되살립니다. 황동 시대의 중심입니다.

### Create 철도·건축·장식 (6개)

- **Create Deco** — Create 분위기의 장식 블록, 금속 블록과 건축 요소를 추가합니다.
- **Create: Bells & Whistles** — 열차를 꾸미는 장식, 차체 부품과 철도 블록을 추가합니다.
- **Create: Blocks & Bogies** — 열차용 추가 보기와 건축·장식 블록을 제공합니다.
- **Create: Copycats+** — 다른 블록의 외형을 입힐 수 있는 카피캣 블록을 추가합니다.
- **Create: Nowheel** — 열차의 바퀴 표시와 외형을 조정할 수 있게 합니다.
- **Rechiseled: Create** — Rechiseled에 Create 스타일 장식 블록과 연동을 추가합니다.

### 요리 자동화 연동 (3개)

- **Create Slice & Dice** — Farmer's Delight의 도마와 요리 과정을 Create 기계로 자동화합니다.
- **Create: Bitterballen** — Create 방식으로 제작하고 자동화하는 음식과 생산 과정을 추가합니다.
- **Create: Central Kitchen** — Create와 요리 모드를 연결해 음식 생산을 자동화합니다.

### 기술 및 물류 (11개)

일부를 Create 진행에 종속시키는 대상입니다. 규모가 큰 모드는 별도 퀘스트 챕터로 다룹니다.

- **Pipez** — 아이템과 유체를 운송하는 파이프와 속도·필터 업그레이드를 추가합니다.
- **LaserIO** — 레이저로 아이템, 유체와 에너지를 원거리 전송하는 물류 시스템을 추가합니다.
- **Functional Storage** — 한 종류를 대량으로 담는 서랍형 저장 블록을 추가합니다.
- **Uppers** — 아이템을 위로 올리는 장치를 추가합니다.
- **Trash Cans** — 아이템, 유체와 에너지를 버리는 쓰레기통을 추가합니다.
- **Simple Magnets** — 주변 아이템을 끌어오는 자석을 추가합니다.
- **Applied Energistics 2 Wireless Terminals** — AE2 터미널의 무선 버전을 추가합니다.
- **AEInfinityBooster** — AE2에 무한 범위 카드와 차원 카드를 추가합니다.
- **Polymorphic Energistics** — AE2와 다른 에너지 체계 사이의 변환을 지원합니다.
- **Cognition (Experience Obelisk)** — 경험치를 저장하고 가공하는 장치를 추가합니다.
- **Productive Bees** — 자원을 생산하는 벌과 벌통 자동화를 추가합니다.

### 저장 및 인벤토리 (6개)

- **Sophisticated Backpacks** — 업그레이드, 자동 정리와 필터를 갖춘 확장형 가방을 추가합니다.
- **Sophisticated Storage** — 업그레이드와 필터를 갖춘 상자, 통 및 저장 블록을 추가합니다.
- **Sophisticated Core** — Sophisticated 계열 모드의 공통 기반을 제공합니다.
- **Sophisticated Backpacks Create Integration** — 가방과 Create 물류 장치의 연동을 제공합니다.
- **Sophisticated Storage Create Integration** — 저장 블록과 Create 물류 장치의 연동을 제공합니다.
- **Akashic Tome** — 여러 모드의 가이드북을 한 권으로 합칩니다.

### 모험 및 탐험 (22개)

별도 트윅 없이 모드 개발자의 의도대로 둡니다.

- **When Dungeons Arise - Forge!** — 대형 구조물과 로그라이크 던전을 세계에 추가합니다.
- **Dungeon Crawl** — 여러 층으로 이어지는 대형 지하 던전을 생성합니다. Roguelike Dungeons의 후속입니다.
- **Unusual End** — 엔드 차원에 새로운 지형, 구조물과 콘텐츠를 추가합니다.
- **YUNG's Better Dungeons** — 바닐라 던전을 여러 방과 통로를 갖춘 구조물로 교체합니다.
- **YUNG's Better Mineshafts** — 폐광을 더 크고 다채로운 형태로 교체합니다.
- **YUNG's Better Strongholds** — 요새를 층과 구획이 나뉜 구조물로 교체합니다.
- **YUNG's Better Desert Temples** — 사막 사원에 넓은 지하 구조를 더합니다.
- **YUNG's Better Jungle Temples** — 정글 사원을 함정과 통로가 있는 구조로 교체합니다.
- **YUNG's Better Witch Huts** — 늪지 오두막을 지하까지 확장합니다.
- **YUNG's Better Ocean Monuments** — 해저 신전의 규모와 내부 구조를 확장합니다.
- **YUNG's Better Nether Fortresses** — 네더 요새를 더 크고 복잡한 형태로 교체합니다.
- **YUNG's Better End Island** — 엔드 본섬의 지형과 구조를 확장합니다.
- **YUNG's Better Caves** — 바닐라 동굴을 더 넓고 다양한 형태로 다시 생성합니다.
- **YUNG's Cave Biomes** — 동굴에 고유한 생물 군계를 추가합니다.
- **YUNG's Bridges** — 협곡과 강을 잇는 다리를 세계에 생성합니다.
- **YUNG's Extras** — 우물, 오두막 같은 작은 구조물을 곳곳에 추가합니다.
- **Lootr (Forge & NeoForge)** — 전리품 상자를 플레이어별로 분리해 멀티플레이에서 공평하게 만듭니다.
- **Waystones** — 지역을 오가는 순간이동 거점을 추가합니다.
- **Explorer's Compass** — 원하는 구조물의 위치를 찾아주는 나침반을 추가합니다.
- **Nature's Compass** — 원하는 생물 군계의 위치를 찾아주는 나침반을 추가합니다.
- **OpenBlocks Elevator** — 위아래로 즉시 이동하는 승강기 블록을 추가합니다.
- **Vanilla Backport** — 최신 버전의 바닐라 요소를 이 버전으로 가져옵니다.

### 전투, RPG 및 장신구 (11개)

별도 트윅 없이 모드 개발자의 의도대로 둡니다.

- **Pufferfish's Skills** — 스킬 트리 체계를 제공합니다. 채굴, 전투, 생활, 탐험 네 갈래를 직접 작성해 넣었습니다.
- **Apothic Attributes** — 치명타, 흡혈, 회피, 방어 관통과 재사용 대기시간 감소 등 RPG 능력치 25종과 확인용 화면을 추가합니다.
- **Additional Attributes** — Iron's Spells 'n Spellbooks의 주문 계열과 등급을 능력치로 다룰 수 있게 하고 낚시와 수확 관련 능력치를 더합니다.
- **Relics** — 고유 능력을 지닌 유물 장비와 강화 요소를 추가합니다.
- **Artifacts** — 탐험으로만 얻을 수 있는 특수 능력 장비를 추가합니다.
- **Reliquified Artifacts** — Relics와 Artifacts를 연결해 유물을 강화할 수 있게 합니다.
- **Charm of Undying** — 불사의 토템을 장신구 슬롯에 착용할 수 있게 합니다.
- **Angel Ring** — 착용 시 비행할 수 있는 반지를 추가합니다.
- **Passive Shield** — 방패를 들지 않아도 일정 조건에서 막을 수 있게 합니다.
- **Responsive Shields** — 방패의 반응 속도와 판정을 개선합니다.
- **Enhanced Boss Bars** — 보스 체력 표시줄을 모드별로 구분해 보여줍니다.

### 건축 및 장식 (17개)

별도 트윅 없이 모드 개발자의 의도대로 둡니다.

- **Chipped** — 바닐라 블록의 변형 장식 블록을 대량으로 추가합니다.
- **Chisel Reborn** — 끌로 블록을 다양한 무늬로 가공할 수 있게 합니다.
- **Rechiseled** — 하나의 재료를 다양한 무늬와 형태의 장식 블록으로 가공합니다.
- **Rechiseled: Chipped** — Rechiseled와 Chipped의 블록을 서로 연동합니다.
- **FramedBlocks** — 다른 블록의 외형을 입히는 다양한 형태의 골조 블록을 추가합니다.
- **Handcrafted** — 의자, 식탁 등 생활감 있는 가구를 추가합니다.
- **MrCrayfish's Furniture Mod: Refurbished** — 주방, 욕실과 전자기기를 포함한 가구 세트를 추가합니다.
- **Supplementaries** — 표지판, 등불, 장식 소품 등 생활 밀착 블록을 다수 추가합니다.
- **Domum Ornamentum** — 재료를 조합해 만드는 건축용 변형 블록을 추가합니다.
- **Factory Blocks** — 공장풍 산업 건축 블록을 추가합니다.
- **Connected Glass** — 서로 이어지는 텍스처의 유리 종류를 추가합니다.
- **Simply Light** — 단순하고 깔끔한 조명 블록을 추가합니다.
- **Immersive Paintings** — 직접 만든 그림을 액자로 걸 수 있게 합니다.
- **Amendments** — 바닐라 블록의 배치와 상호작용을 세밀하게 다듬습니다.
- **Building Gadgets** — 넓은 범위를 한 번에 짓고 복사하는 건축 도구를 추가합니다.
- **Construction Sticks** — 바라보는 면을 따라 블록을 이어 붙이는 건축 막대를 추가합니다.
- **Build Guide** — 원, 구 같은 도형의 안내선을 화면에 투영합니다.

### Farmer's Delight 확장 (16개)

Farmer's Delight를 기반으로 작물, 요리와 조리 기구를 넓히는 애드온 묶음입니다. 요리 콘텐츠는 「요리와 식탁」 챕터에서 다룹니다.

- **Expanded Delight** — 아스파라거스, 고구마, 고추 등 작물과 조리법을 넓혀 진행 자체를 확장합니다.
- **Fruits Delight** — 과일 나무와 잼, 젤리를 추가하고 가마솥으로 가공하는 공정을 제공합니다.
- **Veggies Delight** — 피망, 브로콜리, 마늘, 순무 등 채소 작물과 채식 요리를 추가합니다.
- **Rustic Delight** — 여러 색의 피망과 커피 디저트를 비롯한 농가풍 요리를 추가합니다.
- **Crabber's Delight** — 게, 새우, 조개와 오징어 다리 같은 어패류와 해산물 요리를 추가합니다.
- **Ocean's Delight** — 가디언과 대구, 오징어를 재료로 쓰는 해양 요리를 추가합니다.
- **My Nether's Delight** — 네더 작물과 블레이저 조리 기구, 네더 재료 요리를 추가합니다.
- **Ender's Delight** — 코러스와 셜커를 재료로 쓰는 요리와 엔드스톤 화덕을 추가합니다.
- **Twilight's Flavors & Delight** — 트와일라잇 포레스트 재료 요리와 스스로 가열하는 불꽃 냄비를 추가합니다.
- **Miner's Delight +** — 동굴 당근과 구리 냄비를 추가하고 채굴 중에 쓰는 신속 물약 요리를 제공합니다.
- **Barbeque's Delight** — 석쇠와 재료 대야로 꼬치와 바비큐를 굽는 조리 라인을 추가합니다.
- **Dumplings Delight Rewrapped** — 속 재료에 따라 종류가 나뉘는 만두 요리를 추가합니다.
- **Corn Delight** — 옥수수 작물과 팝콘, 나초, 콘도그 같은 가공 식품을 추가합니다.
- **Brewin' And Chewin'** — 발효 통과 가열 통으로 맥주와 술을 담그고 마시면 효과를 주는 콘텐츠를 추가합니다.
- **More Delight** — 나이프와 토스트, 파스타 등 일상적인 요리를 폭넓게 추가합니다.
- **Display Delight** — 완성한 요리를 접시에 담아 블록으로 전시할 수 있게 합니다.

### 생활 및 농사 (8개)

- **Cooking for Blockheads** — 요리책과 다중 블록 주방을 추가해 만들 수 있는 요리만 보여줍니다.
- **Farming for Blockheads** — 상인과 시장으로 작물과 동물을 손쉽게 구할 수 있게 합니다.
- **Spice of Life: Carrot Edition** — 서로 다른 음식을 먹을수록 최대 체력이 늘어납니다. 20단계에 걸쳐 400종을 먹으면 하트 20개가 추가되어 최대 30개가 됩니다.
- **Comforts** — 침낭과 해먹으로 휴대성과 시간 넘기기를 제공합니다.
- **Etched** — 직접 만든 음악 디스크와 재생 장치를 추가합니다.
- **Simple Hats** — 착용 가능한 모자 장식을 추가합니다.
- **Fast Leaf Decay** — 원목을 벤 뒤 잎이 빠르게 사라지게 합니다.
- **No Farmland Trample** — 농지가 밟혀 망가지지 않게 합니다.

### 퀘스트 및 멀티플레이 (13개)

- **FTB Quests (NeoForge)** — 진행 목표, 보상과 안내를 제공하는 퀘스트 시스템을 추가합니다.
- **FTB Library (NeoForge)** — FTB 계열 모드의 화면, 설정 및 공통 기능을 제공합니다.
- **FTB XMod Compat** — FTB Quests와 KubeJS, 필터 시스템 등 외부 모드의 연동을 활성화합니다.
- **FTB Filter System** — 태그와 논리 조건을 조합한 아이템 필터를 제공합니다.
- **FTB Chunks (NeoForge)** — 청크 소유권과 보호, 강제 로딩과 지도 기능을 제공합니다.
- **FTB Teams (NeoForge)** — 팀 구성과 팀 단위 데이터 공유를 제공합니다.
- **FTB Ranks (NeoForge)** — 플레이어 등급별 권한과 명령어 범위를 설정합니다.
- **FTB Essentials (Forge & Fabric)** — 홈, 스폰 이동과 텔레포트 요청 등 편의 명령어를 제공합니다.
- **FTB Ultimine (NeoForge)** — 키를 누른 채 같은 블록을 한 번에 채굴할 수 있게 합니다.
- **FTB Backups 2** — 월드를 주기적으로 자동 백업합니다.
- **More Quest Types** — 블록 파괴·설치, 길들이기, 낚시와 거래 같은 행동 목표를 추가합니다.
- **Quests Kill Task Tweaks** — 퀘스트의 처치 목표 판정 방식을 조정합니다.
- **Certain Questing Additions** — FTB Quests 화면의 시각적 표현을 개선합니다.

### 스크립팅 및 모드팩 제작 (10개)

- **KubeJS** — JavaScript로 레시피, 아이템, 태그와 게임 이벤트를 수정할 수 있게 합니다.
- **Almost Unified** — 여러 모드가 중복으로 추가하는 금속과 자원을 하나로 묶어 레시피가 같은 태그를 바라보게 합니다.
- **KubeJS Create** — KubeJS에서 Create의 가공 레시피와 기능을 제어합니다.
- **KubeJS Additions** — KubeJS에 추가 유틸리티와 기능을 더합니다.
- **KubeJS Curios** — KubeJS에서 Curios 장신구 슬롯을 다룰 수 있게 합니다.
- **KubeJS Rechiseled** — KubeJS에서 Rechiseled 블록 그룹을 정의할 수 있게 합니다.
- **LootJS: KubeJS Addon** — 전리품 테이블을 스크립트로 수정할 수 있게 합니다.
- **MoreJS** — 거래, 번식 등 추가 게임 요소를 스크립트로 다룰 수 있게 합니다.
- **Ponder for KubeJS** — 스크립트로 Create의 Ponder 안내 장면을 만들 수 있게 합니다.
- **Rhino** — KubeJS가 JavaScript를 실행하기 위해 사용하는 스크립트 엔진입니다.

### JEI 및 레시피 조회 (9개)

- **Just Enough Items (JEI)** — 아이템 목록과 제작법·사용처를 게임 안에서 확인할 수 있게 합니다.
- **Just Enough Resources (JER)** — JEI에 광물 분포와 몹 전리품 정보를 추가합니다.
- **Just Enough Professions (JEP)** — JEI에 주민 직업 정보를 추가합니다.
- **Just Enough Breeding (JEBr)** — JEI에 동물 번식 조건을 추가합니다.
- **Just Enough Archaeology** — JEI에 고고학 발굴 결과를 추가합니다.
- **Just Enough Effect Descriptions (JEED)** — JEI에 상태 효과 설명을 추가합니다.
- **Moderately Enough Effect Descriptions (MEED)** — 상태 효과 설명 표시를 보완합니다.
- **AE2 JEI Integration** — AE2 터미널과 JEI를 연동합니다.
- **Polymorph (Fabric/Forge/Quilt)** — 같은 재료로 여러 결과가 나올 때 원하는 레시피를 선택합니다.

### UI 및 편의 기능 (44개)

- **Jade 🔍** — 바라보는 블록이나 엔티티의 이름, 상태와 저장 정보를 표시합니다.
- **Jade Addons (Neo/Forge)** — Jade가 여러 모드의 블록 정보를 표시하도록 지원합니다.
- **Xaero's Minimap** — 웨이포인트와 주변 정보를 보여주는 미니맵을 추가합니다.
- **Xaero's World Map** — 탐사한 지형을 전체 지도로 확인할 수 있게 합니다.
- **Controlling** — 키 설정 화면에서 단축키를 검색할 수 있게 합니다.
- **Mouse Tweaks** — 드래그와 휠로 인벤토리를 빠르게 정리할 수 있게 합니다.
- **Inventory Essentials** — 인벤토리 아이템 이동과 정리를 위한 조작을 추가합니다.
- **Inventory Sorter** — 클릭 한 번으로 인벤토리를 정렬합니다.
- **Crafting Tweaks** — 제작 격자를 회전하거나 비우는 조작을 추가합니다.
- **AppleSkin** — 허기, 포만도와 음식 정보를 화면에 표시합니다.
- **Colorful Hearts** — 여러 줄이던 체력 표시를 한 줄로 압축해 보여줍니다.
- **Max Health Fix** — 최대 체력 변화가 잘못 저장되는 문제를 고칩니다.
- **Tooltip Overhaul** — 아이템 툴팁의 외형을 다듬고 장식 테두리를 제공합니다.
- **Clean Tooltips** — 툴팁 표시를 간결하게 정리합니다.
- **Better Advanced Tooltips** — F3+H 고급 툴팁에 아이템 ID, 태그와 데이터 구성 요소를 함께 표시합니다. 레시피 작업에 씁니다.
- **Enchantment Descriptions** — 마법 부여 책과 장비 툴팁에 효과 설명을 표시합니다.
- **Tips** — 로딩 화면과 게임 중에 유용한 정보를 보여줍니다.
- **More Overlays Updated** — 몹 생성 가능 구역과 청크 경계 등을 화면에 표시합니다.
- **FindMe** — 상자 안에서 찾는 아이템의 위치를 표시합니다.
- **Corpse** — 사망 지점에 시체를 남겨 아이템을 원래 슬롯으로 회수하게 합니다.
- **Cosmetic Armor Reworked** — 실제 방어구와 별개인 외형 전용 슬롯을 추가합니다.
- **Immersive UI** — 화면 전환에 애니메이션 효과를 적용합니다.
- **FancyMenu** — 메인 메뉴와 게임 화면을 자유롭게 꾸밀 수 있게 합니다.
- **Fancy Toasts | Better Advancements** — 알림에 유형별 테마와 효과음을 적용합니다.
- **Advancement Disabler** — 바닐라 발전 과제를 비활성화해 진행 안내를 퀘스트로 통합합니다.
- **Not Enough Recipe Book [NERB]** — 바닐라 레시피북을 제거해 제작법 확인을 JEI로 통합합니다.
- **Default Options** — 신규 설치에 적용할 기본 설정과 단축키를 배포합니다.
- **Resource Pack Overrides** — 포함된 리소스팩의 활성 상태와 순서를 관리합니다.
- **Chat Heads** — 채팅 메시지 옆에 플레이어 얼굴을 표시합니다.
- **Emojiful** — 채팅에서 이모지를 사용할 수 있게 합니다.
- **What Are They Up To (Watut)** — 다른 플레이어가 무엇을 하는 중인지 표시합니다.
- **Korean Chat Patch** — 한글 조합과 한·영 전환을 개선합니다.
- **BetterF3** — 디버그 화면을 읽기 쉬운 구조로 교체합니다.
- **Ding (Forge)** — 게임과 월드 로딩이 끝나면 소리로 알립니다.
- **AmbientSounds 6** — 지형과 상황에 맞는 환경음을 추가합니다.
- **Extreme sound muffler** — 원하는 소리를 선택적으로 줄일 수 있게 합니다.
- **Torchmaster** — 넓은 범위의 몹 생성을 막는 특수 조명을 추가합니다.
- **Clean Swing Through Grass** — 풀 대신 몹을 정확히 때리게 합니다.
- **Faster Ladder Climbing** — 사다리를 더 빠르게 오를 수 있게 합니다.
- **NetherPortalFix** — 네더 차원문 연결이 어긋나는 문제를 줄입니다.
- **Yeetus Experimentus** — 실험적 설정 경고 화면을 제거합니다.
- **Disable Compliance Notification** — 대한민국 사용자에게 표시되는 이용 시간 알림을 비활성화합니다.
- **NeoAuth** — 서버 접속 시 비밀번호 인증을 제공합니다.
- **Login Protection** — 접속 직후 일정 시간 피해를 받지 않게 보호합니다.

### 그래픽·셰이더·애니메이션 (11개)

- **Iris Shaders** — Sodium 환경에서 셰이더팩을 사용할 수 있게 합니다.
- **Iris & Oculus Flywheel Compat** — Iris 셰이더와 Create의 Flywheel 렌더링 호환성을 제공합니다.
- **Fusion (Connected Textures)** — 붙어 있는 블록의 텍스처를 자연스럽게 연결합니다.
- **[EMF] Entity Model Features** — 리소스팩에서 커스텀 엔티티 모델을 쓸 수 있게 합니다.
- **[ETF] Entity Texture Features** — 엔티티의 무작위·발광 텍스처 같은 고급 기능을 지원합니다.
- **Not Enough Animations** — 3인칭 시점의 플레이어 동작 애니메이션을 표시합니다.
- **Hold My Items - Reforged** — 1인칭 시점에서 손과 들고 있는 아이템을 표시하고 동작 애니메이션을 더합니다.
- **playerAnimator** — 모드가 플레이어 애니메이션을 재생하기 위한 기반을 제공합니다.
- **Sodium/Embeddium Dynamic Lights** — 손에 든 발광 아이템이 주변을 밝히게 합니다.
- **Create: Dynamic Lights** — Create의 조명 부품이 움직이는 구조물에서도 작동하게 합니다.
- **FlickerFix** — 조명이 깜빡이는 현상을 완화합니다.

### 성능 최적화 (19개)

- **Sodium** — 렌더링 엔진을 최적화해 프레임과 그래픽 성능을 개선합니다.
- **Reese's Sodium Options** — Sodium 설정 화면을 보기 쉬운 구조로 개선합니다.
- **ModernFix** — 로딩 시간, 메모리와 여러 병목을 개선하는 종합 최적화 모드입니다.
- **FerriteCore ((Neo)Forge)** — 블록 상태와 모델 데이터의 메모리 사용량을 줄입니다.
- **Entity Culling Fabric/Forge** — 보이지 않는 엔티티의 렌더링을 생략합니다.
- **ImmediatelyFast** — 즉시 모드 렌더링을 최적화합니다.
- **BadOptimizations** — 렌더링 이외의 영역을 최적화합니다.
- **FastSuite** — 레시피 조회를 다중 스레드로 처리합니다.
- **FastBoot** — 게임 시작 시간을 단축합니다.
- **FPS Reducer** — 조작이 없을 때 자원 사용을 줄입니다.
- **Better Fps - Render Distance** — 더 세밀한 렌더 거리 설정을 제공합니다.
- **fix GPU memory leak** — 그래픽 메모리 누수를 완화합니다.
- **Server Performance - Smooth Chunk Save** — 청크 저장을 분산해 끊김을 줄입니다.
- **Clumps** — 가까운 경험치 구슬을 합쳐 부하를 줄입니다.
- **AI Improvements** — 몹 인공지능 연산을 최적화합니다.
- **spark** — 성능을 측정하고 병목을 분석하는 도구를 제공합니다.
- **Create Better FPS** — Create의 움직이는 장치 렌더링을 최적화합니다.
- **Create: Threaded Trains** — 열차 연산을 최적화해 복잡한 철도망의 성능을 개선합니다.
- **FTB Quests Optimizer** — FTB Quests의 성능 문제를 개선합니다.

### 기반 라이브러리 (46개)

- **Architectury API** — 여러 모드 로더를 지원하는 모드의 공통 기반입니다.
- **Accessories** — 데이터 기반의 확장 가능한 장신구 시스템을 제공합니다.
- **Athena** — 여러 모드가 공유하는 모델 로더를 제공합니다.
- **AttributeFix** — 바닐라가 능력치에 걸어 둔 상한과 하한을 넓혀 다른 모드의 능력치 증가가 잘리지 않게 합니다.
- **bad packets** — 모드 간 패킷 통신을 지원합니다.
- **Balm** — Blay 계열 모드의 기반 라이브러리입니다.
- **Blueprint** — Abnormals 계열 모드의 기반 라이브러리입니다.
- **Bookshelf** — 여러 모드가 설정과 공통 코드를 공유하는 기반입니다.
- **Cloth Config API** — 설정 화면을 만들기 위한 공통 API입니다.
- **Collective** — Serilum 계열 모드의 공통 코드입니다.
- **Delight Lib** — Farmer's Delight 확장 모드들이 공유하는 공통 기능을 제공합니다.
- **CoroUtil** — CoroUtil 계열 모드의 기반 유틸리티입니다.
- **CreativeCore** — CreativeMD 계열 모드의 기반 라이브러리입니다.
- **Cryonic Config** — 설정 관리를 위한 경량 라이브러리입니다.
- **Cupboard** — 여러 모드가 사용하는 설정과 유틸리티를 제공합니다.
- **Curios API** — 장신구 슬롯 체계를 제공하는 표준 라이브러리입니다.
- **Framework** — MrCrayfish 계열 모드의 기반 라이브러리입니다.
- **Fzzy Config** — 설정 화면과 동기화를 제공하는 라이브러리입니다.
- **GeckoLib** — 복잡한 모델 애니메이션을 재생하기 위한 라이브러리입니다.
- **GuideME** — 모드가 게임 내 가이드북을 제공할 때 사용하는 기반입니다.
- **HaydenAPI** — 일부 모드가 공유하는 공통 코드입니다.
- **iChunUtil** — iChun 계열 모드의 기반 라이브러리입니다.
- **Iron's Lib** — Iron's 계열 모드의 기반 라이브러리입니다.
- **Konkrete** — Keksuccino 계열 모드의 기반 라이브러리입니다.
- **Kotlin for Forge** — Kotlin으로 작성된 모드를 실행하기 위한 언어 지원입니다.
- **Lodestone** — Malum 계열 모드의 파티클과 렌더링 기반을 제공합니다.
- **Mechanicals Lib** — 여러 Create 애드온이 공유하는 코드입니다.
- **Melody** — FancyMenu 계열의 오디오 재생 기반입니다.
- **Moonlight Lib** — Supplementaries 계열 모드의 기반 라이브러리입니다.
- **Mysterious Mountain Lib** — Fruits Delight 등이 사용하는 공통 기능을 제공합니다.
- **oωo (owo-lib)** — UI와 설정을 위한 공통 라이브러리입니다.
- **Placebo** — Shadows_of_Fire 계열 모드의 공통 코드입니다.
- **Platform** — 여러 로더를 함께 지원하기 위한 라이브러리입니다.
- **PolyLib** — Polymorphic 계열 모드의 기반 라이브러리입니다.
- **Prickle** — Darkhax 계열 모드의 경량 기반 라이브러리입니다.
- **Resourceful Lib** — Team Resourceful 모드의 기반 라이브러리입니다.
- **Searchables** — 검색과 자동 완성 기능을 제공하는 라이브러리입니다.
- **ShatterLib | OctoLib** — OctoStudios 계열 모드가 공유하는 코드입니다.
- **SuperMartijn642's Config Lib** — SuperMartijn642 계열의 설정 라이브러리입니다.
- **SuperMartijn642's Core Lib** — SuperMartijn642 계열의 핵심 라이브러리입니다.
- **TerraBlender** — 여러 모드의 생물 군계를 바닐라 세계 생성에 충돌 없이 섞어 넣습니다.
- **Titanium** — Team Rats 계열 모드의 기반 라이브러리입니다.
- **Valhelsia Core** — Valhelsia 계열 모드의 기반 라이브러리입니다.
- **Flight API** — 비행 능력을 다루는 모드가 공유하는 API입니다.
- **YUNG's API** — YUNG's 계열 구조물 모드가 공유하는 기반 라이브러리입니다.
- **Zeta** — Quark이 사용하는 모듈형 기반 라이브러리입니다.

## 기본 리소스팩

리소스팩은 아래 순서로 겹쳐 적용되며, 아이템 텍스처를 교체하는 팩은 포함하지 않습니다.

1. **Mc둥근모**
   - 공식 Neo둥근모를 사용해 한글을 선명한 도트 글꼴로 표시합니다.
2. **Slightly Improved Font**
   - 바닐라 감각을 유지한 32× 영문·유럽 문자 글꼴을 적용합니다. Mc둥근모의 공급자 순서와 조합되어 한글에는 영향을 주지 않습니다.
3. **Fresh Animations: Extensions**
   - 몹의 세부 모델과 표정, 화살통, 발광 효과를 보강하고 상자·보트·광산 수레 같은 오브젝트에 생동감 있는 동작을 추가합니다.
4. **Fresh Animations**
   - 바닐라 몹의 외형 감각은 유지하면서 움직임과 표정을 마인크래프트 트레일러처럼 풍부하게 만듭니다.
5. **Fresh Animations: Player Extension**
   - 플레이어의 대기, 이동, 점프, 수영, 등반, 비행과 장비 사용 동작을 Fresh Animations 스타일로 확장합니다. 플레이어 모델(`player.jem`)을 정의하는 유일한 팩입니다.
6. **Icon Fresh**
   - Xaero's Minimap의 몹 아이콘을 Fresh Animations 감각에 맞춘 형태로 교체합니다. Icon Xaero's와 겹치는 아이콘은 이쪽이 우선합니다.
7. **Icon Xaero's**
   - Xaero's Minimap의 엔티티와 웨이포인트 아이콘을 모드 전반에 걸쳐 대량으로 추가합니다.
8. **Enhanced Boss Bars**
   - 보스별로 구분되는 체력 표시줄 텍스처를 제공합니다. 같은 이름의 Enhanced Boss Bars 모드가 이 텍스처를 사용합니다.

Fresh Animations 계열 리소스팩은 이미 포함된 Entity Model Features 및 Entity Texture Features를 사용합니다. 아이템을 들고 먹거나 마시는 동작 등은 Not Enough Animations가, 1인칭 손 표시는 Hold My Items - Reforged가 보완합니다. 리소스팩은 CurseForge에 올라와 있는 것만 사용해 배포 경로를 하나로 유지합니다. 기본 활성화 순서는 Resource Pack Overrides의 `config/resourcepackoverrides.json`에서 관리합니다.

**플레이어 모델을 정의하는 팩은 하나만 유지합니다.** `player.jem`을 정의하는 팩을 둘 이상 켜면 우선순위가 높은 하나만 적용되고 나머지는 무시됩니다. 같은 이유로 Fresh Moves를 제외했습니다. Detailed Animations는 현재 EMF 버전에서 애니메이션 파싱에 실패해(`ASM animation was invalid`) 사용하지 않습니다.

## 기본 셰이더

Iris Shaders로 아래 세 종류를 제공하며 기본값은 **BSL**입니다. 활성 셰이더는 `config/iris.properties`의 `shaderPack` 항목에서 관리합니다.

- **BSL Shaders** — 기본값. 밝고 선명한 색감에 성능 부담이 비교적 낮습니다.
- **Complementary Shaders - Reimagined** — 바닐라 감성을 유지하면서 조명과 그림자를 다듬는 방향입니다.
- **Complementary Shaders - Unbound** — Reimagined보다 자유롭게 색감과 분위기를 바꾸는 방향입니다.

셰이더와 Create의 Flywheel 렌더링 호환은 Iris & Oculus Flywheel Compat이 담당합니다.

## 개발 및 관리

### 필요 환경

- Java 21
- packwiz
- Git

프로젝트 폴더에서 다음 명령이 실행되면 준비가 완료된 것입니다.

```powershell
packwiz help
```

### 기본 작업 순서

1. GitHub의 최신 변경 사항을 받습니다.
2. 모드를 추가·제거·업데이트하거나 설정 파일을 수정합니다.
3. `packwiz refresh`로 인덱스와 해시를 갱신합니다.
4. `git diff`로 의도한 파일만 변경됐는지 확인합니다.
5. CurseForge용 ZIP을 생성하고 새 프로필로 가져와 테스트합니다.
6. 테스트가 끝나면 변경 사항을 커밋합니다.

`CHANGELOG.md`는 **릴리즈마다 씁니다.** 0.2.0a 부터 기록하고 있습니다.

### 자주 사용하는 명령어

| 작업 | 명령어 |
| --- | --- |
| 등록된 모드 목록 확인 | `packwiz list` |
| CurseForge 모드 추가 | `packwiz curseforge add <이름·슬러그·URL>` |
| 모드 제거 | `packwiz remove` |
| 특정 모드 업데이트 | `packwiz update <이름>` |
| 모든 모드 업데이트 | `packwiz update --all` |
| 설정 및 스크립트 변경 반영 | `packwiz refresh` |
| CurseForge 배포 파일 생성 | `packwiz curseforge export -o <파일명.zip>` |

### 모드 추가

모드 이름, CurseForge 슬러그 또는 프로젝트 URL을 사용할 수 있습니다.

```powershell
packwiz curseforge add jade
```

추가가 끝나면 `mods/`에 `.pw.toml` 파일이 생성됩니다. 종속 모드가 함께 추가됐는지 확인한 뒤 게임을 실행해 호환성을 테스트합니다.

### 모드 제거 및 업데이트

목록에서 선택해 모드를 제거합니다.

```powershell
packwiz remove
```

특정 모드만 업데이트하거나 전체 모드를 업데이트할 수 있습니다.

```powershell
packwiz update sodium
packwiz update --all
```

전체 업데이트는 여러 모드의 버전을 한꺼번에 바꾸므로 별도 커밋에서 진행하고, 기존 월드 복사본으로 충분히 테스트하는 것을 권장합니다.

### 설정과 KubeJS 수정

다음 폴더의 파일을 직접 수정할 수 있습니다.

- `config/`: 클라이언트 및 공통 모드 설정
- `config/ftbquests/quests/`: FTB Quests 챕터, 의존 관계와 영어 문구
- `kubejs/client_scripts/`: 클라이언트 스크립트
- `kubejs/server_scripts/`: 레시피와 서버 동작 스크립트
- `kubejs/startup_scripts/`: 게임 시작 시 등록되는 콘텐츠 스크립트

수정 후에는 반드시 인덱스를 갱신합니다.

```powershell
packwiz refresh
```

### 테스트 및 배포

CurseForge 앱에서 가져올 수 있는 클라이언트용 ZIP을 생성합니다.

```powershell
packwiz curseforge export -o "MoonScenty-Presents-0.2.0a.zip"
```

정식 릴리즈가 아닌 테스트 빌드는 `output/모드팩이름-YYYY-MM-DD-HHmmss.zip` 형식으로 생성합니다.

```powershell
$buildDate = Get-Date -Format "yyyy-MM-dd-HHmmss"
packwiz curseforge export -o "output/MoonScenty Presents Minecraft 1.21.1-$buildDate.zip"
```

생성된 ZIP을 CurseForge 앱에서 새 프로필로 가져온 뒤 다음 항목을 확인합니다.

- 게임이 오류 없이 실행되는지
- 새 월드를 생성하고 다시 접속할 수 있는지
- JEI에서 레시피가 정상적으로 표시되는지
- Create 장치와 KubeJS 레시피가 정상적으로 작동하는지
- FTB Quests의 여섯 그룹 18개 챕터가 오류 없이 열리고 퀘스트 869개의 배치, 목표 판정과 의존 관계가 정상적으로 작동하는지
- 튜토리얼 챕터의 Deep Dark와 위더 구간이 에필로그 완료 전에는 숨겨지고 완료 후 각각 독립적으로 열리는지
- 스킬 창의 네 탭이 열리고 노드 240개의 능력치가 정상적으로 적용되는지
- Corpse가 일반 지형, 용암과 공허에서 사망 아이템을 정상적으로 보존하는지
- Sophisticated Backpack과 Cosmetic Armor 슬롯의 아이템이 사망 후 정상적으로 복구되는지
- 클라이언트 전용 모드 때문에 서버 실행이 실패하지 않는지

ZIP 파일은 `.gitignore`에 의해 Git에서 제외됩니다. 배포본은 저장소에 커밋하지 않고 GitHub Releases 또는 CurseForge에 업로드합니다.

### Git 커밋 규칙

커밋 메시지는 **한글 한 줄**로 쓰고, 무엇을 했는지 서술형으로 적습니다. `feat:` 같은 접두사는 쓰지 않습니다.

```powershell
git status
git diff
git add .
git commit -m "황동 시대 설계 문서를 작성"
```

모드 추가, 설정 변경, 전체 업데이트는 가능하면 서로 다른 커밋으로 나누어 기록합니다.
