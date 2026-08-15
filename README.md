# MoonScenty Presents Minecraft 1.21.1

Minecraft 1.21.1과 NeoForge 21.1.248를 기반으로 제작한 모드팩입니다. packwiz를 사용해 모드와 설정을 관리합니다.

## 모드팩 콘셉트

바닐라 마인크래프트의 기본 진행 방식은 가능한 한 유지하면서, Create를 중심으로 한 Expert 스타일의 기술 발전을 제공합니다. 플레이어는 다섯 개의 기술 시대를 순서대로 거치며 새로운 재료, 기계와 생산 방식을 확보하게 됩니다.

### 핵심 설계 원칙

- 바닐라의 기본 생존 및 진행 구조는 웬만하면 변경하지 않습니다.
- 시대를 건너뛰는 것은 어렵게 만들되, 다음 시대에 진입하면 이전 시대의 자원과 부품은 더 쉽게 생산할 수 있어야 합니다.
- 시대 진행은 퀘스트 보상이 아닌 제작법과 생산 설비의 발전으로 이루어집니다.
- 실제 진행 제한과 레시피 조정은 KubeJS로 구현합니다.
- 단계 시스템에 직접 참여하지 않는 모드는 특별한 이유가 없다면 별도로 조정하지 않습니다.
- 전기는 핵심 동력원으로 사용하지 않으며 Create의 회전력을 중심으로 모든 산업을 구성합니다.
- 일부 전기 장치는 Create Crafts & Additions를 통해 제한적으로만 허용합니다.

### 기술 시대

| 시대 | 주요 콘텐츠 | 동력 및 진행 목표 |
| --- | --- | --- |
| **Stone Age (석기 시대)** | Create: Metallurgy | 원시적인 자원 가공과 야금으로 안산암 합금 생산 기반을 준비합니다. Treadmill은 초기 회전력 생산 수단으로 활용하는 방향을 검토합니다. |
| **Andesite Alloy Age (안산암 합금 시대)** | 기본 Create 기계, Create Tiers, Create Mechanical Extruder | 기본적인 Create 자동화를 시작합니다. 낮은 RPM 범위만 사용할 수 있으며 기계식 자원 생산 설비를 구축합니다. |
| **Brass Age (황동 시대)** | Create: Vintage, Create Tiers, Create: AE Generator | 황동 기계와 중간 RPM 범위를 해금합니다. AE Generator를 만들 수 있게 되지만 Applied Energistics 2의 본격적인 사용은 다음 시대부터 가능합니다. |
| **Industrial Age (산업 시대)** | Create: Petrochem, Applied Energistics 2, Create Utilities J, Create Tiers | 석유와 유체를 사용하는 대규모 산업 시설을 구축하고 높은 RPM을 사용할 수 있습니다. AE2 저장망과 고급 물류도 이 시대부터 본격적으로 사용합니다. |
| **Atomic Age (원자력 시대)** | Create: Atomic | 최종 생산 체계를 구축하고 강력하거나 특별한 보상형 아이템을 대량 생산해 사용할 수 있습니다. |

### 레시피와 동력 설계

- Create의 기본 기계 제작법은 `Create: Recipe Need RPM`이 제공하는 RPM 요구 체계를 중심으로 재구성할 예정입니다.
- Create Tiers를 이용해 시대별로 사용할 수 있는 RPM 범위를 제한합니다.
- 다음 시대에 진입하면 이전 시대 재료의 생산량을 높이거나 제작 공정을 단순화합니다.
- Create: Rubberworks의 유체 관련 제작법에는 고무 계열 재료가 실제로 소비되도록 조정합니다.
- Create: Treadmill은 석기 시대 또는 안산암 합금 시대의 하위 동력원 후보입니다.
- Create Utilities J는 산업 시대에 해금합니다.
- Create Mechanical Extruder는 안산암 합금 시대에 해금합니다.
- Create: Dreams n' Desires는 콘텐츠와 밸런스를 검토한 뒤 시대 및 해금 시점을 결정합니다.

### 퀘스트 구성

퀘스트는 기능을 직접 해금하는 수단이 아니라 플레이어에게 목표와 진행 방향을 알려주는 안내 장치로 사용합니다.

