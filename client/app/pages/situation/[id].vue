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
      <RainEffect />
      <div
        class="flex items-center justify-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style="width: 1600px; height: 900px"
      >
        <img
          :src="getBasinImg(id)"
          :alt="`รูปภาพลุ่มน้ำ ${id}`"
          class="object-cover"
          style="width: 1600px; height: 900px"
        />
        <div
          class="absolute top-8 left-0  transform -translate-x-1/2 text-white text-2xl font-bold rounded px-6 py-4 bg-black bg-opacity-50"
        >
          {{ title || 'ชื่อลุ่มน้ำ' }}
          <br />
          ข้อมูล ณ วันที่: {{ formatThaiDate(data[data.length - 1]?.measure_time) }}
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
          class="absolute bottom-0 left-10 transform -translate-x-1/2 bg-black bg-opacity-50 rounded px-6 py-4 flex items-center gap-6 text-white text-lg font-semibold"
        >
          สัญลักษณ์:
          <UIcon name="material-symbols:arrow-shape-up-rounded" />
          <span>เพิ่มขึ้น</span>
          <UIcon name="material-symbols:arrow-shape-down-rounded" />
          <span>ลดลง</span>
          <UIcon name="material-symbols:equal-rounded" />
          <span>ทรงตัว</span>
          <div class="flex flex-col items-start text-white text-md gap-2">
            <div class="flex items-center gap-2">
              <span
                class="inline-block w-4 h-4 border-2 border-white rounded-full bg-green-400"
              ></span>
              <span>สถานีน้ำท่า</span>
            </div>
            <div class="flex items-center gap-2">
              <span
                class="inline-block w-4 h-4 border-2 border-white rounded-full bg-gray-500"
              ></span>
              <span>ไม่มีข้อมูล</span>
            </div>
          </div>
          <div class="flex flex-col items-center text-white text-md">
            <div>
              - ระดับน้ำ
              <span class="text-green-500">ต่ำ</span>
              กว่าตลิ่ง
            </div>
            <div>
              + ระดับน้ำ
              <span class="text-red-500">สูง</span>
              กว่าตลิ่ง
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue'
  import WaterLevel from '~/components/waterLevel.vue'
  import { BasinImgMap, BasinStation, DamStation } from '~/enums/water-status'
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
    // ใช้ BasinImgMap ในการดึง path รูปภาพจาก id
    const numId = Number(id)
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

<style scoped>
  .container {
    max-width: 1200px;
  }
</style>
