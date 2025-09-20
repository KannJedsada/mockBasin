<template>
  <div class="container mx-auto px-4 py-8">
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

    <div v-else>
      <!-- Rain Effect - แสดงเต็มหน้าจอ -->
      <RainEffect />

      <div
        ref="containerRef"
        class="no-zoom relative"
        :style="containerStyle"
      >
        <img
          :src="getBasinImg(id)"
          :alt="`รูปภาพลุ่มน้ำ ${id}`"
          class="object-cover"
        />
        <!-- logo -->
        <div>
          <img
            src="/images/pp.png"
            alt="Logo"
            class="absolute top-0 right-0 h-60 z-[9999]"
          />
        </div>
        <div
          class="absolute top-8 left-8 flex flex-col gap-2 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-opacity-80 rounded-xl px-8 py-6 flex flex-wrap items-center gap-8 border border-gray-700 backdrop-blur-lg"
        >
          <div class="flex items-center gap-3">
            <span class="text-white text-xl font-bold tracking-wide">
              สถานการณ์ลุ่มน้ำ
              <span
                class="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent font-extrabold"
                style="font-size: 3rem"
                :class="'animated-gradient-text'"
              >
                ชี
              </span>
            </span>
          </div>
          <div class="flex items-center gap-2 text-white text-lg font-medium">
            <UIcon
              name="mdi:calendar-clock"
              class="text-blue-300 text-xl"
            />
            <span>
              ข้อมูล ณ วันที่:
              {{ formatThaiDate(data[data.length - 1]?.measure_time) }}
            </span>
          </div>
        </div>

        <!-- card -->
        <div
          v-for="(station, index) in data"
          :key="index"
        >
          <div>
            <div
              class="absolute"
              :style="{
                left: `${station.xProvince}px`,
                top: `${station.yProvince}px`,
                zIndex: 10,
              }"
            >
              <div class="text-sm font-semibold text-gray-200">
                {{ station.province || 'N/A' }}
              </div>
              <div class="text-xs text-gray-200">
                รหัสสถานี: {{ station.station_code || 'N/A' }}
              </div>
            </div>
            <div
              :style="{
                position: 'absolute',
                left: `${station.xCard}px`,
                top: `${station.yCard}px`,
                zIndex: 10,
              }"
            >
              <WaterLevel
                :q_today="station.q_today"
                :wl_diff="station.wl_diff"
                :wl_diff_brae_lv="station.wl_diff_brae_lv"
              />
            </div>
            <span
              class="absolute w-4 h-4 border-2 border-white rounded-full"
              :class="{
                'bg-green-400': station.wl_diff_brae_lv < 0,
                'bg-yellow-400': station.wl_diff_brae_lv == 0,
                'bg-red-400': station.wl_diff_brae_lv > 0,
                'bg-gray-500': station.wl_diff_brae_lv === null,
              }"
              :style="{
                position: 'absolute',
                left: `${station.xStation}px`,
                top: `${station.yStation}px`,
                zIndex: 10,
              }"
            ></span>
          </div>
        </div>

        <!-- dam -->
        <div
          v-for="(dam, index) in dataDam"
          :key="index"
        >
          <div
            class="absolute"
            :style="{
              left: `${dam.xStaion}px`,
              top: `${dam.yStation}px`,
              zIndex: 10,
            }"
          >
            <div>
              <!-- {{ dam.water_resource_name || 'N/A' }} -->
              <img
                src="/images/dam.webp"
                alt="Dam Icon"
                class="inline-block h-10 ml-1"
              />
            </div>
          </div>
          <div>
            <CardDam
              :water_resource_name="dam.water_resource_name"
              :value="dam.value"
              :style="{
                position: 'absolute',
                left: `${dam.xValue}px`,
                top: `${dam.yValue}px`,
                zIndex: 10,
              }"
            />
          </div>
        </div>

        <!-- footer -->
        <div
          class="absolute bottom-8 left-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-opacity-80 rounded-xl px-8 py-6 flex flex-wrap items-center gap-8 border border-gray-700 backdrop-blur-lg"
        >
          <div class="flex items-center gap-4 mr-8">
            <span class="text-white text-lg font-semibold">สัญลักษณ์:</span>
            <UIcon
              name="material-symbols:arrow-shape-up-rounded"
              class="text-green-400 text-2xl"
            />
            <span class="text-green-400 font-medium">เพิ่มขึ้น</span>
            <UIcon
              name="material-symbols:arrow-shape-down-rounded"
              class="text-red-400 text-2xl"
            />
            <span class="text-red-400 font-medium">ลดลง</span>
            <UIcon
              name="material-symbols:equal-rounded"
              class="text-yellow-400 text-2xl"
            />
            <span class="text-yellow-400 font-medium">ทรงตัว</span>
          </div>
          <div class="flex flex-col gap-2 mr-8">
            <div class="flex items-center gap-2">
              <span
                class="inline-block w-5 h-5 border-2 border-white rounded-full bg-green-400"
              ></span>
              <span class="text-white font-medium">สถานีน้ำท่า</span>
            </div>
            <div class="flex items-center gap-2">
              <span
                class="inline-block w-5 h-5 border-2 border-white rounded-full bg-gray-500"
              ></span>
              <span class="text-white font-medium">ไม่มีข้อมูล</span>
            </div>
          </div>
          <div class="flex flex-col gap-1">
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
</template>

