<template>
  <div
    class="flex flex-col border rounded-xl shadow-lg bg-white overflow-hidden hover:scale-105 transition-transform duration-200 w-96 cursor-pointer"
  >
    <!-- Header -->
    <div class="bg-gray-100 p-4">
      <h2 class="text-xl font-semibold text-center text-gray-700">
        สถานการณ์ลุ่มน้ำ{{ title }}
      </h2>
    </div>

    <!-- Content -->
    <div
      class="flex justify-center items-center p-4"
    >
      <img
        v-if="img"
        :src="img"
        :title="img"
        :alt="props.title || ''"
        class="rounded-lg border h-64 w-full object-cover"
      ></img>

      <div
        v-else
        class="flex items-center justify-center h-64 w-full text-gray-400"
      >
        ไม่มีข้อมูล
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    id: Number,
    title: String,
    img: String,
  })


</script>
