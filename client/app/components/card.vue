<template>
  <div
    v-if="props.show"
    class="flex flex-col border rounded-xl shadow-lg bg-white overflow-hidden hover:scale-105 transition-transform duration-200 w-96 cursor-pointer"
  >
    <!-- Header -->
    <div class="bg-gray-100 p-4">
      <h2 class="text-xl font-semibold text-center text-gray-700">
        {{ props.title }}
      </h2>
    </div>

    <!-- Content -->
    <div
      class="flex justify-center items-center p-4"
    >
      <iframe
        v-if="props.url_scr"
        :src="props.url_scr"
        :title="props.title"
        class="rounded-lg border w-full h-64"
      ></iframe>

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
    show: Boolean,
    url_scr: String,
    img_src: String,
  })


</script>