- **마인크래프트 튜토리얼 퀘스트**: 바닐라 생존과 모드팩의 기본 사용법을 안내합니다.
- **Create 기술 시대 퀘스트**: 각 시대의 핵심 설비, 생산 스택과 다음 시대 진입 조건을 안내합니다.

마인크래프트 튜토리얼 퀘스트의 세부 구조와 구현 현황은 [QUEST_TUTORIAL.md](QUEST_TUTORIAL.md)에서 관리합니다. 실제 퀘스트는 `Tutorial` 단일 챕터의 큰 진행도로 구성하며 게임 내 기본 문구는 영어로 작성합니다.

### 향후 확장

추후 탐험 및 모험 관련 모드를 추가할 수 있습니다. 해당 모드에서 얻는 아이템은 기술 시대의 필수 진행 재료보다는 퀘스트라인의 특별 보상이나 성취감을 주는 보상 시스템에 활용할 예정입니다.

## 모드 목록 (100개)

각 모드는 주된 역할을 기준으로 분류했습니다. 여러 기능을 가진 모드는 모드팩에서 가장 크게 활용되는 분류에 배치했습니다.

### 핵심 콘텐츠 및 대형 시스템 (4개)

- **Applied Energistics 2**
  - 아이템과 유체를 디지털 네트워크에 저장하고 자동화하는 대규모 물류 시스템을 추가합니다.

- **Create**
  - 회전력, 톱니바퀴, 컨베이어와 움직이는 구조물을 이용한 기계식 자동화를 추가합니다.

- **Farmer's Delight**
  - 새로운 작물, 조리 도구, 음식과 농사 중심의 생활 콘텐츠를 추가합니다.

- **Quark**
  - 바닐라 분위기를 유지하면서 건축, 탐험, 자동화와 편의 기능을 다양하게 확장합니다.

### Create 생산·기술 확장 (19개)

- **Create Crafts & Additions**
  - Create에 전기 모터, 발전기, 전선 및 추가 자동화 장치를 더합니다.

- **Create Mechanical Extruder**
  - 유체와 블록 조건을 조합해 조약돌 생성기처럼 자원을 생산하는 압출기를 추가합니다.

- **Create Tiers**
  - Create 장치에 여러 성능 등급과 업그레이드 요소를 추가합니다.

- **Create Utilities J**
  - Create 자동화와 건축에 활용할 수 있는 여러 편의 장치와 부품을 추가합니다.

- **Create: AE Generator**
  - Create의 회전력을 Applied Energistics 2 네트워크용 에너지로 활용할 수 있게 합니다.

- **Create: Atomic**
  - Create 기반 자동화에 원자력·에너지 관련 콘텐츠와 생산 과정을 추가합니다.

- **Create: Dragons Plus**
  - Create에 새로운 기계 장치, 재료, 유체 처리와 자동화 콘텐츠를 확장합니다.

- **Create: Dreams n' Desires**
  - Create에 실험적인 기계, 도구, 장식과 새로운 제작 과정을 폭넓게 추가합니다.

- **Create: Enchantment Industry**
  - 액체 경험치와 인쇄 공정을 이용해 마법 부여 및 경험치 처리를 자동화합니다.

- **Create: Integrated Farming**
  - Create 장치와 연계되는 농업 기계 및 작물 자동화 기능을 추가합니다.

- **Create Low-Heated**
  - 수동 가열을 연료가 필요한 기본 버너로 대체하고, 분지 레시피에 저온 가열 단계를 추가해 열 생산을 자동화 과제로 만듭니다.

- **Create: Metallurgy**
  - 금속을 녹이고 주조하는 Create 기반 야금 생산 체계를 추가합니다.

- **Create: Petrochem**
  - 원유 정제, 석유화학 물질과 관련 Create 자동화 공정을 추가합니다.

- **Create: Recipe Need RPM**
  - Create 가공 레시피가 일정 회전 속도에 도달해야 작동하도록 조건을 추가합니다.

- **Create: Rubberworks**
  - 고무 생산과 가공을 Create 기계로 자동화하는 제조 공정을 추가합니다.

