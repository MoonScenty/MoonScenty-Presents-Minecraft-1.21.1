## Hammer
### 설명 
- Create: Diesel Generators 모드에 있는 해머를 사용
- ingot이랑 조합 시 plate를 제작하고 내구도를 소모
- 내구도는 20회 사용 분량
```Javascript
// kubejs/startup_scripts/hammer.js
ItemEvents.modification(event => {
    event.modify('createdieselgenerators:hammer', item => {
        item.maxDamage = 20
    })
})
```
## Wire Cutter
### 설명 
- Create: Diesel Generators 모드에 있는 니퍼를 사용
- plate랑 조합 시 wire를 제작하고 내구도를 소모
- 내구도는 20회 사용 분량
```Javascript
// kubejs/startup_scripts/wire_cutter.js
ItemEvents.modification(event => {
    event.modify('createdieselgenerators:wire_cutters', item => {
        item.maxDamage = 20
    })
})
```

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

### 코드
```javascript
MBDMachineEvents.onTick('mbd2:coke_oven_core', event => {
    const machine = event.getEvent().getMachine();
    const level = machine.getLevel();

    const burnerPos = machine.getPos().offset(0, 1, 0);

    const block = level.getBlock(burnerPos);
    const blockId = String(block.id);

    if (blockId !== 'kubejs:coke_oven_bricks') {
        machine.getCustomData().putBoolean("isHereBricks", false);
        return;
    }
    machine.getCustomData().putBoolean("isHereBricks", true);

});
```

## Blaze Burner
### 설명
- 연료는 Coal Coke와 Blaze Cake만 받음
### 코드
```javascript
// 이전 버전에서는 태그로 구분이 가능했었는데 datamap으로 바꿨더라... 후
const RecipeType = Java.loadClass("net.minecraft.world.item.crafting.RecipeType");

BlockEvents.rightClicked("create:blaze_burner", event => {
    const stack = event.player.mainHandItem;

    if (stack.empty) return;

    const burnTime = getBurnTime(stack);

    // 허용 연료
    if (stack.id === "kubejs:coal_coke") {
        return;
    }

    if (stack.id === "create:blaze_cake") {
        return;
    }

    // 그 외 furnace fuel은 Blaze Burner에서만 차단
    if (burnTime > 0) {
        event.cancel();
        return;
    }

});

function getBurnTime(stack) {
    try {
        return stack.getBurnTime(RecipeType.SMELTING);
    } catch (e) {
        //console.info("getBurnTime(RecipeType.SMELTING) failed: " + e);
    }

    return 0;
}
```

## Blast Furnace(Multi Block)
### 설명
- 1 x 2 x 1(W x H x D) 크기의 멀티 블록
- 하단에는 Blast Furnace Core, 상단에는 Blast Furnace Bricks으로 구성
- SU를 받음
- 동작에 필요한 토크 8, 256 SU
- 동작에는 Core 밑에 Blaze Burner가 필요

### 코드
```javascript
const BlazeBurnerBlock = Java.loadClass(
    "com.simibubi.create.content.processing.burner.BlazeBurnerBlock"
);

MBDMachineEvents.onTick('mbd2:blast_furnace_core', event => {
    const machine = event.getEvent().getMachine();
    const level = machine.getLevel();

    const bricksPos = machine.getPos().offset(0, 1, 0);
    const bricksBlock = level.getBlock(bricksPos);
    const bricksBlockId = String(bricksBlock.id);

    const burnerPos = machine.getPos().offset(0, -1, 0);
    const burnerBlock = level.getBlock(burnerPos);
    const burnerBlockId = String(burnerBlock.id);

    if (bricksBlockId != 'kubejs:blast_furnace_bricks') {
        machine.getCustomData().putBoolean("isHereBricks", false);
        machine.getCustomData().putBoolean("heated", false);
        machine.getCustomData().putBoolean("superHeated", false);
        return;
    }

    machine.getCustomData().putBoolean("isHereBricks", true);

    if (burnerBlockId !== "create:blaze_burner") {
        machine.getCustomData().putBoolean("heated", false);
        machine.getCustomData().putBoolean("superHeated", false);
        return;
    }

    const state = level.getBlockState(burnerPos);
    const heatLevel = String(state.getValue(BlazeBurnerBlock.HEAT_LEVEL)).toUpperCase();

    machine.getCustomData().putBoolean(
        "heated",
        heatLevel === "KINDLED" || heatLevel === "SEETHING"
    );

    machine.getCustomData().putBoolean(
        "superHeated",
        heatLevel === "SEETHING"
    );

});
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

## Stirling Engine
### 설명
- 옛날 버전에 있던 그 엔진이 맞음(!!!)
- Furnace 위에 올려서 씀
- Flywheel 필요

### Stirling Engine (Create: Dreams n' Desires)
| 재료 | 재료 | 재료 |
|----------|--------|--------|
| x | HDG Steel Sheet | x |
| x | HDG Steel Mechanism Block | x |
| x | HDG Steel Block | x |

## Flywheel
### 설명
- 레시피 변경 및 텍스쳐 변경

### Flywheel (Create)
| 재료 | 재료 | 재료 |
|----------|--------|--------|
| HDG Steel | HDG Steel | HDG Steel |
| HDG Steel | Shaft | HDG Steel |
| HDG Steel | HDG Steel | HDG Steel |

## Water Wheel and Large Water Wheel
### 설명
- 밴

## Windmill Bearing
### 설명
- 밴

## Mechanical Press
### 설명
- 레시피 변경

### Mechanical Press(Create)
| 재료 | 재료 | 재료 |
|----------|--------|--------|
| x | Shaft | x |
| x | HDG Steel Mechanism Block | x |
| x | HDG Steel Block | x |

## Rolling Mill
### 설명
- 레시피 변경

### Rolling Mill(Create Crafts & Additions)
| 재료 | 재료 | 재료 |
|----------|--------|--------|
| HDG Steel Sheet | Shaft | HDG Steel Sheet |
| HDG Steel | Shaft | HDG Steel |
| HDG Steel | HDG Steel Mechanism Block | HDG Steel |

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

## Millstone
### 설명
- 레시피 변경
  
### Millstone(Create)
| 재료 | 재료 | 재료 |
|----------|--------|--------|
| x | Industrial Cogwheel | x |
| x | HDG Steel Mechanism Block | x |
| x | HDG Steel Block | x |

## Encased Fan
### 설명
- 레시피 변경

### Encased Fan(Create)
| 재료 | 재료 | 재료 |
|----------|--------|--------|
| x | Shaft | x |
| x | HDG Steel Mechanism Block | x |
| x | Propeller | x |

## Propeller
### 설명
- 레시피 변경

### Propeller(Create)
| 재료 | 재료 | 재료 |
|----------|--------|--------|
| x | HDG Steel Sheet | x |
| HDG Steel Sheet | Andesite Alloy | HDG Steel Sheet |
| x | HDG Steel Sheet | x |

## Polished Brass Ingot
### 설명
- Brass Ingot 을 Bulk sanding

## Polished Brass Sheet
- Polished Brass Ingot 을 납작하게