<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount, computed, nextTick } from 'vue'
  import WaterLevel from '~/components/waterLevel.vue'
  import CardDam from '~/components/cardDam.vue'
  import {
    BasinImgMap,
    BasinStation,
    DamStation,
    BasinId,
  } from '~/enums/water-status'
  import RainEffect from '~/components/RainEffect.vue'

  const route = useRoute()
  const id = computed(() => route.params.id as string)
  const title = computed(
    () => (route.query.title as string) || 'รายละเอียดลุ่มน้ำ',
  )

  const data = ref<any[]>([])
  const dataDam = ref<any[]>([])
  const loading = ref(true)
  const error = ref('')
  const containerRef = ref<HTMLElement>()
  const scale = ref(1)

  // ขนาดต้นฉบับของ container
  const ORIGINAL_WIDTH = 1600
  const ORIGINAL_HEIGHT = 900

  // คำนวณ style สำหรับ container
  const containerStyle = computed(() => {
    return {
      width: `${ORIGINAL_WIDTH}px`,
      height: `${ORIGINAL_HEIGHT}px`,
      transform: `scale(${scale.value})`,
      transformOrigin: 'center center',
      transition: 'transform 0.3s ease',
      position: 'absolute' as const,
      left: '50%',
      top: '50%',
      marginLeft: `-${ORIGINAL_WIDTH / 2}px`,
      marginTop: `-${ORIGINAL_HEIGHT / 2}px`,
    }
  })

  // ตั้งค่า meta viewport
  useHead({
    meta: [
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
      },
    ],
  })

  // ฟังก์ชันคำนวณขนาดให้พอดีกับหน้าจอ
  const calculateScale = () => {
    if (!containerRef.value) return

    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    // เผื่อ padding
    const availableWidth = windowWidth - 32 // 16px padding ซ้าย-ขวา
    const availableHeight = windowHeight - 32 // 16px padding บน-ล่าง

    // คำนวณ scale ratio
    const scaleX = availableWidth / ORIGINAL_WIDTH
    const scaleY = availableHeight / ORIGINAL_HEIGHT

    // ใช้ scale ที่เล็กกว่า เพื่อให้พอดีกับหน้าจอ
    const newScale = Math.min(scaleX, scaleY, 1) // ไม่ให้ขยายเกิน 1

    scale.value = newScale
  }

  // ฟังก์ชันป้องกัน zoom
  const preventZoom = () => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === '+' || e.key === '-' || e.key === '=' || e.key === '0')
      ) {
        e.preventDefault()
      }
    }

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault()
      }
    }

    // ป้องกัน double-tap zoom
    let lastTouchEnd = 0
    const handleTouchEnd = (e: TouchEvent) => {
      const now = Date.now()
      if (now - lastTouchEnd <= 300) {
        e.preventDefault()
      }
      lastTouchEnd = now
    }

    // เพิ่ม resize listener
    const handleResize = () => {
      calculateScale()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('wheel', handleWheel, { passive: false })
    document.addEventListener('touchend', handleTouchEnd, { passive: false })
    window.addEventListener('resize', handleResize)

    // คำนวณขนาดเริ่มต้น
    calculateScale()

    // Return cleanup function
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('wheel', handleWheel)
      document.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('resize', handleResize)
    }
  }

  let cleanupZoom: (() => void) | null = null

  // ฟังก์ชันแปลงวันที่เป็นรูปแบบไทย
  function formatThaiDate(dateStr: string | undefined): string {
    if (!dateStr) return '-'
    const date = new Date(dateStr)
    // ปรับเวลา -7 ชั่วโมง
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
    // ใช้ BasinImgMap ในการดึง path รูปภาพจาก id
    const numId = Number(id) as BasinId
    const imgPath = BasinImgMap[numId]
    // ถ้า path เป็นภาษาไทย ให้ encodeURIComponent เฉพาะชื่อไฟล์
    if (imgPath) {
      const parts = imgPath.split('/')
      const fileName = parts.pop()
      return parts.join('/') + '/' + encodeURIComponent(fileName || '')
    }
    return ''
  }

  onMounted(async () => {
    try {
      // เริ่มป้องกัน zoom
      cleanupZoom = preventZoom()

      const numId = Number(id.value) as BasinId
      const basinData = BasinStation.find((basin) => basin.basinId === numId)
      const damData = DamStation.find((dam) => dam.basinId === numId)

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

      // คำนวณขนาดหลังจากโหลดข้อมูลเสร็จ
      await nextTick()
      calculateScale()
    } catch (e: any) {
      console.error('Error loading BasinStation data:', e)
      error.value = e.message
    } finally {
      loading.value = false
    }
  })

  onBeforeUnmount(() => {
    // ทำความสะอาด event listeners
    if (cleanupZoom) {
      cleanupZoom()
    }
  })
</script>

<style scoped>
  .container {
    max-width: 1200px;
    overflow: hidden;
  }

  /* ป้องกัน zoom และ touch gestures */
  .no-zoom {
    touch-action: manipulation;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* CSS global สำหรับป้องกัน zoom */
  :global(html),
  :global(body) {
    touch-action: manipulation;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    overflow-x: hidden;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  /* ป้องกัน auto-zoom ใน iOS เมื่อ focus input */
  :global(input),
  :global(select),
  :global(textarea) {
    font-size: 16px;
  }
</style>