- **Create: Transmission!**
  - 회전력을 전달하고 분배하기 위한 추가 동력 전달 장치를 제공합니다.

- **Create: Treadmill**
  - 몹이 러닝머신을 움직여 Create 회전력을 생산하게 하는 장치를 추가합니다.

- **Create: Unbreakable series**
  - Create 공정을 활용해 내구도가 소모되지 않는 네더라이트 장비를 제작할 수 있게 합니다.

- **Create: Vintage**
  - 이전 Create 버전의 장치와 기능을 현재 버전에서 다시 사용할 수 있게 합니다.

### Create 철도·건축·장식 (5개)

- **Create Deco**
  - Create 분위기에 어울리는 장식 블록, 금속 블록과 건축 요소를 추가합니다.

- **Create: Bells & Whistles**
  - Create 열차를 꾸밀 수 있는 장식, 차체 부품과 철도 관련 블록을 추가합니다.

- **Create: Blocks & Bogies**
  - Create 열차용 추가 보기와 건축·장식 블록을 제공합니다.

- **Create: Copycats+**
  - 다른 블록의 외형을 입힐 수 있는 다양한 형태의 카피캣 블록을 추가합니다.

- **Create: Nowheel**
  - Create 열차의 바퀴 표시와 관련 외형을 조정할 수 있게 합니다.

### 요리 및 농업 연동 (3개)

- **Create Slice & Dice**
  - Farmer's Delight의 도마와 요리 과정을 Create 기계로 자동화합니다.

- **Create: Bitterballen**
  - Create 방식으로 제작하고 자동화할 수 있는 음식과 관련 생산 과정을 추가합니다.

- **Create: Central Kitchen**
  - Create와 Farmer's Delight 계열 요리 모드를 연결해 음식 생산을 자동화합니다.

### 저장 및 물류 (5개)

- **Pipez**
  - 아이템과 유체 등을 간단하고 효율적으로 운송하는 파이프와 전송 속도·필터 업그레이드를 추가합니다.

- **Sophisticated Backpacks**
  - 업그레이드, 자동 정리와 필터 기능을 갖춘 확장형 가방을 추가합니다.

- **Sophisticated Backpacks Create Integration**
  - Sophisticated Backpacks와 Create의 벨트·깔때기 등 물류 장치 간 연동을 제공합니다.

- **Sophisticated Storage**
  - 업그레이드와 필터 기능을 갖춘 상자, 통 및 저장 블록을 추가합니다.

- **Sophisticated Storage Create Integration**
  - Sophisticated Storage와 Create 물류 장치가 원활하게 아이템을 주고받도록 연동합니다.

### 퀘스트 및 멀티플레이 (7개)

- **FTB Chunks (NeoForge)**
  - 청크 소유권과 보호, 강제 로딩 기능을 제공하고 미니맵과 전체 지도로 탐험 정보를 확인할 수 있게 합니다.

- **FTB Essentials (Forge & Fabric)**
  - 홈, 스폰 이동과 텔레포트 요청 등 싱글플레이와 멀티플레이에서 유용한 편의 명령어를 제공합니다.

- **FTB Filter System**
  - 태그와 논리 조건을 조합한 아이템 필터를 제공하여 '아무 원목'처럼 여러 아이템을 하나의 퀘스트 목표로 판정할 수 있게 합니다.

- **FTB Quests (NeoForge)**
  - 진행 목표, 보상과 안내를 제공하는 퀘스트 시스템을 추가합니다.

- **FTB Ranks (NeoForge)**
  - 플레이어 등급별 권한과 명령어 사용 범위를 설정할 수 있게 합니다.

- **FTB Teams (NeoForge)**
  - 플레이어 팀 구성과 FTB 계열 모드의 팀 단위 데이터 공유 기능을 제공합니다.

- **More Quest Types**
  - 블록 파괴·설치, 몹 길들이기, 낚시와 주민 거래처럼 기본 FTB Quests만으로 부족한 행동 판정 과제를 추가합니다.

### 사망 및 아이템 복구 (1개)

