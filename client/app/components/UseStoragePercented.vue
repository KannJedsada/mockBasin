<template>
  <div class="w-20 h-20 flex items-center justify-center rounded-full bg-white border-8 border-yellow-400 text-black font-bold text-xl">
    {{ Math.round((use * 100) / storage) }} %
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    use: number
    storage: number
  }>()
</script>
