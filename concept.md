## 해머
### 설명 
- Create: Diesel Generators 모드에 있는 해머를 사용
- ingot이랑 조합 시 plate를 제작하고 내구도를 소모
- 내구도는 20회 사용 분량

## 니퍼
### 설명 
- Create: Diesel Generators 모드에 있는 니퍼를 사용
- plate랑 조합 시 wire를 제작하고 내구도를 소모
- 내구도는 20회 사용 분량

## Coke Oven(Multi Block)
### 설명
- 1 x 2 x 1(W x H x D) 크기의 멀티 블록
- 하단에는 Coke Oven Core, 상단에는 Coke Oven Bricks으로 구성
- SU를 받음
- 동작에 필요한 토크 8, 256 SU

### 레시피
  
| 입력 | 출력 | 크레오소트 | 소요시간 |
|----------|--------|--------|--------|
| 원목 | 목탄 | 100 mb | 5 초 |
| 목탄 | Coal Coke | 100 mb | 5 초 |
| 석탄 | Coal Coke | 500 mb | 5 초 |

### Coke Oven Core(MultiBlocked2)
| 재료 | 재료 | 재료 |
|----------|--------|--------|
| Clay | Brick | Clay |
| Brick | Furnace | Brick |
| Clay | Brick | Clay |

### Coke Oven Bricks(KubeJS)
| 재료 | 재료 | 재료 |
|----------|--------|--------|
| Clay | Brick | Clay |
| Brick | Sand Stone(c:sandstone) | Brick |
| Clay | Brick | Clay |

## Blaze Burner
### 변겅점
연료는 Coal Coke와 Blaze Cake만 받음

## Blast Furnace(Multi Block)
### 설명
- 1 x 2 x 1(W x H x D) 크기의 멀티 블록
- 하단에는 Blast Furnace Core, 상단에는 Blast Furnace Bricks으로 구성
- SU를 받음
- 동작에 필요한 토크 8, 256 SU
- 동작에는 Core 밑에 Blaze Burner가 필요

### 코드
```Java
MBDMachineEvents.onTick("machine:id", event => {
    var machine = event.getEvent().getMachine();
    var dir = machine.getPos().offset(multiplyVector(machine.getFrontFacing().get().getNormal(), 0,0,-1)).offset(0,-1,0/*<<<<< offset here*/);
    if(machine.level.getBlock(dir).id != "create:blaze_burner") console.error("Expected blaze burner, got " + machine.level.getBlock(dir).id); // this line is for debugging, if it works, remove for performance
    var heat = machine.getLevel().getBlockEntity(dir).saveWithId().get("fuelLevel");
    machine.getCustomData().putBoolean("heated", heat > 0);
    machine.getCustomData().putBoolean("superHeated", heat > 1);
    
});

function multiplyVector(vec, x, y, z) {
    return new Vec3i(vec.getX() * x, vec.getY() * y, vec.getZ() * z);
}
```

### 레시피
| 입력 | 입력2 | 입력3 | 출력 | 소요시간 |
|----------|--------|--------|--------|--------|
| Zinc Ingot | Redstone Dust | Iron Ingot | HDG Steel Ingot | 5 초 | 

### Blast Furnace Core(MultiBlocked2)
| 재료 | 재료 | 재료 |
|----------|--------|--------|
| Nether Brick | Brick | Nether Brick |
| Brick | Furnace | Brick |
| Nether Brick | Brick | Nether Brick |

### Blast Furnace Bricks(KubeJS)
| 재료 | 재료 | 재료 |
|----------|--------|--------|
| Nether Brick | Brick | Nether Brick |
| Brick | Blaze Rod | Brick |
| Nether Brick | Brick | Nether Brick |

## HDG Steel Mechanism Block
### 설명
- 기계를 이루는 기본 단계 블록
### HDG Steel Mechanism Block(KubeJS)
| 재료 | 재료 | 재료 |
|----------|--------|--------|
| HDG Steel | Industrial Cogwheel | HDG Steel |
| Industrial Cogwheel | Andesite Casing | Industrial Cogwheel |
| HDG Steel | Industrial Cogwheel | HDG Steel |

## Industrial Cogwheel(Design n' Decor)
### 설명
- 기존의 나무로 된 cogwheel들은 모두 밴(안타까운 이야기입니다)
- 기존의 cogwheel을 Industrial Cogwheel로 교체

## Industrial Ingot
- 모든 Industrial Ingot을 Create Deco 모드로 통일(Create: More Bridges)

## Mechanical Press
### 설명
- 레시피 변경

### Mechanical Press(Create)
| 재료 | 재료 | 재료 |
|----------|--------|--------|
| x | Shaft | x |
| x | HDG Steel Mechanism Block | x |
| x | HDG Steel Block | x |


## Mechanical Mixer
### 설명
- 레시피 변경
  
### Mechanical Mixer(Create)
| 재료 | 재료 | 재료 |
|----------|--------|--------|
| x | Industrial Cogwheel | x |
| x | HDG Steel Mechanism Block | x |
| x | Whisk | x |

## Whisk
### 설명
- 레시피 변경


### Whisk(Create)
| 재료 | 재료 | 재료 |
|----------|--------|--------|
| x | Andesite Alloy | x |
| HDG Steel Sheet | Andesite Alloy | HDG Steel Sheet |
| HDG Steel Sheet | Iron Sheet | HDG Steel Sheet |