- **Corpse**
  - 사망한 자리에 플레이어의 시체를 남겨 떨어뜨린 아이템을 안전하게 보관하고 원래 인벤토리 슬롯으로 회수할 수 있게 합니다.

### 스크립팅 및 모드팩 제작 (2개)

- **KubeJS**
  - JavaScript로 레시피, 아이템, 태그와 게임 이벤트를 수정할 수 있게 합니다.

- **KubeJS Create**
  - KubeJS 스크립트에서 Create의 가공 레시피와 기능을 제어할 수 있게 합니다.

### 건축 블록 (2개)

- **Rechiseled**
  - 하나의 재료를 다양한 무늬와 형태의 장식 블록으로 가공할 수 있게 합니다.

- **Rechiseled: Create**
  - Rechiseled에 Create 스타일의 장식 블록과 두 모드 간 연동을 추가합니다.

### 그래픽·셰이더·애니메이션 (8개)

- **[EMF] Entity Model Features [Fabric & Forge]**
  - 리소스팩에서 커스텀 엔티티 모델을 사용할 수 있도록 지원합니다.

- **[ETF] Entity Texture Features - [Fabric & Forge]**
  - 엔티티의 무작위·발광·변형 텍스처 같은 고급 리소스팩 기능을 지원합니다.

- **Create: Dynamic Lights**
  - Create의 횃불과 조명 부품이 움직이는 구조물에서도 동적 광원으로 작동하게 합니다.

- **Fusion (Connected Textures)**
  - 서로 붙은 블록의 텍스처를 자연스럽게 연결하고 다양한 모델 렌더링 기능을 제공합니다.

- **Iris & Oculus Flywheel Compat**
  - Iris 셰이더와 Create의 Flywheel 렌더링이 함께 작동하도록 호환성을 개선합니다.

- **Iris Shaders**
  - Sodium 환경에서 셰이더팩을 사용할 수 있도록 지원합니다.

- **Not Enough Animations**
  - 3인칭 시점에서 먹기, 지도 보기 등 다양한 플레이어 동작 애니메이션을 표시합니다.

- **Sodium/Embeddium Dynamic Lights**
  - 손에 든 횃불이나 빛나는 아이템·엔티티가 주변을 실시간으로 밝히게 합니다.

### 성능 최적화 (7개)

- **Clumps**
  - 가까이 있는 경험치 구슬을 합쳐 렉을 줄이고 경험치 획득을 편하게 만듭니다.

- **Create Better FPS**
  - Create의 움직이는 장치와 렌더링을 최적화해 성능 저하를 줄입니다.

- **Create: Threaded Trains**
  - Create 열차 관련 연산을 최적화해 복잡한 철도망의 성능을 개선합니다.

- **Entity Culling Fabric/Forge**
  - 화면에 가려져 보이지 않는 엔티티와 블록 엔티티의 렌더링을 생략해 성능을 높입니다.

- **FerriteCore ((Neo)Forge)**
  - 블록 상태와 모델 데이터의 메모리 사용량을 줄여 게임의 RAM 효율을 개선합니다.

- **ModernFix**
  - 로딩 시간, 메모리 사용량과 여러 게임 병목을 개선하는 종합 최적화 모드입니다.

- **Sodium**
  - 렌더링 엔진을 최적화해 프레임과 그래픽 성능을 개선합니다.

### UI 및 편의 기능 (20개)

- **Advancement Disabler**
  - 바닐라 발전 과제와 발전 과제 화면을 비활성화하여 진행 안내를 FTB Quests로 통합하고, 모드 발전 과제는 호환성을 위해 유지합니다.

- **Chat Heads**
  - 채팅 메시지 옆에 해당 플레이어의 얼굴 아이콘을 표시합니다.

- **Cosmetic Armor Reworked**
  - 실제 방어구와 별개로 외형만 보여주는 코스메틱 방어구 슬롯을 추가합니다.

- **Create Ultimine**
  - Create 관련 블록을 FTB Ultimine 방식으로 편리하게 일괄 채굴할 수 있게 합니다.

- **Disable Compliance Notification**
  - 대한민국 사용자에게 매시간 표시되는 게임 이용 시간 준수 알림을 비활성화합니다.

