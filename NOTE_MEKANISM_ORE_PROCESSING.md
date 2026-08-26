# Mekanism 광물 정제 정리

Mekanism은 이 모드팩에 들어 있지 않습니다. **참고용 조사 기록**입니다.

이 모드의 광물 정제는 티어가 넷이고, **위 티어가 아래 티어를 통째로 뒤에 달고 갑니다.** 그래서 배수가 하나 오를 때마다 사슬이 앞쪽으로 자라고, 새로 요구하는 화학물질이 자기 설비를 따로 끌고 옵니다. 티어별로 나눠 적는 이유가 그것입니다.

기계 이름은 영문을 기준으로 씁니다. 이 팩에 없는 모드라 따라갈 인게임 표기가 없습니다.

## 한눈에

| 티어 | 배수 | 새 기계 | 새로 필요한 화학물질 | 광석→주괴 단계 |
| --- | --- | --- | --- | --- |
| — | ×1 | 화로 | — | 1 |
| 1 | **×2** | Enrichment Chamber | — | 2 |
| 2 | **×3** | Purification Chamber · Crusher | **산소** | 4 |
| 3 | **×4** | Chemical Injection Chamber · Chemical Infuser | **염화수소** | 5 |
| 4 | **×5** | Chemical Dissolution Chamber · Chemical Washer · Chemical Crystallizer | **황산** | 8 |

배수는 **실크터치로 캔 광석 블록** 기준입니다. 원석(raw ore)을 넣어도 돌아가지만 배수가 깔끔하지 않습니다. 아래 「입력에 대하여」에서 다시 씁니다.

---

## 티어 1 — ×2

```
광석 → Enrichment Chamber → 가루 2 → 제련 → 주괴 2
```

**기계 하나, 단계 둘.** 화학물질이 필요 없습니다.

여기까지는 다른 모드의 분쇄기와 다를 것이 없습니다. Create의 분쇄 휠, Mekanism의 Enrichment Chamber, 어느 쪽이든 광석 하나가 가루 둘이 되는 같은 이야기입니다.

**Mekanism이 특별해지는 것은 티어 2부터입니다.**

---

## 티어 2 — ×3

```
광석 + 산소 → Purification Chamber → 덩어리 3
덩어리        → Crusher             → 더러운 가루 3
더러운 가루    → Enrichment Chamber  → 가루 3
가루          → 제련                → 주괴 3
```

기계가 **둘 늘고**(Purification Chamber, Crusher) 단계가 **둘에서 넷으로** 늘어납니다.

### 여기서 처음 기체가 등장합니다

산소를 만들려면 별도의 설비가 필요합니다.

```
물 → Electric Pump → Electrolytic Separator → 산소 + 수소
```

**이것이 이 시스템의 성격을 결정하는 지점입니다.** 광물 라인 옆에 **화학 라인**이 따로 서기 시작합니다. Electrolytic Separator는 광석을 만지지 않지만 없으면 라인 전체가 멈춥니다.

부산물로 나오는 수소는 Gas-Burning Generator에 태워 전력으로 되돌릴 수 있습니다. 버리는 것이 아니라 회수하는 구조입니다.

### 티어 2의 진짜 비용

| | |
| --- | --- |
| 광물 라인 | Purification Chamber · Crusher · Enrichment Chamber · 제련 |
| 화학 라인 | Electric Pump · Electrolytic Separator |
| 합계 | **기계 6종** |

×2에서 ×3으로 **50% 늘리는 대가로 기계가 하나에서 여섯이 됩니다.**

---

## 티어 3 — ×4

```
광석 + 염화수소 → Chemical Injection Chamber → 파편 4
파편 + 산소     → Purification Chamber       → 덩어리 4
덩어리          → Crusher                    → 더러운 가루 4
더러운 가루      → Enrichment Chamber         → 가루 4
가루            → 제련                       → 주괴 4
```

**티어 2의 사슬이 통째로 뒤에 붙습니다.** 앞에 한 단계가 끼어들 뿐입니다. 이 패턴이 티어 4까지 그대로 이어집니다.

### 염화수소가 끌고 오는 것

산소보다 훨씬 깁니다.

```
물 → Electric Pump → Thermal Evaporation Plant → 소금물(Brine)
소금물 → Electrolytic Separator → 나트륨 + 염소
수소(물 전기분해에서) + 염소 → Chemical Infuser → 염화수소
```

**Thermal Evaporation Plant는 멀티블록입니다.** 기계 한 대가 아니라 구조물을 세워야 하고, 넓이와 높이에 따라 처리량이 달라집니다.

그리고 눈여겨볼 것 — **티어 2에서 만들던 수소가 여기서 재료가 됩니다.** 버리던 부산물이 상위 티어의 필수 재료로 승격합니다. 티어 2를 제대로 지어 둔 사람이 티어 3에서 이득을 봅니다.

### 티어 3의 비용

| | |
| --- | --- |
| 광물 라인 | + Chemical Injection Chamber |
| 화학 라인 | + Thermal Evaporation Plant(멀티블록) · Chemical Infuser |
| 합계 | **기계 9종** (멀티블록 하나 포함) |

---

## 티어 4 — ×5

```
광석 + 황산       → Chemical Dissolution Chamber → 더러운 슬러리
더러운 슬러리 + 물 → Chemical Washer             → 깨끗한 슬러리
깨끗한 슬러리      → Chemical Crystallizer       → 결정 5
결정 + 염화수소    → Chemical Injection Chamber  → 파편 5
파편 + 산소       → Purification Chamber        → 덩어리 5
덩어리            → Crusher                     → 더러운 가루 5
더러운 가루        → Enrichment Chamber          → 가루 5
가루              → 제련                        → 주괴 5
```

