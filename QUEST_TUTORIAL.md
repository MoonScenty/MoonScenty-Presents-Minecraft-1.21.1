# 바닐라 튜토리얼 퀘스트 구상

이 문서는 MoonScenty Presents Minecraft 1.21.1의 바닐라 튜토리얼 퀘스트라인을 설계하기 위한 초안입니다. 실제 FTB Quests 데이터와 퀘스트 문구를 작성하기 전에 전체 흐름, 분기와 표현 방식을 정리합니다.

## 설계 원칙

- 퀘스트는 콘텐츠를 해금하는 장치가 아니라 플레이어에게 다음 목표와 게임 원리를 알려주는 안내 장치로 사용합니다.
- 메인 진행은 첫 원목부터 엔더 드래곤 처치까지 이어집니다.
- 엔더 드래곤 처치 후 엔드 도시, 셜커 상자와 겉날개를 다루는 에필로그가 이어집니다.
- Deep Dark와 위더는 에필로그 이후에 열리는 서로 독립적인 선택형 포스트게임 분기입니다.
- 워든은 처치 대상으로 취급하지 않습니다. Deep Dark 분기는 잠입, 탐색, 전리품 회수와 생환을 목표로 합니다.
- 농사, 주민, 탐험, 레드스톤과 양조는 메인 진행을 막지 않는 선택 분기로 구성합니다.
- 아이템 감지 과제는 가능한 한 아이템을 소비하지 않도록 설정합니다.
- 바닐라 발전 과제로 확인할 수 있는 목표는 발전 과제 감지를 우선 사용합니다.
- 보상은 다음 진행을 건너뛰게 하는 장비보다 음식, 횃불, 경험치, 장식품과 기념품을 우선합니다.
- Create 기술 시대는 별도의 퀘스트 챕터로 구성하고 이 문서에서는 연결 지점만 다룹니다.

## 제목 작성 규칙

퀘스트 데이터의 내부 ID는 영문 `snake_case`로 작성하고, 플레이어에게 표시되는 제목에는 자연스러운 한국어 말장난이나 밈을 선택적으로 사용합니다.

- 밈이 목표를 이해하는 데 방해되면 평범한 제목을 사용합니다.
- 유행 수명이 너무 짧거나 특정 집단을 비하하는 표현은 사용하지 않습니다.
- 퀘스트 설명 첫 문장에서 실제 목표를 분명하게 안내합니다.
- 중요한 시스템 설명에는 농담보다 정확성을 우선합니다.
- 아래 제목은 후보이며 게임 내 문맥을 확인한 뒤 교체할 수 있습니다.

## 퀘스트 유형

| 유형 | 역할 | 표시 제안 |
| --- | --- | --- |
| Main | 엔더 드래곤까지 이어지는 핵심 진행 | 금색 또는 큰 아이콘 |
| Guide | 생존 및 시스템 설명 | 파란색 |
| Branch | 선택 콘텐츠 | 회색 또는 초록색 |
| Challenge | 숙련자용 도전 | 보라색 |
| Epilogue | 엔더 드래곤 이후의 후일담 | 청록색 |
| Postgame | Deep Dark와 위더 선택 분기 | 짙은 남색 또는 붉은색 |

## 전체 구조

```text
환영합니다
└─ 첫 번째 나무
   └─ 석기 생활
      └─ 철기 생활
         └─ 지하 탐험
            └─ 다이아몬드와 흑요석
               └─ 네더 원정
                  └─ 엔더의 눈과 근거지
                     └─ 엔더 드래곤
                        └─ 에필로그: 외곽 엔드
                           ├─ 선택: Deep Dark 탐사
                           └─ 선택: 위더와 신호기

중간 선택 분기
├─ 음식과 농사
├─ 동물 사육과 낚시
├─ 전투 훈련
├─ 마법 부여와 양조
├─ 주민과 거래
├─ 오버월드 탐험
└─ 레드스톤 기초 → Create 기술 시대 안내
```

---

## 0장: 게임에 오신 것을 환영합니다

완전한 초보자에게 조작법과 퀘스트의 역할을 안내합니다.

