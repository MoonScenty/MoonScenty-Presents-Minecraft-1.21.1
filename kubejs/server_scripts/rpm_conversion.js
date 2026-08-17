ServerEvents.recipes(event => {
  // Create의 가공 레시피를 RPM 인식 레시피로 통째로 옮긴다.
  //
  // RPM 기계는 원본 Create 기계와 별개라 원본 타입 레시피를 인식하지 못한다.
  // 원본 기계 제작법을 막아둔 상태이므로, 레시피도 함께 옮기지 않으면
  // 해당 공정이 통째로 사라진다.
  //
  // min_rpm 32는 기본값이다. Crude 티어 상한이 32 RPM이므로 이 시대의
  // 동력으로 도달할 수 있는 최고 속도이며, 그 아래에서는 아무것도 처리되지
  // 않는다. 특정 레시피에 차등을 두고 싶으면 별도 스크립트에서 더 높은
  // min_rpm 판본을 추가하면 된다. 같은 입력에 여러 판본이 있으면 현재 RPM을
  // 넘지 않는 것 중 가장 높은 min_rpm이 선택된다.
  const BASE_RPM = 32

  // 기본값보다 높은 RPM을 요구할 레시피. 원본 레시피 ID로 지정한다.
  //
  // 꽃 압축 고무는 압착기와 대야만으로 고무를 뽑아내서, 수액 채취기와
  // 압축기를 세우는 과정을 통째로 건너뛴다. 화로 엔진이 고무 시트를
  // 요구하는 이유가 사라지므로 Rough 티어(64)로 올려 황동 시대의 편의
  // 레시피로 미룬다. 안산암 시대에는 채취기 경로만 남는다.
  const OVERRIDE_RPM = {
    'rubberworks:compacting/rubber': 64
  }

  const CONVERT = {
    'create:milling': 'createrecipeneedrpm:rpm_milling',
    'create:crushing': 'createrecipeneedrpm:rpm_crushing',
    'create:mixing': 'createrecipeneedrpm:rpm_mixing',
    'create:compacting': 'createrecipeneedrpm:rpm_compacting',
    'create:pressing': 'createrecipeneedrpm:rpm_pressing'
  }

  let moved = 0
  let skipped = 0
  let tiered = 0

  Object.keys(CONVERT).forEach(from => {
    const to = CONVERT[from]

    event.forEachRecipe({ type: from }, r => {
      const json = r.originalJson
      if (!json) {
        skipped++
        return
      }

      // 원본 JSON을 그대로 옮기고 타입과 min_rpm만 바꾼다.
      // 결과, 처리 시간, 가열 조건 같은 나머지 값은 손대지 않는다.
      const copy = JSON.parse(json.toString())
      delete copy.type
      delete copy.min_rpm

      const id = String(r.id)
      const built = Object.assign({ type: to }, copy)
      built.min_rpm = OVERRIDE_RPM[id] || BASE_RPM

      if (OVERRIDE_RPM[id]) tiered++

      // 원본 ID를 그대로 물려받되 네임스페이스만 바꿔 충돌을 피한다.
      event.custom(built).id(`kubejs:rpm/${id.replace(':', '/')}`)
      moved++
    })
  })

  // 옮긴 뒤 원본 타입을 통째로 지운다.
  //
  // 레시피 제거는 ID로 하는 것이 원칙이지만 여기는 예외다. 대상이 900개가
  // 넘고 모드가 늘어날 때마다 바뀌므로 ID를 일일이 적는 것은 유지할 수 없다.
  // 타입 전체를 옮긴 직후 같은 타입을 전부 지우는 것이므로 무엇이 사라지는지
  // 명확하고, 원본 기계 자체를 만들 수 없어 남겨두면 JEI만 어지럽힌다.
  Object.keys(CONVERT).forEach(from => event.remove({ type: from }))

  const expected = Object.keys(OVERRIDE_RPM).length
  if (tiered !== expected) {
    console.warn(`[RPM 변환] 상향 대상 ${expected}개 중 ${tiered}개만 적용됨. OVERRIDE_RPM의 레시피 ID를 확인할 것`)
  }

  console.info(`[RPM 변환] ${moved}개 이전, ${skipped}개 건너뜀, ${tiered}개 상향 (기본 min_rpm ${BASE_RPM})`)
})
