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
      class="relative w-screen h-screen overflow-hidden"
    >
      <!-- เอฟเฟคฝน -->
      <RainEffect
        :drop-count="350"
        :is-drop="true"
        :is-flash="true"
      />

      <!-- ภาพลุ่มน้ำ -->
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150dvh] h-[150dvh] flex items-center justify-center"
      >
        <img
          :src="getBasinImg(id as string)"
          :alt="`รูปภาพลุ่มน้ำ ${id}`"
          class="object-cover"
        />
      </div>

      <!-- title (บนซ้าย) -->
      <div
        class="absolute top-4 left-4 flex flex-col bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-opacity-80 rounded-xl border border-gray-700 px-2"
      >
        <div class="flex items-center">
          <span
            class="font-bold tracking-wide"
            style="font-size: 3rem; color: white"
          >
            <span>สถานการณ์ลุ่มน้ำ</span>
            <span
              class="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent font-extrabold"
              style="font-size: 6rem"
              :class="'animated-gradient-text'"
            >
              {{ title }}
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

      <!-- logo (บนขวา) -->
      <div class="absolute top-4 right-4">
        <img
          src="/images/pp.png"
          alt="Logo"
          class="h-60 rounded-md"
        />
      </div>
      <!-- card water level -->
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
            class="absolute w-4 h-4 border-2 border-white rounded-full shadow-lg"
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

      <!-- symbol (ล่างซ้าย) -->
      <div
        class="absolute bottom-4 left-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-opacity-80 rounded-xl px-8 py-6 flex flex-wrap items-center gap-8 border border-gray-700 backdrop-blur-lg"
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
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import WaterLevel from '~/components/waterLevel.vue'
  import { BasinList, BasinStation, DamStation } from '~/enums/water-status'
  import RainEffect from '~/components/RainEffect.vue'

  const route = useRoute()
  const id = route.params.id
  const title = route.query.title || 'รายละเอียดลุ่มน้ำ'

  const data = ref<any[]>([])
  const dataDam = ref<any[]>([])
  const loading = ref(true)
  const error = ref('')

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
    // ใช้ BasinList ในการดึง path รูปภาพจาก id
    const numId = Number(id)
    const basin = BasinList.find((b) => b.id === numId)
    const imgPath = basin?.img
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
      const numId = Number(id)
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
    } catch (e: any) {
      console.error('Error loading BasinStation data:', e)
      error.value = e.message
    } finally {
      loading.value = false
    }
  })
</script>