| ID | 제목 후보 | 유형 | 목표 및 설명 |
| --- | --- | --- | --- |
| `welcome` | 여기가 그 마인크래프트인가요 | Main | 모드팩과 튜토리얼 퀘스트 소개 |
| `look_around` | 고개를 들어 주위를 보라 | Guide | 이동, 시점 전환과 점프 안내 |
| `open_inventory` | 주머니 사정부터 확인합시다 | Main | 인벤토리 열기 |
| `breaking_blocks` | 일단 때려 봅시다 | Guide | 블록 파괴 방법 안내 |
| `placing_blocks` | 파괴했으면 책임지고 놓기 | Guide | 블록 설치 방법 안내 |
| `recipe_book_and_jei` | 모르면 JEI에게 물어봐 | Guide | 레시피 북, JEI 검색과 사용처 확인법 |
| `quests_are_guides` | 퀘스트는 거들 뿐 | Guide | 퀘스트가 콘텐츠를 잠그지 않음을 안내 |

## 1장: 첫 번째 나무

### 메인 경로

| ID | 제목 후보 | 목표 |
| --- | --- | --- |
| `first_log` | 나무를 캐라고? 맨손으로? | 아무 원목 1개 획득 |
| `wooden_planks` | 원목의 정상화 | 판자 제작 |
| `crafting_table` | 장인은 작업대부터 만든다 | 작업대 제작 |
| `wooden_pickaxe` | 장인은 도구를 탓하지 않는다 | 나무 곡괭이 제작 |
| `first_cobblestone` | 돌을 돌려드립니다 | 조약돌 3개 획득 |

### 선택: 다른 나무 도구

- `wooden_axe`: 나무꾼의 자격 — 나무 도끼 제작
- `wooden_shovel`: 삽질도 기술이다 — 나무 삽 제작
- `wooden_hoe`: 농사 준비 완료 — 나무 괭이 제작
- `wooden_sword`: 호신용입니다 — 나무 검 제작

모든 나무 도구 제작을 강요하지 않고 각각의 용도를 설명하는 짧은 안내로 구성합니다.

## 2장: 석기 생활

### 메인 경로

| ID | 제목 후보 | 목표 |
| --- | --- | --- |
| `stone_pickaxe` | 돌고 돌아 돌곡괭이 | 돌 곡괭이 제작 |
| `stone_weapon` | 이제 말로 해결할 단계는 지났다 | 돌 검 또는 돌 도끼 제작 |
| `furnace` | 불 좀 빌립시다 | 화로 제작 |
| `coal_or_charcoal` | 검은 것이 연료로다 | 석탄 또는 숯 획득 |
| `torches` | 빛이 있으라 | 횃불 제작 |
| `first_food` | 금강산도 식후경 | 익힌 음식 획득 |
| `first_bed` | 누울 자리부터 보고 눕자 | 침대 제작 |
| `survive_night` | 오늘 밤 주인공은 나야 나 | 밤을 보내거나 침대에서 자기 |

### 선택: 첫 거처

- `basic_shelter`: 내 집 마련의 꿈 — 벽, 지붕과 조명이 있는 거처 안내
- `first_door`: 문단속은 철저하게 — 문 제작
- `first_chest`: 넣을 곳이 필요해 — 상자 제작
- `double_chest`: 두 배로 모시겠습니다 — 큰 상자 만들기
- `glass_window`: 전망 좋은 집 — 유리 제작
- `mark_home`: 집 나가면 좌표 고생 — 좌표 또는 웨이포인트 기록 안내

## 3장: 먹고사는 문제

메인 진행을 막지 않는 생존 선택 분기입니다.

### 생존 안내

- `hunger`: 배고파서 현기증 나요 — 허기와 포만도 설명
- `cooked_food`: 익혀야 제맛 — 익힌 음식 준비
- `natural_regeneration`: 밥이 보약이다 — 자연 회복 조건 설명
- `set_spawn`: 집에 가고 싶다 — 침대로 리스폰 지점 설정
- `death_and_respawn`: 죽어도 다시 한 번 — 사망과 아이템 회수 설명
- `dont_dig_down`: 내 발밑이 낭떠러지 — 수직 채굴 위험 안내

### 농사 분기

- `seeds`: 작은 씨앗 큰 수확 — 씨앗 획득
- `farmland`: 땅부터 갈아엎자 — 경작지 만들기
- `first_harvest`: 내가 키운 밀 — 밀 수확
- `bread`: 빵이 없으면 밀을 먹...지는 맙시다 — 빵 제작
- `irrigation`: 물은 답을 알고 있다 — 농지 수분 공급 설명
- `root_crops`: 감자합니다 — 감자와 당근 재배
- `sugar_cane`: 달콤한 미래 — 사탕수수 재배
- `composter`: 남김없이 넣어드립니다 — 퇴비통과 뼛가루 안내