**여덟 단계입니다.** 티어 3의 다섯 단계가 그대로 뒤에 남고 앞에 셋이 붙었습니다.

### 황산이 끌고 오는 것 — 여기가 절정입니다

```
화약 + 염화수소 → Chemical Injection Chamber → 황
황              → Chemical Oxidizer          → 이산화황
이산화황 + 산소  → Chemical Infuser           → 삼산화황
물              → Rotary Condensentrator     → 수증기
수증기 + 삼산화황 → Chemical Infuser          → 황산
```

**황산 하나를 만드는 데 다섯 단계가 듭니다.** 그리고 그 안에 **염화수소와 산소가 둘 다 들어갑니다.**

즉 티어 4의 화학 라인은 티어 3의 화학 라인 위에, 티어 3의 화학 라인은 티어 2의 화학 라인 위에 얹혀 있습니다. **삼중으로 쌓입니다.**

황이 **화약에서 나온다**는 점도 특이합니다. 광물 라인이 크리퍼 사냥이나 마녀 농장에 의존하게 됩니다. Mekanism 안에 황 광석이 따로 없어서 그렇습니다.

### 티어 4의 비용

| | |
| --- | --- |
| 광물 라인 | Enrichment Chamber · Crusher · Purification Chamber · Chemical Injection Chamber · Chemical Dissolution Chamber · Chemical Washer · Chemical Crystallizer · Energized Smelter |
| 화학 라인 | Electric Pump · Electrolytic Separator · Chemical Infuser · Chemical Oxidizer · Rotary Condensentrator · Thermal Evaporation Plant |
| 합계 | **기계 14종** |

---

## 복잡도가 어떻게 불어나는가

| 티어 | 배수 | 광물 단계 | 누적 기계 | 배수 1 올리는 데 든 기계 |
| --- | --- | --- | --- | --- |
| 1 | ×2 | 2 | 2 | — |
| 2 | ×3 | 4 | 6 | +4 |
| 3 | ×4 | 5 | 9 | +3 |
| 4 | ×5 | 8 | 14 | +5 |

**배수는 산술적으로 오르는데 설비는 그렇지 않습니다.** ×2에서 ×5로 2.5배 늘리는 데 기계가 7배가 됩니다.

이 구조가 성립하는 이유가 셋 있습니다.

1. **앞에 붙는다.** 새 티어는 기존 사슬을 갈아엎지 않고 앞에 단계를 더합니다. 그래서 이미 지은 설비가 버려지지 않습니다.
2. **부산물이 승격한다.** 티어 2의 수소가 티어 3의 재료가 되고, 티어 3의 염화수소가 티어 4의 재료가 됩니다.
3. **화학 라인이 따로 산다.** 광물을 만지지 않는 기계가 절반 가까이 됩니다. 이것들이 멈추면 광물 라인도 멈춥니다.

**세 번째가 이 시스템의 핵심입니다.** 플레이어가 짓는 것은 광물 정제 라인이 아니라 **광물 정제 라인을 먹여 살리는 화학 공장**입니다.

---

## 입력에 대하여

배수는 **실크터치로 캔 광석 블록** 기준입니다.

| 입력 | 결과 |
| --- | --- |
| 실크터치 광석 블록 | ×2 · ×3 · ×4 · ×5 정확히 |
| 원석(raw ore) | 배수가 낮고 딱 떨어지지 않습니다. 최대 3.33배 정도 |

1.17 이후 바닐라가 원석을 도입하면서 이 부분이 어정쩡해졌습니다. 모드팩에 따라 원석 기준으로 다시 짜는 곳도 있습니다.

## 티어 밖의 것들

- **Factory** — Basic / Advanced / Elite / Ultimate 네 등급이 있고, 같은 기계를 여러 줄로 병렬 처리합니다. 배수를 올리는 것이 아니라 **처리량**을 올립니다.
- **Digital Miner** — 자동 채굴. 실크터치를 걸 수 있어 상위 티어 입력을 대량으로 댑니다.
- **Gas-Burning Generator** — 남는 수소를 태워 전력을 회수합니다.

## 이 모드팩에 시사하는 것

Mekanism은 넣지 않습니다. 기술축은 Create 애드온으로 채우는 것이 이 팩의 원칙입니다.

다만 **구조는 참고할 만합니다.**

- 앞에 붙이는 방식은 **이미 지은 설비를 버리지 않게** 합니다. 이 팩의 티어 승급(안산암 → 황동 → 강철)이 같은 성질입니다.
- 부산물을 상위 티어 재료로 승격시키는 것은 **이전 시대를 계속 돌게 만드는** 장치입니다. 지금은 정제 코크스가 그 자리에 가깝습니다.
- 반대로 **경계할 것도 분명합니다.** 화학 라인 여섯 대가 광물을 하나도 만지지 않으면서 필수인 구조는, 재미와 지겨움의 경계가 얇습니다. Mekanism이 호불호가 갈리는 지점이기도 합니다.

## 참고 자료

- [Ore Processing — Official Mekanism Wiki](https://wiki.aidancbrady.com/wiki/Ore_Processing)
- [Tutorials/Advanced Ore Processing Setup — Official Mekanism Wiki](https://wiki.aidancbrady.com/wiki/Tutorials/Advanced_Ore_Processing_Setup)
- [Mastering Mekanism: Ore Processing from 2x, 3x, 4x to 5x — Jangro](https://jangro.com/2024/12/22/mastering-mekanism-ore-processing-from-2x-3x-4x-to-5x)
- [Mekanism Ore Processing Guide — Craft Down Under](https://forum.playcdu.co/threads/mekanism-ore-processing-guide.711/)
