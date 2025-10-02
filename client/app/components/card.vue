<template>
  <div
    class="flex flex-col rounded-2xl shadow-lg bg-white/90 backdrop-blur-md overflow-hidden hover:scale-105 hover:shadow-xl transition-all duration-300 w-96 cursor-pointer border border-gray-100"
  >
    <!-- Header -->
    <div class="bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
      <h2 class="text-xl font-semibold text-center text-white drop-shadow-sm">
        สถานการณ์ลุ่มน้ำ{{ title }}
      </h2>
    </div>

    <!-- Content -->
    <div class="flex justify-center items-center p-4">
      <img
        v-if="img"
        :src="img"
        :title="`ลุ่มน้ำ${title}` || ''"
        :alt="title || ''"
        class="rounded-xl h-64 w-full object-cover shadow-md"
      />

      <div
        v-else
        class="flex items-center justify-center h-64 w-full text-gray-400 bg-gray-100 rounded-xl"
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