### 동물과 낚시 분기

- `breed_animals`: 둘이 만나 하나가 되는 — 동물 번식
- `shear_sheep`: 양털 깎는 노인...은 아닙니다 — 가위 사용
- `chicken_and_eggs`: 닭이 먼저냐 달걀이 먼저냐 — 닭과 달걀 안내
- `tame_wolf`: 오늘부터 1일 — 늑대 길들이기
- `tame_cat`: 집사 간택 완료 — 고양이 길들이기
- `fishing_rod`: 물고기를 낚는다는 믿음 — 낚싯대 제작
- `catch_fish`: 월척이다 — 물고기 낚기

## 4장: 철이 들 시간

### 메인 경로

| ID | 제목 후보 | 목표 |
| --- | --- | --- |
| `raw_iron` | 철이 들어버렸다 | 철 원석 획득 |
| `iron_ingot` | 뜨거운 것이 좋아 | 철 주괴 제련 |
| `iron_pickaxe` | 철든 곡괭이 | 철 곡괭이 제작 |
| `iron_weapon` | 강철은 아니지만 강하다 | 철 검 또는 철 도끼 제작 |
| `shield` | 응, 안 돼 | 방패 제작과 막기 안내 |
| `bucket` | 무엇이든 담아드립니다 | 양동이 제작 |
| `water_bucket` | 물은 답을 알고 있다 2 | 물 양동이 획득 |
| `iron_armor` | 입으면 단단해집니다 | 철 방어구 한 부위 제작 |
| `full_iron_armor` | 철통 방어 | 철 방어구 전체 착용 |

### 철제 편의 도구

- `shears`: 깎아 주세요 — 가위 제작
- `flint_and_steel`: 불장난은 네더에서 — 부싯돌과 부시 제작
- `hopper`: 들어올 때는 마음대로지만 — 호퍼 제작과 이동 방향 설명
- `anvil`: 모루겠으면 외우세요 — 모루 제작
- `compass`: 집은 가리키지 않습니다 — 나침반이 월드 스폰을 가리킨다는 설명

## 5장: 지하는 위험해

### 메인 경로

| ID | 제목 후보 | 목표 |
| --- | --- | --- |
| `go_deeper` | 내려갈 사람은 내려갑니다 | 깊은 동굴 진입 |
| `copper` | 구리구리하네 | 구리 원석 획득 |
| `redstone` | 빨간 가루의 비밀 | 레드스톤 획득 |
| `lapis` | 파란 돌이 마법을 부린다 | 청금석 획득 |
| `gold` | 금 나와라 뚝딱 | 금 원석 획득 |
| `diamond` | 다이아몬드는 영원하다 | 다이아몬드 획득 |
| `diamond_pickaxe` | 이 곡괭이는 이제 제 겁니다 | 다이아몬드 곡괭이 제작 |
| `obsidian` | 검고 단단한 그것 | 흑요석 획득 |

### 동굴 안전 안내

- `cave_supplies`: 준비된 광부에게 사고는 없다 — 음식, 횃불, 나무 준비
- `light_caves`: 어둠은 몬스터를 낳고 — 조명과 몬스터 생성 설명
- `falling_gravel`: 위를 보세요 — 자갈과 모래 낙하 위험
- `lava_safety`: 뜨거우니 조심하세요 — 용암과 물 양동이 사용법
- `mark_the_way`: 왔던 길도 다시 보자 — 길 표시
- `tool_tiers`: 급이 다릅니다 — 채굴 등급 설명
- `fortune_silk_touch`: 행운이냐 섬세함이냐 — 행운과 섬세한 손길 비교

### 지하 구조물 분기

- `mineshaft`: 폐광인데 사람이 많다 — 폐광 발견
- `monster_room`: 방은 방인데 주인이 많다 — 몬스터 방 발견
- `cave_spider`: 작다고 얕보지 마라 — 동굴 거미 주의
- `amethyst_geode`: 반짝반짝 작은 정동 — 자수정 정동 발견

Deep Dark는 이 시점에 발견할 수 있어도 퀘스트 분기는 에필로그 이후에만 표시합니다. 초반에 우연히 발견하면 싸우지 말고 돌아가라는 짧은 안내만 제공합니다.

## 6장: 살아남기 위한 전투

선택형 전투 교습 분기입니다.

