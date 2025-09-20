<template>
  <div class="items-center gap-2 rounded-lg px-2 py-1 text-white shadow-lg z-10">
    <div
      class="flex items-center gap-2 p-2 rounded-lg"
      :class="{
        'bg-green-400': wl_diff < 0,
        'bg-yellow-400': wl_diff == 0,
        'bg-red-400': wl_diff > 0,
        'bg-gray-500': wl_diff === null,
      }"
    >
      <div
        class="w-6 h-6 flex items-center justify-center rounded-full bg-gray-700 border-2 border-white"
      >
        <span class="text-md items-center">
          {{
            wl_diff > 0 ? '⇑' : wl_diff < 0 ? '⇓' : wl_diff === null ? '×' : '='
          }}
        </span>
      </div>
      <div class="flex flex-col">
        <span class="text-sm font-bold">{{ title || 'N/A' }}</span>
        <span class="font-semibold">{{ q_today || 'N/A' }}</span>
      </div>
      <div
        class="flex items-center gap-1 bg-white rounded px-2 py-1 ml-2 text-sm"
        :class="{
          'text-green-600': wl_diff_brae_lv < 0,
          'text-yellow-600': wl_diff_brae_lv == 0,
          'text-red-600': wl_diff_brae_lv > 0,
          'text-gray-600': wl_diff_brae_lv === null,
        }"
      >
        <span>
          {{
            wl_diff_brae_lv > 0
              ? '⇑'
              : wl_diff_brae_lv < 0
              ? '⇓'
              : wl_diff_brae_lv === null
              ? '×'
              : '='
          }}
        </span>
        <span>
          {{ wl_diff_brae_lv || 'N/A' }}
        </span>
      </div>
    </div>
    <div
      class="text-xs text-white ml-2 px-2 py-1 rounded-md"
      :class="{
        'bg-green-400/80': wl_diff < 0,
        'bg-yellow-400/80': wl_diff == 0,
        'bg-red-400/80': wl_diff > 0,
        'bg-gray-500/80': wl_diff === null,
      }"
    >
      ({{ wl_diff || '0' }} ม. จากเมื่อวาน)
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    title: { type: String, default: 'สถานีวัดน้ำ' },
    q_today: { type: Number, default: 0 },
    wl_diff_brae_lv: { type: Number, default: 0 },
    wl_diff: { type: Number, default: 0 },
  })
</script>
