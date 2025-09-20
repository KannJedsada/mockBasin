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
        class="fixed inset-0 z-1 bg-black flex items-center justify-center overflow-auto"
      >
        <img
          :src="getBasinImg(id)"
          :alt="`รูปภาพลุ่มน้ำ ${id}`"
          class="w-screen h-screen object-cover"
          style="margin: 24px; border-radius: 0; box-shadow: none"
        />
        <div
          v-for="station in stationLocation"
          :key="station.station_code"
          class="absolute"
          :style="{
            left: `${station.x * 5.5}%`,
            top: `${station.y * 21}%`,
            transform: 'translate(-50%, -50%)',
          }"
        >
          <!-- card -->
          <div>
            <WaterLevel
              :title="station.station_code"
              :q_today="station.q_today"
              :wl_diff_brae_lv="station.wl_diff_brae_lv"
              :wl_diff="station.wl_diff"
            />
          </div>
        </div>
        <!-- marker -->
        <div v-for="dot in dotStation">
          <div
            class="absolute w-4 h-4 bg-red-600 border-2 border-white rounded-full shadow-lg"
            :style="{
              left: `${dot.x * 5.5}%`,
              top: `${dot.y * 4.5}%`,
              transform: 'translate(-50%, -50%)',
            }"
          ></div>
        </div>
        <div
          v-for="arrow in arrowRiverLocation"
          :key="arrow.direction"
          class="absolute"
          :style="{
            left: `${arrow.x * 5.5}%`,
            top: `${arrow.y * 4}%`,
            transform: 'translate(-50%, -50%)',
          }"
        >
          <ArrowRiver :direction="arrow.direction" />
        </div>
        <div
          class="absolute top-8 left-8 text-white text-3xl font-bold drop-shadow-lg bg-black/50 px-6 py-2 rounded"
        >
          {{ title || 'ชื่อลุ่มน้ำ' }}
          <br />
            ข้อมูล ณ วันที่: {{ formatThaiDate(data[data.length - 1]?.createat) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue'
  import WaterLevel from '~/components/waterLevel.vue'
  import { BasinImgMap } from '~/enums/water-status'
  import RainEffect from '~/components/RainEffect.vue'

  const route = useRoute()
  const id = route.params.id
  const title = route.query.title || 'รายละเอียดลุ่มน้ำ'

  const data = ref<any[]>([])
  const dataResource = ref<any[]>([])
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
      console.log('Fetching data from server API...')
      const testDb = await fetch('http://localhost:3000/api/testdb')
      const testDbData = await testDb.json()
      data.value = testDbData
      // const res = await fetch(`/api/basin/${id}`)
      // const response = await fetch(`/api/basin/resource?id=${id}`)
      // if (!res.ok) throw new Error('ไม่สามารถโหลดข้อมูลได้')
      // ถ้าข้อมูลไม่ใช่ array ให้แปลงเป็น array
      if (!Array.isArray(data.value)) {
        data.value = data.value ? [data.value] : []
      }
    } catch (e: any) {
      console.error('Error:', e)
      error.value = e.message
    } finally {
      console.log('Final data:', data.value)
      loading.value = false
    }
  })

  const stationLocation = computed(() => {
    // กำหนดตำแหน่ง x, y สำหรับแต่ละ station_code
    const positionMap: Record<string, { x: number; y: number }> = {
      'ABC_1': { x: 5.5, y: 1 },
      'ABC_2': { x: 3.2, y: 2.5 },
      // เพิ่ม station_code อื่นๆ ตามต้องการ
    }
    return data.value.map((station: any) => {
      const pos = positionMap[station.station_code] || { x: 0, y: 0 }
      return {
        ...station,
        x: pos.x,
        y: pos.y,
      }
    })
  })

  const arrowRiverLocation = computed(() => {
    const arrow = [
      {
        direction: 'down',
        x: 5,
        y: 5.5,
      },
      {
        direction: 'left',
        x: 4.5,
        y: 7,
      },
      {
        direction: 'left',
        x: 6,
        y: 8,
      },
      {
        direction: 'down',
        x: 4,
        y: 12,
      },
      {
        direction: 'down',
        x: 4,
        y: 14,
      },
    ]

    return arrow
  })

  const dotStation = computed(() => {
    return [
      {
        x: 4,
        y: 12,
      },
    ]
  })
</script>

<style scoped>
  .container {
    max-width: 1200px;
  }
</style>