- `attack_cooldown`: 때에도 때가 있다 — Java Edition 공격 충전 설명
- `sword_or_axe`: 칼이냐 도끼냐 그것이 문제로다 — 무기 차이
- `use_shield`: 방패로 막았다고 합니다 — 방패 사용
- `bow`: 가까이 오지 마세요 — 활 제작
- `arrows`: 화살은 넉넉하게 — 화살 제작
- `armor`: 맞기 전에 입자 — 방어구 설명
- `critical_hit`: 떨어지면서 때리면 더 아프다 — 치명타 안내
- `know_when_to_run`: 도망친 곳에 낙원이 있다 — 불리한 전투에서 이탈
- `kill_zombie`: 걸어 다니는 유통기한 — 좀비 처치
- `kill_skeleton`: 뼈 때리는 한 발 — 스켈레톤 처치
- `kill_creeper`: 가까이 오면 터지는 사이 — 크리퍼 처치
- `kill_spider`: 거미가 줄을 타고 — 거미 처치
- `kill_enderman`: 눈을 마주치지 말아요 — 엔더맨 처치와 시선 판정 설명

## 7장: 마법 부여

다이아몬드와 흑요석을 얻은 뒤 열리는 권장 분기입니다.

- `paper`: 종이 한 장 차이 — 종이 제작
- `book`: 사람은 책을 만들고 책은 장비를 만든다 — 책 제작
- `enchanting_table`: 마법은 장비빨 — 마법 부여대 제작
- `bookshelves`: 지식이 힘이다 — 책장 배치
- `level_thirty`: 30레벨의 품격 — 최대 단계 조건 안내
- `first_enchantment`: 주문하신 마법 나왔습니다 — 첫 마법 부여
- `enchanted_book`: 책으로 배웠습니다 — 마법이 부여된 책 획득
- `combine_enchantments`: 합치면 더 강해진다 — 모루 사용
- `grindstone`: 없던 마법으로 하겠습니다 — 숫돌 사용
- `mending`: 고쳐 쓰는 것이 미덕 — 수선 작동 방식과 획득처 안내

## 8장: 주민과 거래

완전한 선택 분기입니다.

- `find_village`: 사람 사는 곳을 찾았다 — 마을 발견
- `first_trade`: 흥정은 없습니다 — 첫 거래
- `villager_jobs`: 직업에는 귀천이 없지만 작업대는 있다 — 직업 블록 설명
- `farmer_trade`: 농부는 모든 것을 알고 있다 — 농부 거래
- `librarian_trade`: 책 좀 읽으셨네요 — 사서 거래
- `smith_trade`: 장비는 주민에게 — 대장장이 계열 거래
- `restock`: 재고가 돌아왔다 — 재입고 조건 안내
- `reputation`: 소문은 빠릅니다 — 평판 설명
- `breed_villagers`: 마을 인구 정상화 — 주민 번식
- `cure_villager`: 치료가 필요합니다 — 좀비 주민 치료
- `raid`: 마을을 지켜라 — 습격 발생 조건과 방어

## 9장: 넓고 넓은 오버월드

### 길 찾기

- `map`: 세상은 넓고 지도는 작다 — 지도 제작
- `expand_map`: 크게 보겠습니다 — 지도 확장
- `spyglass`: 멀리서 보면 희극 — 망원경 제작
- `coordinates`: 숫자는 거짓말하지 않는다 — 좌표 안내
- `waypoint`: 길 잃을 자유를 드립니다 — 웨이포인트 사용

### 구조물과 생물군계

- `desert_temple`: 사막에서 보물 찾기
- `jungle_temple`: 밀림의 함정
- `shipwreck`: 배가 산으로...이 아니라 바다 밑으로
- `buried_treasure`: 보물은 X 아래에 있다
- `ocean_ruins`: 물속의 옛날 옛적에
- `pillager_outpost`: 저기 깃발이 보인다
- `woodland_mansion`: 큰 집에는 사연이 있다
- `trail_ruins`: 솔질 한 번 하시죠 — 고고학 안내
- `ocean_monument`: 바다의 주인은 누구인가 — 해저 유적 안내

## 10장: 레드스톤 기초

바닐라 자동화와 Create 기술 시대 사이를 연결하는 선택 분기입니다.

