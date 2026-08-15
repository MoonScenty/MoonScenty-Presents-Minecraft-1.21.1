// Create: Metallurgy의 용융 유체(CMFluids)와 동일한 속성으로 맞춘다.
// 표준 금속: viscosity 2000 / density 1400 / lightLevel 10 / explosionResistance 100
// 광재(slag)처럼 금속이 아닌 용융물은 viscosity 2500을 쓴다.
const SoundActions = Java.loadClass('net.neoforged.neoforge.common.SoundActions')
const SoundEvents = Java.loadClass('net.minecraft.sounds.SoundEvents')

const MOLTEN_FLUIDS = [
  // id, 표시명, 점도
  ['molten_andesite', 'Molten Andesite', 2500],
  ['molten_andesite_alloy', 'Molten Andesite Alloy', 2000]
]

StartupEvents.registry('fluid', event => {
  MOLTEN_FLUIDS.forEach(([id, name, viscosity]) => {
    event.create(id)
      .displayName(name)
      .stillTexture(`kubejs:block/${id}_still`)
      .flowingTexture(`kubejs:block/${id}_flow`)
      .explosionResistance(100)
      .tag(['createmetallurgy:molten_material', 'create:bottomless/deny'])
      .type(type => {
        type.viscosity(viscosity)
          .density(1400)
          .lightLevel(10)
          .sound(SoundActions.BUCKET_EMPTY, SoundEvents.BUCKET_EMPTY_LAVA)
          .sound(SoundActions.BUCKET_FILL, SoundEvents.BUCKET_FILL_LAVA)
          .canHydrate(false)
          .canDrown(false)
          .canSwim(false)
          .canExtinguish(false)
      })
  })
})
