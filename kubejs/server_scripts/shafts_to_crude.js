ServerEvents.recipes(event => {
  // 바닐라 동력 부품을 쓰는 레시피를 전부 Crude 부품으로 갈아끼운다.
  //
  // kinetic_tiers.js가 바닐라 축과 톱니바퀴의 제작법을 없앴으므로, 그것들을
  // 재료로 요구하는 레시피를 그대로 두면 만들 수 없는 재료를 요구하게 된다.
  // Create 본체만이 아니라 Rubberworks, Treadmill, Metallurgy, Vintage 등
  // 확장 모드 전반에 걸쳐 있다.
  //
  // 재료뿐 아니라 결과물도 함께 바꾼다. 정밀 기계의 순차 조립처럼 부산물로
  // 바닐라 톱니바퀴를 뱉는 레시피가 있어서, 재료만 바꾸면 만들 수 없는
  // 부품이 부산물로만 나오는 이상한 상태가 된다.
  //
  // 이 스크립트는 kinetic_tiers.js와 rpm_machines.js, rpm_conversion.js보다
  // 뒤에 실행되어야 한다. KubeJS는 파일 이름 순서로 읽으므로 s로 시작하는
  // 이 이름이 k와 r보다 뒤에 온다.
  const SWAP = {
    'create:shaft': 'createtiers:shaft_crude',
    'create:cogwheel': 'createtiers:cogwheel_crude',
    'create:large_cogwheel': 'createtiers:large_cogwheel_crude',
    'create:gearbox': 'createtiers:gearbox_crude',
    'create:vertical_gearbox': 'createtiers:vertical_gearbox_crude'
  }

  // 갈아끼우면 안 되는 레시피. Crude 부품 자체를 만드는 제작법이 여기 걸리면
  // 재료와 결과가 같아져 버린다.
  const KEEP = id => id.startsWith('kubejs:crafting/shaft_crude') ||
    id.startsWith('kubejs:cutting/shaft_crude') ||
    id.indexOf('_crude') !== -1

  let swapped = 0
  let skipped = 0
  const targets = []

  event.forEachRecipe({}, r => {
    const id = String(r.id)
    if (KEEP(id)) return
    const json = r.originalJson
    if (!json) return
    const text = json.toString()
    if (!Object.keys(SWAP).some(k => text.indexOf(k) !== -1)) return

    let copy
    try {
      copy = JSON.parse(text)
    } catch (e) {
      skipped++
      return
    }
    targets.push([id, copy])
  })

  // 문자열 값이 대상이면 바꾸는 재귀 치환. 재료와 결과를 가리지 않는다.
  //
  // 내부 변수는 반드시 var나 let으로 선언한다. KubeJS의 Rhino 엔진은 재귀
  // 호출에서 const를 다시 만나면 'redeclaration of var' 오류를 내고 스크립트
  // 전체가 죽는다.
  function convert(node) {
    if (node === null || node === undefined) return node
    if (Array.isArray(node)) {
      var arr = []
      for (var i = 0; i < node.length; i++) arr.push(convert(node[i]))
      return arr
    }
    if (typeof node === 'string') return SWAP[node] || node
    if (typeof node === 'object') {
      var out = {}
      var keys = Object.keys(node)
      for (var j = 0; j < keys.length; j++) out[keys[j]] = convert(node[keys[j]])
      return out
    }
    return node
  }

  targets.forEach(pair => {
    const id = pair[0]
    // type 값은 치환 대상이 아니므로 그대로 살아남는다.
    const built = convert(pair[1])

    event.remove({ id: id })
    event.custom(built).id(`kubejs:crude/${id.replace(':', '/')}`)
    swapped++
  })

  if (skipped) {
    console.warn(`[Crude 치환] ${skipped}개 레시피를 읽지 못해 건너뜀`)
  }
  console.info(`[Crude 치환] ${swapped}개 레시피의 동력 부품을 Crude로 교체`)
})