- `redstone_power`: 빨간 맛 전력 — 레버와 레드스톤 램프
- `signal_strength`: 멀어지면 희미해지는 사이 — 신호 세기
- `repeater`: 다시 한 번 말씀드립니다 — 중계기
- `comparator`: 비교를 거부할 수 없다 — 비교기
- `observer`: 다 보고 있습니다 — 관측기
- `piston`: 밀어드립니다 — 피스톤
- `sticky_piston`: 밀고 당기기 — 끈끈이 피스톤
- `hopper_line`: 물류가 흐르는 방향 — 호퍼 연결
- `simple_clock`: 시간은 돌고 돈다 — 레드스톤 시계
- `powered_rail`: 다음 역은 자동화역입니다 — 전동 레일
- `beyond_redstone`: 톱니바퀴를 돌릴 시간 — Create 기술 시대 퀘스트라인 안내

## 11장: 이세계 네더

### 메인 경로

| ID | 제목 후보 | 목표 |
| --- | --- | --- |
| `nether_portal` | 이세계 전생 준비 완료 | 네더 차원문 제작 |
| `light_portal` | 문은 열렸습니다 | 차원문 점화 |
| `enter_nether` | 여기가 어디요 | 네더 진입 |
| `record_portal` | 돌아갈 좌표는 적으셨습니까 | 차원문 좌표 기록 안내 |
| `wear_gold` | 금수저 생존법 | 금 방어구 한 부위 착용 |
| `nether_quartz` | 하얀 돌도 쓸모가 있다 | 네더 석영 획득 |
| `find_fortress` | 요새가 안 보여요 | 네더 요새 발견 |
| `kill_blaze` | 불 좀 꺼 줄래 | 블레이즈 처치 |
| `blaze_rod` | 불막대기 획득 | 블레이즈 막대 획득 |
| `nether_wart` | 빨간 혹 같은 그것 | 네더 사마귀 획득 |
| `blaze_powder` | 곱게 갈아드립니다 | 블레이즈 가루 제작 |

### 네더 생존 안내

- `no_water`: 물이 안 나와요 — 네더에서 물을 놓을 수 없음
- `exploding_beds`: 누우면 큰일 납니다 — 침대 폭발 경고
- `coordinate_scale`: 8배 빠른 길 — 네더 좌표 비율
- `piglin_neutrality`: 금을 입으면 친구인 척 — 피글린 중립 조건
- `hoglin_warning`: 쟤는 금을 몰라요 — 호글린 주의
- `lava_everywhere`: 발밑이 뜨겁습니다 — 용암 지형 안전

### 선택: 피글린과 보루 잔해

- `barter`: 금으로 대화합시다 — 피글린 물물교환
- `crying_obsidian`: 흑요석도 웁니다 — 우는 흑요석
- `fire_resistance`: 뜨거운 형제들 — 화염 저항 획득
- `bastion`: 그 시절 우리는 보루에 있었다 — 보루 잔해 발견
- `piglin_brute`: 말이 통하지 않는 친구 — 피글린 야수 주의
- `ancient_debris`: 오래된 것이 강하다 — 고대 잔해 획득
- `netherite`: 업그레이드는 못 참지 — 네더라이트 장비 제작

## 12장: 양조 교실

드래곤전 준비에 도움을 주지만 필수는 아닌 분기입니다.

- `brewing_stand`: 오늘은 내가 연금술사 — 양조기 제작
- `fuel_brewing_stand`: 불맛을 더했습니다 — 블레이즈 가루 투입
- `awkward_potion`: 어색한 물약이 시작입니다 — 어색한 물약 제작
- `extend_potion`: 오래오래 갑니다 — 레드스톤으로 지속시간 증가
- `amplify_potion`: 진하게 부탁드립니다 — 발광석으로 효과 강화
- `splash_potion`: 마시는 것보다 던지는 게 빠르다 — 투척용 물약
- `fire_resistance_potion`: 불 속성 면역 — 화염 저항 물약
- `slow_falling_potion`: 천천히 떨어져도 괜찮아 — 느린 낙하 물약
- `strength_potion`: 힘이 장사다 — 힘의 물약
- `healing_potion`: 원샷 원회복 — 즉시 치유 물약

## 13장: 엔더의 눈

### 메인 경로

