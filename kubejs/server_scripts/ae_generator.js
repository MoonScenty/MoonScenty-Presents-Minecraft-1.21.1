// AE 전력.
//
// 이 모드팩의 AE는 Create AE Generator의 운동 에너지 수용기로만 만든다.
// FE 환율을 ae2-common.toml에서 사실상 0으로 내려 두었으므로 다른 모드의
// 발전기를 끌어와도 AE는 차지 않는다.
//
// 그래서 이 블록 하나가 AE2 전체의 관문이다. 원본 제작법은 두 군데가
// 막혀 있어 손을 봐야 한다.
//
//   축     바닐라 축은 안산암 합금 시대에 제작법을 지웠다. 티어 축으로 바꾼다.
//   액정 수정  Charger가 돌아가야 나오는데 Charger는 AE 전력을 먹는다. 순환이다.
//
// 액정 수정을 서투스 석영 수정으로 바꾸면 순환이 풀린다. 서투스는 캐거나
// 물에 심어 기르면 되고 충전 공정을 거치지 않는다.
//
//   실리콘 -> 에너지 수용기 -> 구리 코일 -> 스테이터
//          -> 운동 에너지 수용기 -> Charger -> 액정 수정

const SHAFT = 'createtiers:shaft_andesite_alloy'

ServerEvents.recipes(event => {
  event.remove({ id: 'create_ae_generator:kinetic_acceptor' })

  event.shaped('create_ae_generator:kinetic_acceptor', [
    ' T ',
    'SCS',
    ' Q '
  ], {
    T: 'create_ae_generator:stator',
    S: SHAFT,
    C: 'ae2:energy_acceptor',
    Q: 'ae2:certus_quartz_crystal'
  }).id('kubejs:crafting/kinetic_acceptor')
})
