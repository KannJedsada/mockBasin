<template>
  <div class="flex flex-col items-center space-y-2 text-white text-xl font-bold">
    <div class="flex bg-green-700 p-2 z-10 rounded-md">
      {{ use.toLocaleString() }}
    </div>
    <div class="flex bg-orange-500 p-2 z-10 rounded-md">
      {{ storage.toLocaleString() }}
    </div>
    <div class="flex bg-black bg-opacity-50 p-2 z-10 rounded-md">
     ล้าน ลบ.ม.
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    name: string
    use: number
    storage: number
  }>()
</script>