| ID | 제목 후보 | 목표 |
| --- | --- | --- |
| `ender_pearl` | 눈물은 아니고 진주입니다 | 엔더 진주 획득 |
| `eye_of_ender` | 눈에는 눈, 진주에는 가루 | 엔더의 눈 제작 |
| `throw_eye` | 눈을 던져 길을 묻다 | 엔더의 눈 던지기 |
| `spare_eyes` | 여분은 배신하지 않는다 | 파괴 가능성과 여분 준비 안내 |
| `find_stronghold` | 찾았다 요새... 맞겠지? | 근거지 발견 |
| `stronghold_library` | 지하 도서관에 오신 것을 환영합니다 | 근거지 도서관 발견 |
| `portal_room` | 드디어 문 앞입니다 | 엔드 차원문 방 발견 |
| `silverfish` | 돌에서 벌레가 왜 나와 | 좀벌레 생성기 처리 안내 |
| `activate_end_portal` | 열두 눈이 지켜보고 있다 | 엔드 차원문 활성화 |

## 14장: 드래곤전 준비

모든 항목을 강제하지 않고 권장 준비물 체크리스트로 보여줍니다.

- `dragon_weapon`: 믿을 만한 한 자루 — 다이아몬드 무기 권장
- `dragon_bow`: 거리는 곧 생명이다 — 활 또는 쇠뇌 준비
- `dragon_arrows`: 화살은 많을수록 좋다 — 충분한 화살 준비
- `dragon_armor`: 갑옷은 배신하지 않는다 — 방어구 준비
- `dragon_blocks`: 쌓을 것은 많고 시간은 없다 — 건축 블록 준비
- `dragon_water`: 물 한 바가지의 기적 — 물 양동이 준비
- `dragon_pearls`: 떨어질 때 쓰는 보험 — 엔더 진주 준비
- `dragon_food`: 싸움도 식후경 — 음식 준비
- `dragon_slow_falling`: 낙하산 없는 낙하 — 느린 낙하 물약 권장
- `stronghold_spawn`: 죽어도 문 앞에서 — 근거지에 리스폰 지점 설정
- `backup_chest`: 플랜 B는 상자 안에 — 예비 장비 보관
- `dont_sleep_end`: 엔드에서 숙면 금지 — 침대 폭발 전술과 위험성 설명

## 15장: 엔더 드래곤

### 메인 경로

| ID | 제목 후보 | 목표 |
| --- | --- | --- |
| `enter_end` | 돌아올 수 없는 강을 건넜다 | 엔드 진입 |
| `reach_island` | 섬까지 안전배송 | 중앙 섬으로 이동 |
| `avoid_endermen` | 눈을 마주치지 말아요 2 | 엔더맨 대응 안내 |
| `understand_crystals` | 저 수정이 범인입니다 | 엔드 수정의 회복 기능 설명 |
| `destroy_crystals` | 연결을 끊겠습니다 | 엔드 수정 파괴 |
| `caged_crystals` | 철창 안의 수정 | 철창 수정 처리 |
| `dragon_breath` | 보라색 바닥은 밟는 게 아닙니다 | 드래곤의 숨결 회피 |
| `dragon_perch` | 중앙으로 와라 | 드래곤 착지 중 근접 공격 안내 |
| `kill_dragon` | 내가 왕이 될 상인가 | 엔더 드래곤 처치 |
| `exit_portal` | 집으로 가는 길 | 귀환 차원문 진입 |

### 선택 도전

- `collect_breath`: 숨결까지 알뜰하게 — 드래곤의 숨결 획득
- `dragon_egg`: 알은 건드리면 도망갑니다 — 드래곤 알 획득
- `respawn_dragon`: 한 번 더 하시겠습니까 — 엔드 수정으로 드래곤 부활
- `kill_dragon_again`: 끝... 다시 — 부활한 드래곤 처치

## 16장: 에필로그 — 끝이 아니었습니다

엔더 드래곤 이후 외곽 엔드 탐험을 다룹니다. 이 챕터를 완료하면 Deep Dark와 위더 선택 분기가 표시됩니다.

| ID | 제목 후보 | 목표 |
| --- | --- | --- |
| `end_gateway` | 문 너머 또 다른 문 | 엔드 관문 이용 |
| `outer_end_islands` | 끝의 바깥쪽 | 외곽 엔드 섬 도달 |
| `chorus_fruit` | 먹으면 어디로 갈지 모릅니다 | 후렴과 열매 획득 |
| `end_city` | 게임 끝에 도시가 있었다 | 엔드 도시 발견 |
| `shulker` | 열리면 맞고 맞으면 뜹니다 | 셜커 처치 |
| `levitation` | 하늘을 나는 기분은 이런 걸까 | 공중 부양 대응 안내 |
| `shulker_shell` | 껍데기는 남는다 | 셜커 껍데기 획득 |
| `shulker_box` | 상자째 들고 갑니다 | 셜커 상자 제작 |
| `end_ship` | 배는 있는데 바다는 없다 | 엔드 함선 발견 |
| `elytra` | 날개를 펼쳐라 | 겉날개 획득 |
| `firework_rocket` | 추진력을 얻기 위함이었다 | 폭죽 로켓 제작 |
| `first_flight` | 날아라 슈퍼보드...는 아니고 | 겉날개 비행 |
| `epilogue_complete` | 끝난 줄 알았지? | 에필로그 완료 및 포스트게임 분기 안내 |

