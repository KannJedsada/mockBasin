<template>
  <div
    class="flex flex-col items-center justify-center rounded-lg p-2 text-center text-white z-[999] bg-opacity-80"
    :class="{
      'bg-gray-300': value === undefined,
      'bg-yellow-300': value < 30,
      'bg-green-300': value >= 30 && value < 50,
      'bg-blue-300': value >= 50 && value < 80,
      'bg-red-300': value >= 80 && value < 100,
      'bg-cyan-300': value >= 100,
    }"
  >
    <span class="whitespace-nowrap">{{ water_resource_name || 'N/A' }}</span>
    <span class="text-2xl font-bold">
      {{ value !== undefined ? Math.round(value) + '%' : 'N/A' }}
    </span>
  </div>
  <!--ไม่มีข้อมูลสีเทา น้อยกว่า 30 สีเหลือง น้อยกว่า 50 สีเขียว มากกว่า 50 สีฟ้า มากกว่า 80 สีแดง มากกว่า 100 สีน้ำตาม -->
</template>

<script setup lang="ts">
  const props = defineProps({
    water_resource_name: String,
    value: Number,
  })
</script>
