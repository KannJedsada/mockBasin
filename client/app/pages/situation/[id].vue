<template>
  <div class="mx-auto px-4 py-8">
    <div
      v-if="loading"
      class="text-center py-4"
    >
      <p>กำลังโหลดข้อมูล...</p>
    </div>

    <div
      v-else-if="error"
      class="text-red-500 text-center py-4"
    >
      <p>{{ error }}</p>
    </div>

    <div
      v-else
      class="fixed inset-0 w-screen h-screen overflow-hidden"
    >
      <!-- เอฟเฟคฝน -->
      <RainEffect
        :drop-count="350"
        :is-drop="true"
        :is-flash="true"
      />

      <!-- Container สำหรับรูปภาพและ element ทั้งหมด -->
      <div
        class="relative w-full h-full flex items-center justify-center"
        ref="imageContainer"
      >
        <!-- ภาพลุ่มน้ำ -->
        <img
          :src="getBasinImg(id as string)"
          :alt="`รูปภาพลุ่มน้ำ ${id}`"
          class="w-full h-full object-contain"
          @load="onImageLoad"
          ref="basinImage"
        />

        <!-- Overlay container สำหรับ element ทั้งหมดที่จะเกาะกับรูป -->
        <div
          class="absolute inset-0 pointer-events-none"
          :style="imageOverlayStyle"
        >
          <!-- title (บนซ้าย) -->
          <div
            class="absolute pointer-events-auto"
            :style="{
              top: '2%',
              left: '2%',
              fontSize: `${scaledFontSize * 0.8}px`,
              zIndex: 20,
            }"
          >
            <div
              class="flex flex-col bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-opacity-90 rounded-xl border border-gray-700 px-4 py-2 backdrop-blur-sm"
            >
              <div class="flex items-center gap-3">
                <span
                  class="font-bold tracking-wide text-white"
                  :style="{ fontSize: `${scaledFontSize * 3}px` }"
                >
                  สถานการณ์ลุ่มน้ำ
                </span>
                <span
                  class="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent font-extrabold animated-gradient-text"
                  :style="{ fontSize: `${scaledFontSize * 5}px` }"
                >
                  {{ basinTitle }}
                </span>
              </div>
              <div
                class="flex items-center gap-2 text-white font-medium mt-2"
                :style="{ fontSize: `${scaledFontSize * 1.2}px` }"
              >
                <span>
                  ข้อมูล ณ วันที่:
                  {{ formatThaiDate(data[data.length - 1]?.measure_time) }}
                </span>
              </div>
            </div>
          </div>

          <!-- logo (บนขวา) -->
          <div
            class="absolute pointer-events-auto"
            :style="{
              top: '2%',
              right: '2%',
              zIndex: 20,
            }"
          >
            <img
              src="/images/pp.png"
              alt="Logo"
              class="rounded-md"
              :style="{
                height: `${scaledSize * 0.15}px`,
                width: 'auto',
              }"
            />
          </div>

          <!-- card water level -->
          <div
            v-for="(station, index) in data"
            :key="index"
          >
            <!-- ชื่อจังหวัด -->
            <div
              class="absolute text-white bg-black bg-opacity-70 px-2 py-1 rounded pointer-events-auto"
              :style="{
                left: `${(station.xProvince / imageOriginalWidth) * 100}%`,
                top: `${(station.yProvince / imageOriginalHeight) * 100}%`,
                transform: 'translate(-50%, -100%)',
                fontSize: `${scaledFontSize * 0.7}px`,
                zIndex: 15,
              }"
            >
              <div class="font-semibold">{{ station.province || 'N/A' }}</div>
              <div
                class="text-gray-200"
                :style="{ fontSize: `${scaledFontSize * 0.6}px` }"
              >
                รหัสสถานี: {{ station.station_code || 'N/A' }}
              </div>
            </div>

            <!-- Card แสดงข้อมูลระดับน้ำ -->
            <div
              class="absolute pointer-events-auto"
              :style="{
                left: `${(station.xCard / imageOriginalWidth) * 100}%`,
                top: `${(station.yCard / imageOriginalHeight) * 100}%`,
                transform: 'translate(-50%, -50%) scale(' + cardScale + ')',
                zIndex: 15,
              }"
            >
              <WaterLevel
                :q_today="station.q_today"
                :wl_diff="station.wl_diff"
                :wl_diff_brae_lv="station.wl_diff_brae_lv"
              />
            </div>

            <!-- จุดแสดงตำแหน่งสถานี -->
            <span
              class="absolute border-2 border-white rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              :class="{
                'bg-green-400': station.wl_diff_brae_lv < 0,
                'bg-yellow-400': station.wl_diff_brae_lv == 0,
                'bg-red-400': station.wl_diff_brae_lv > 0,
                'bg-gray-500': station.wl_diff_brae_lv === null,
              }"
              :style="{
                left: `${(station.xStation / imageOriginalWidth) * 100}%`,
                top: `${(station.yStation / imageOriginalHeight) * 100}%`,
                width: `${scaledSize * 0.02}px`,
                height: `${scaledSize * 0.02}px`,
                zIndex: 10,
              }"
            ></span>
          </div>

          <!-- symbol (ล่างซ้าย) -->
          <div
            class="absolute pointer-events-auto"
            :style="{
              bottom: '2%',
              left: '2%',
              fontSize: `${scaledFontSize * 0.7}px`,
              zIndex: 20,
            }"
          >
            <div
              class="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-opacity-90 rounded-xl px-6 py-4 border border-gray-700 backdrop-blur-lg"
            >
              <div class="flex flex-wrap items-center gap-6">
                <!-- สัญลักษณ์แนวโน้ม -->
                <div class="flex items-center gap-3">
                  <span
                    class="text-white font-semibold"
                    :style="{ fontSize: `${scaledFontSize * 0.8}px` }"
                  >
                    สัญลักษณ์:
                  </span>
                  <div class="flex items-center gap-2">
                    <UIcon
                      name="iconoir:arrow-down-circle-solid"
                      class="text-green-400"
                      :style="{ fontSize: `${scaledFontSize * 1.2}px` }"
                    />
                    <span
                      class="text-green-400 font-medium"
                      :style="{ fontSize: `${scaledFontSize * 0.7}px` }"
                    >
                      เพิ่มขึ้น
                    </span>
                  </div>
                  <div class="flex items-center gap-2">
                    <UIcon
                      name="iconoir:arrow-up-circle-solid"
                      class="text-red-400"
                      :style="{ fontSize: `${scaledFontSize * 1.2}px` }"
                    />
                    <span
                      class="text-red-400 font-medium"
                      :style="{ fontSize: `${scaledFontSize * 0.7}px` }"
                    >
                      ลดลง
                    </span>
                  </div>
                  <div class="flex items-center gap-2">
                    <UIcon
                      name="material-symbols:equal-rounded"
                      class="text-yellow-400"
                      :style="{ fontSize: `${scaledFontSize * 1.2}px` }"
                    />
                    <span
                      class="text-yellow-400 font-medium"
                      :style="{ fontSize: `${scaledFontSize * 0.7}px` }"
                    >
                      ทรงตัว
                    </span>
                  </div>
                </div>

                <!-- สัญลักษณ์สถานี -->
                <div class="flex items-center gap-4">
                  <div class="flex items-center gap-2">
                    <span
                      class="inline-block border-2 border-white rounded-full bg-green-400"
                      :style="{
                        width: `${scaledSize * 0.015}px`,
                        height: `${scaledSize * 0.015}px`,
                      }"
                    ></span>
                    <span
                      class="text-white font-medium"
                      :style="{ fontSize: `${scaledFontSize * 0.7}px` }"
                    >
                      สถานีน้ำท่า
                    </span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span
                      class="inline-block border-2 border-white rounded-full bg-gray-500"
                      :style="{
                        width: `${scaledSize * 0.015}px`,
                        height: `${scaledSize * 0.015}px`,
                      }"
                    ></span>
                    <span
                      class="text-white font-medium"
                      :style="{ fontSize: `${scaledFontSize * 0.7}px` }"
                    >
                      ไม่มีข้อมูล
                    </span>
                  </div>
                </div>

                <!-- คำอธิบายระดับน้ำ -->
                <div
                  class="flex flex-col gap-1"
                  :style="{ fontSize: `${scaledFontSize * 0.7}px` }"
                >
                  <div class="text-white">
                    - ระดับน้ำ
                    <span class="text-green-400 font-semibold">ต่ำ</span>
                    กว่าตลิ่ง
                  </div>
                  <div class="text-white">
                    + ระดับน้ำ
                    <span class="text-red-400 font-semibold">สูง</span>
                    กว่าตลิ่ง
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import RainEffect from '~/components/RainEffect.vue'
  import WaterLevel from '~/components/waterLevel.vue'
  import { BasinList, BasinStation, DamStation } from '~/enums/water-status'

  const route = useRoute()
  const id = route.params.id

  const data = ref<any[]>([])
  const dataDam = ref<any[]>([])
  const basinTitle = ref('รายละเอียดลุ่มน้ำ')
  const loading = ref(true)
  const error = ref('')
  const basinImage = ref<HTMLImageElement | null>(null)
  const imageContainer = ref<HTMLDivElement | null>(null)

  // ขนาดหน้าจอ - ใช้ค่าเริ่มต้นเพื่อป้องกัน SSR error
  const screenWidth = ref(1920)
  const screenHeight = ref(1080)

  // ขนาดรูปภาพต้นฉบับ (กำหนดค่าเริ่มต้น ควรปรับตามรูปจริง)
  const imageOriginalWidth = ref(1920)
  const imageOriginalHeight = ref(1080)

  // คำนวณขนาดที่ปรับตามหน้าจอ
  const scaledSize = computed(() => {
    const baseSize = Math.min(screenWidth.value, screenHeight.value)
    return Math.max(baseSize, 800) // ขนาดขั้นต่ำ 800px
  })

  const scaledFontSize = computed(() => {
    return Math.max(scaledSize.value / 60, 12) // ขนาดตัวอักษรขั้นต่ำ 12px
  })

  const cardScale = computed(() => {
    return Math.min(Math.max(scaledSize.value / 1200, 0.6), 1.5) // scale ระหว่าง 0.6-1.5
  })

  const imageOverlayStyle = computed(() => {
    return {
      width: '100%',
      height: '100%',
    }
  })

  // ฟังก์ชันอัปเดตขนาดหน้าจอ
  const updateScreenSize = () => {
    if (process.client) {
      screenWidth.value = window.innerWidth
      screenHeight.value = window.innerHeight
    }
  }

  // ฟังก์ชันแปลงวันที่เป็นรูปแบบไทย
  function formatThaiDate(dateStr: string | undefined): string {
    if (!dateStr) return '-'
    const date = new Date(dateStr)
    date.setHours(date.getHours())
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }
    return date.toLocaleDateString('th-TH', options)
  }

  function getBasinImg(id: string | number) {
    const numId = Number(id)
    const basin = BasinList.find((b) => b.id === numId)
    const imgPath = basin?.img
    if (imgPath) {
      const parts = imgPath.split('/')
      const fileName = parts.pop()
      return parts.join('/') + '/' + encodeURIComponent(fileName || '')
    }
    return ''
  }

  function onImageLoad() {
    if (basinImage.value) {
      // อัปเดตขนาดรูปภาพจริงเมื่อโหลดเสร็จ
      imageOriginalWidth.value = basinImage.value.naturalWidth
      imageOriginalHeight.value = basinImage.value.naturalHeight
    }
  }

  onMounted(async () => {
    try {
      // อัปเดตขนาดหน้าจอเมื่อ component mount (เฉพาะใน client-side)
      if (process.client) {
        screenWidth.value = window.innerWidth
        screenHeight.value = window.innerHeight
      }

      const numId = Number(id)
      const basinData = BasinStation.find((basin) => basin.basinId === numId)
      const damData = DamStation.find((dam) => dam.basinId === numId)
      const basin =
        BasinList.find((b) => b.id === numId)?.name || 'รายละเอียดลุ่มน้ำ'
      basinTitle.value = basin

      if (basinData) {
        data.value = basinData.stations
      } else {
        data.value = []
      }

      if (damData) {
        dataDam.value = damData.stations
      } else {
        dataDam.value = []
      }

      // เพิ่ม event listener สำหรับการเปลี่ยนขนาดหน้าจอ (เฉพาะใน client-side)
      if (process.client) {
        window.addEventListener('resize', updateScreenSize)
      }
    } catch (e: any) {
      console.error('Error loading BasinStation data:', e)
      error.value = e.message
    } finally {
      loading.value = false
    }
  })

  onUnmounted(() => {
    if (process.client) {
      window.removeEventListener('resize', updateScreenSize)
    }
  })
</script>

<style scoped>
  .animated-gradient-text {
    background-size: 200% 200%;
    animation: gradient-animation 3s ease infinite;
  }

  @keyframes gradient-animation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  /* ป้องกันการ scroll */
  body {
    overflow: hidden;
  }
</style>