---

## 17A장: 선택 탐사 — Deep Dark

Deep Dark는 보스를 쓰러뜨리는 전투 챕터가 아닙니다. 워든은 지역의 위험 요소이자 플레이어가 피해야 하는 존재로 다룹니다. 워든 처치, 워든 전리품 또는 반복 사냥을 요구하는 퀘스트는 만들지 않습니다.

### 진입과 이해

| ID | 제목 후보 | 유형 | 목표 및 설명 |
| --- | --- | --- | --- |
| `deep_dark_intro` | 들어는 봤나, Deep Dark | Postgame | Deep Dark 분기와 비전투 원칙 소개 |
| `find_deep_dark` | 더 깊고 더 어둡게 | Postgame | Deep Dark 생물군계 발견 |
| `sculk_block` | 이끼인 줄 알았는데 듣고 있습니다 | Guide | 스컬크 블록 획득 또는 관찰 |
| `sculk_sensor` | 다 듣고 있습니다 | Guide | 스컬크 감지기와 진동 설명 |
| `sculk_shrieker` | 소리 지르지 마 | Guide | 스컬크 비명체의 경고 단계 설명 |
| `wool_silences` | 양털은 생각보다 조용하다 | Guide | 양털로 진동을 차단하는 방법 안내 |
| `sneak_one_hundred` | 쉿, 조용히 해 | Postgame | 스컬크 감지기 근처에서 웅크리고 이동 |

### 고대 도시 탐사

| ID | 제목 후보 | 유형 | 목표 및 설명 |
| --- | --- | --- | --- |
| `find_ancient_city` | 사람이 없는데 도시가 있다 | Postgame | 고대 도시 발견 |
| `bring_wool` | 발소리도 포장해 드립니다 | Guide | 양털과 괭이 준비 권장 |
| `loot_city_chest` | 조용히 챙기고 조용히 나갑시다 | Postgame | 고대 도시 상자 전리품 획득 |
| `echo_shard` | 메아리만 남았습니다 | Postgame | 메아리 조각 획득 |
| `recovery_compass` | 잃어버린 나를 찾아서 | Postgame | 복구 나침반 제작 |
| `swift_sneak` | 조용하지만 빠르게 | Postgame | 신속한 잠행 마법책 획득 |
| `disc_fragment` | 조각난 음악의 기억 | Branch | 음반 파편 획득 |
| `music_disc_five` | 5번 트랙에는 사연이 있다 | Branch | 음반 5 제작 |

### 워든 대응

| ID | 제목 후보 | 유형 | 목표 및 설명 |
| --- | --- | --- | --- |
| `warden_warning` | 잡는 거 아닙니다 | Guide | 워든의 목적, 높은 공격력과 회피 원칙 설명 |
| `distract_with_projectile` | 소리는 저쪽에서 났습니다 | Guide | 눈덩이 또는 화살로 진동 유도 |
| `warden_spawned` | 올 것이 왔다 | Guide | 워든 출현 시 싸우지 말고 거리 확보 |
| `escape_warden` | 튀어! | Postgame | 워든을 공격하지 않고 고대 도시에서 생환 |
| `deep_dark_complete` | 들어갈 때보다 조용히 나왔다 | Challenge | 주요 전리품을 확보하고 오버월드로 귀환 |

`escape_warden`은 워든 처치 감지가 아니라 고대 도시 방문 이후 일정 거리 이탈 또는 귀환 아이템 감지로 구현합니다. 정확한 위치 감지가 어렵다면 수동 체크 또는 발전 과제 조합을 사용합니다.

## 17B장: 선택 보스 — 위더

위더는 플레이어가 의도적으로 소환하는 포스트게임 보스입니다. 엔더 드래곤과 에필로그를 마친 뒤 선택할 수 있으며, 최종 목적은 네더의 별과 신호기입니다.

### 소환 준비

