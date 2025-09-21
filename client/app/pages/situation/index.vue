<template>
  <div class="p-5">
    <div class="flex flex-col items-center my-8">
      <h1 class="text-3xl font-bold text-blue-800 mb-2 drop-shadow">
        อินโฟกราฟิกติดตามสถานการณ์ลุ่มน้ำ
      </h1>
    </div>
    <div v-if="loading">กำลังโหลดข้อมูล...</div>
    <div v-else-if="error">เกิดข้อผิดพลาด: {{ error }}</div>
    <div
      v-else
      class="flex flex-wrap gap-4 justify-center"
    >
      <Card
        v-for="item in data"
        :key="item.id"
        :id="item.id"
        :title="item.name"
        :img="item.img"
        @click="basinData(item.id, item.name)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { BasinList } from '~/enums/water-status'  
  import Card from '@/components/card.vue'

  const data = ref([] as any[])
  const loading = ref(true)
  const error = ref('')

  onMounted(async () => {
    data.value = BasinList
    loading.value = false
  })

  const router = useRouter()

  const basinData = (id: number, title: string) => {
    if (id) {
      router.push({ path: `/situation/${id}`, query: { title } })
    }
  }

</script>

<style scoped>
  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  pre {
    background: #f3f4f6;
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
  }
</style>
