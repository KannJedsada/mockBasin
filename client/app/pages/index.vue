<template>
  <div class="mx-auto">
    <div class="relative w-full">
      <!-- เอฟเฟคฝน -->
      <div class="pointer-events-none fixed z-[9999]">
        <!-- <RainEffect
          :drop-count="350"
          :is-drop="true"
          :is-flash="true" /> -->
      </div>

      <!-- Container สำหรับรูปภาพและ element ทั้งหมด -->
      <div
        class="relative w-full"
        ref="imageContainer">
        <!-- ภาพลุ่มน้ำ -->
        <img
          src="/images/water-diagram.png"
          :alt="`รูปภาพลุ่มน้ำ`"
          class="block w-full h-auto object-cover"
          ref="basinImage" />

        <!-- Overlay container สำหรับ element ทั้งหมดที่จะเกาะกับรูป -->
        <div
          class="absolute inset-0 pointer-events-none"
          :style="imageOverlayStyle">
          <!-- card water level -->
          <div
            v-for="(dam, index) in damStations"
            :key="index">
            <!-- Card แสดงข้อมูลระดับน้ำ -->
            <div
              class="absolute pointer-events-auto"
              :style="{
                left: `${(dam.xCard / imageOriginalWidth) * 100}%`,
                top: `${(dam.yCard / imageOriginalHeight) * 100}%`,
                transform: `translate(-50%, -50%) scale(${inverseScale})`,
                zIndex: 15,
              }">
              <DamCard
                :name="dam.name"
                :use="dam.dam_use"
                :storage="dam.dam_storage" />
            </div>
            <div
              class="absolute pointer-events-auto"
              :style="{
                left: `${(dam.xUse / imageOriginalWidth) * 100}%`,
                top: `${(dam.yUse / imageOriginalHeight) * 100}%`,
                transform: `translate(-50%, -50%) scale(${inverseScale})`,
                zIndex: 15,
              }">
              <UseStoragePercented
                :use="dam.dam_use"
                :storage="dam.dam_storage" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import RainEffect from '~/components/RainEffect.vue'
  import { DamStation, WaterStation } from '../enums/station-diagram'

  const damStations = Object.values(DamStation)
  const waterStations = Object.values(WaterStation)

  const imageOriginalWidth = ref(1920)
  const imageOriginalHeight = ref(1080)

  const screenWidth = ref(1920)
  const screenHeight = ref(1080)
  const imageContainer = ref(null)
  const basinImage = ref(null)

  const currentImageWidth = ref(1920)
  const currentImageHeight = ref(1080)

  // คำนวณ scale ปัจจุบันของรูปภาพ
  const imageScale = computed(() => {
    if (!currentImageWidth.value || !imageOriginalWidth.value) return 1
    return currentImageWidth.value / imageOriginalWidth.value
  })

  // คำนวณ inverse scale เพื่อให้ element ไม่ขยายตาม
  const inverseScale = computed(() => {
    return 1 / imageScale.value
  })

  const imageOverlayStyle = computed(() => {
    return {
      width: '100%',
      height: '100%',
    }
  })

  // ฟังก์ชันอัพเดทขนาดหน้าจอและรูปภาพ
  const updateDimensions = () => {
    screenWidth.value = window.innerWidth
    screenHeight.value = window.innerHeight

    if (basinImage.value) {
      const img = basinImage.value as HTMLImageElement
      currentImageWidth.value = img.offsetWidth
      currentImageHeight.value = img.offsetHeight
    }
  }

  // เมื่อ component mount
  onMounted(() => {
    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    // อัพเดทเมื่อรูปโหลดเสร็จ
    if (basinImage.value) {
      const img = basinImage.value as HTMLImageElement
      img.onload = updateDimensions
    }
  })

  // เมื่อ component unmount
  onUnmounted(() => {
    window.removeEventListener('resize', updateDimensions)
  })
</script>