| ID | 제목 후보 | 유형 | 목표 및 설명 |
| --- | --- | --- | --- |
| `wither_intro` | 내가 만든 보스에 내가 당한다 | Postgame | 위더 소환과 지형 파괴 위험 소개 |
| `soul_sand` | 영혼까지 끌어모았습니다 | Postgame | 영혼 모래 또는 영혼 흙 4개 준비 |
| `wither_skeleton` | 뼈대 있는 집안 | Postgame | 위더 스켈레톤 처치 |
| `wither_skull_one` | 머리 하나 주웠습니다 | Postgame | 위더 스켈레톤 해골 획득 |
| `wither_skulls_three` | 삼두정치의 시작 | Postgame | 해골 3개 준비 |
| `smite_weapon` | 언데드 특효약 | Guide | 강타 마법이 위더에게 유효함을 안내 |
| `milk_bucket` | 우유는 답을 알고 있다 | Guide | 위더 상태 효과 제거용 우유 준비 |
| `safe_wither_arena` | 장소 협찬은 지하에서 | Guide | 기지와 중요 시설에서 멀리 떨어진 전장 권장 |

### 위더전과 신호기

| ID | 제목 후보 | 유형 | 목표 및 설명 |
| --- | --- | --- | --- |
| `summon_wither` | 해골 세 개면 충분해 | Postgame | 위더 소환 |
| `wither_explosion` | 폭발은 예고되었습니다 | Guide | 생성 직후 폭발과 거리 확보 안내 |
| `wither_armor_phase` | 화살이 안 통한다고요? | Guide | 체력 절반 이하의 위더 갑옷과 근접전 설명 |
| `kill_wither` | 내가 소환하고 내가 잡는다 | Postgame | 위더 처치 |
| `nether_star` | 별이 빛나는 밤에 | Postgame | 네더의 별 획득 |
| `craft_beacon` | 빛이 있으라 2 | Postgame | 신호기 제작 |
| `activate_beacon` | 저 높은 곳을 향하여 | Postgame | 신호기 활성화 |
| `full_beacon` | 피라미드 사업 완공 | Challenge | 최대 단계 신호기 완성 |
| `all_beacon_effects` | 이 구역의 버프는 나야 | Challenge | 여러 신호기 효과 활용 안내 |
| `wither_complete` | 보스도 잡고 별도 따고 | Postgame | 위더 분기 완료 |

위더를 지하 기반 시설이나 Create 공장 가까이에서 소환하지 않도록 반복해서 경고합니다. 보상은 네더의 별을 추가 지급하지 않고 위더 테마 장식이나 기념품 정도로 제한합니다.

## 메인 진행 요약

```text
원목
→ 판자
→ 작업대
→ 나무 곡괭이
→ 조약돌
→ 돌 곡괭이
→ 화로와 횃불
→ 철
→ 철 곡괭이와 방패
→ 다이아몬드
→ 흑요석
→ 네더 차원문
→ 네더 요새
→ 블레이즈 막대
→ 엔더 진주
→ 엔더의 눈
→ 근거지
→ 엔드 차원문
→ 엔드 수정
→ 엔더 드래곤
→ 엔드 도시
→ 셜커 상자와 겉날개
→ 에필로그 완료
  ├─ Deep Dark 잠입 탐사
  └─ 위더 보스전과 신호기
```

## 예상 규모

- 메인 진행: 약 50개
- 생존 및 시스템 안내: 약 35개
- 생활과 탐험 선택 분기: 약 65개
- 에필로그: 약 13개
- Deep Dark 선택 분기: 약 20개
- 위더 선택 분기: 약 19개
- 전체 예상: 약 200개

처음부터 모두 구현하지 않고 다음 순서로 나누어 작업합니다.

1. 환영, 나무, 석기와 철기
2. 채광, 네더와 엔더의 눈
3. 드래곤전과 에필로그
4. 농사, 주민, 탐험과 레드스톤 분기
5. Deep Dark 선택 분기
6. 위더 선택 분기
7. 실제 플레이 테스트 후 제목, 설명과 보상 조정

## 참고 자료

- [Minecraft Wiki: Beginner's Guide](https://minecraft.wiki/w/Tutorial%3ABeginner%27s_guide)
- [Minecraft Wiki: Complete Main Adventure](https://minecraft.wiki/w/Tutorial%3AComplete_main_adventure)
- [Minecraft Wiki: Defeating the Ender Dragon](https://minecraft.wiki/w/Tutorial%3ADefeating_the_ender_dragon)