- **Default Options**
  - 신규 설치에 적용할 기본 게임 설정과 단축키를 배포하면서 사용자가 이후 변경한 설정은 유지할 수 있게 합니다.

- **Enchantment Descriptions**
  - 마법 부여 책과 장비 툴팁에 인챈트 효과 설명을 표시합니다.

- **FancyMenu**
  - 메인 메뉴와 게임 화면을 이미지, 버튼 및 애니메이션으로 자유롭게 꾸밀 수 있게 합니다.

- **FTB Ultimine (NeoForge)**
  - 키를 누른 채 같은 종류의 블록을 한 번에 여러 개 채굴할 수 있게 합니다.

- **Jade 🔍**
  - 바라보는 블록이나 엔티티의 이름, 상태와 저장 정보를 화면에 표시합니다.

- **Just Enough Items (JEI)**
  - 아이템 목록과 제작법·사용처를 게임 안에서 검색하고 확인할 수 있게 합니다.

- **Korean Chat Patch**
  - 한글 조합과 한·영 전환을 개선하여 게임 내 채팅과 텍스트 입력을 편리하게 합니다.

- **NetherPortalFix**
  - 네더 포탈을 통과할 때 잘못된 위치나 다른 포탈로 연결되는 문제를 줄입니다.

- **Not Enough Recipe Book [NERB]**
  - 바닐라 레시피북 버튼과 기본 기능을 제거하여 제작법 확인을 JEI로 통합합니다.

- **Polymorph (Fabric/Forge/Quilt)**
  - 같은 재료 조합에 여러 제작 결과가 겹칠 때 원하는 레시피를 선택할 수 있게 합니다.

- **Reese's Sodium Options**
  - Sodium 비디오 설정 화면을 더 보기 쉽고 편리한 구조로 개선합니다.

- **Resource Pack Overrides**
  - 모드팩에 포함된 리소스팩의 기본 활성화 상태, 순서, 잠금과 표시 여부를 관리합니다.

- **Fancy Toasts | Better Advancements**
  - 발전 과제 달성 알림에 유형별 테마, 효과음과 애니메이션을 적용하고 모드팩 전용 텍스처로 꾸밀 수 있게 합니다.

- **Xaero's Minimap**
  - 웨이포인트, 지형과 주변 정보를 보여주는 미니맵을 화면에 추가합니다.

- **Yeetus Experimentus**
  - 기존 월드로 접속할 때 표시되는 실험적 설정 관련 경고 화면을 제거합니다.

### 기반 라이브러리 (18개)

- **Architectury API**
  - 여러 모드 로더를 지원하는 모드들이 공통으로 사용하는 기반 라이브러리입니다.

- **Balm**
  - BlayTheNinth 계열 모드가 공통 기능을 사용하기 위한 기반 라이브러리입니다.

- **Bookshelf**
  - 여러 모드에서 설정, 데이터 및 공통 코드를 공유하기 위한 기반 라이브러리입니다.

- **FTB Library (NeoForge)**
  - FTB 계열 모드의 화면, 설정 및 공통 기능을 제공하는 기반 라이브러리입니다.

- **FTB XMod Compat**
  - FTB Quests가 FTB Filter System의 Smart Filter 조건을 판정하게 하고, KubeJS·권한 등 FTB 모드와 외부 모드 사이의 연동을 활성화합니다.

- **GuideME**
  - 모드가 게임 내 가이드북과 도움말 화면을 제공할 때 사용하는 기반 시스템입니다.

- **Konkrete**
  - FancyMenu 등 Keksuccino 계열 모드가 사용하는 공통 기반 라이브러리입니다.

- **Kotlin for Forge**
  - Kotlin으로 작성된 Forge 및 NeoForge 모드를 실행하기 위한 언어 지원 라이브러리입니다.

- **Mechanicals Lib**
  - 여러 Create 애드온이 공통으로 사용하는 코드와 기능을 제공하는 기반 라이브러리입니다.

- **Melody**
  - FancyMenu 계열 모드에서 오디오 재생 기능을 제공하는 기반 라이브러리입니다.

- **Placebo**
  - Shadows_of_Fire 계열 모드가 사용하는 공통 코드와 설정 기능을 제공하는 라이브러리입니다.

- **Prickle**
  - Darkhax 계열 모드가 공통 기능을 사용하기 위한 경량 기반 라이브러리입니다.

- **Rhino**
  - KubeJS가 JavaScript를 실행하고 Java 코드와 연동하기 위해 사용하는 스크립트 엔진입니다.

- **ShatterLib | OctoLib**
  - NERB 등 Shatterbyte 계열 모드가 공유하는 설정과 공통 코드를 제공합니다.

- **Sophisticated Core**
  - Sophisticated 계열 모드가 공유하는 업그레이드와 인벤토리 기능을 제공하는 라이브러리입니다.

- **SuperMartijn642's Config Lib**
  - SuperMartijn642 계열 모드의 설정 파일과 설정 화면을 처리하는 기반 라이브러리입니다.

- **SuperMartijn642's Core Lib**
  - SuperMartijn642 계열 모드가 사용하는 공통 코드와 유틸리티를 제공합니다.

- **Zeta**
  - Quark와 관련 모드가 사용하는 공통 기능 및 설정 시스템을 제공합니다.

## 기본 리소스팩

리소스팩은 아래 순서로 겹쳐 적용되며, 아이템 텍스처를 교체하는 팩은 포함하지 않습니다.

1. **Mc둥근모**
   - 공식 Neo둥근모를 사용해 한글을 선명한 도트 글꼴로 표시합니다.
2. **Slightly Improved Font**
   - 바닐라 감각을 유지한 32× 영문·유럽 문자 글꼴을 적용합니다. Mc둥근모의 공급자 순서와 조합되어 한글에는 영향을 주지 않습니다.
3. **Fresh Animations: Player Extension**
   - 플레이어의 대기, 이동, 점프, 수영, 등반, 비행과 장비 사용 동작을 Fresh Animations 스타일로 확장합니다.
4. **Fresh Animations: Extensions**
   - 몹의 세부 모델과 표정, 화살통, 발광 효과를 보강하고 상자·보트·광산 수레 같은 오브젝트에 생동감 있는 동작을 추가합니다.
5. **Fresh Animations**
   - 바닐라 몹의 외형 감각은 유지하면서 움직임과 표정을 마인크래프트 트레일러처럼 풍부하게 만듭니다.

Fresh Animations 계열 리소스팩은 이미 포함된 Entity Model Features 및 Entity Texture Features를 사용합니다. 아이템을 들고 먹거나 마시는 동작 등은 Not Enough Animations가 보완합니다. Player Extension과 Extensions는 인벤토리 아이템 텍스처를 교체하지 않습니다. 기본 활성화 순서는 Resource Pack Overrides의 `config/resourcepackoverrides.json`에서 관리합니다.

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
6. 테스트가 끝나면 변경 사항과 `CHANGELOG.md`를 함께 커밋합니다.

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
packwiz curseforge export -o "MoonScenty-Presents-0.1.0.zip"
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
- FTB Quests의 단일 `Tutorial` 챕터가 오류 없이 열리고 263개 퀘스트의 배치, 목표 판정과 의존 관계가 정상적으로 작동하는지
- Deep Dark와 위더 챕터가 에필로그 완료 전에는 숨겨지고 완료 후 각각 독립적으로 열리는지
- Corpse가 일반 지형, 용암과 공허에서 사망 아이템을 정상적으로 보존하는지
- Sophisticated Backpack과 Cosmetic Armor 슬롯의 아이템이 사망 후 정상적으로 복구되는지
- 클라이언트 전용 모드 때문에 서버 실행이 실패하지 않는지

ZIP 파일은 `.gitignore`에 의해 Git에서 제외됩니다. 배포본은 저장소에 커밋하지 않고 GitHub Releases 또는 CurseForge에 업로드합니다.

### Git 커밋 예시

```powershell
git status
git diff
git add .
git commit -m "feat: add new Create addons"
```

모드 추가, 설정 변경, 전체 업데이트는 가능하면 서로 다른 커밋으로 나누어 기록합니다.
