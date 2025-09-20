<template>
  <div class="flex flex-col items-end">
    <!-- บน -->
    <div
      class="flex items-center justify-end"
      style="position: relative"
    >
      <div
        class="border-4 p-2 bg-white rounded-full"
        :class="{
          'border-green-400 border': wl_diff < 0,
          'border-yellow-400 border': wl_diff == 0,
          'border-red-400 border': wl_diff > 0,
          'border-gray-500 border': wl_diff === null,
        }"
        style="position: relative; left: 25px; z-index: 20"
      >
        <template v-if="wl_diff !== null">
          <div>
            <UIcon
              v-if="wl_diff > 0"
              name="material-symbols:arrow-shape-up-rounded"
              class="text-red-400"
            />
            <UIcon
              v-else-if="wl_diff < 0"
              name="material-symbols:arrow-shape-down-rounded"
              class="text-green-400"
            />
            <UIcon
              v-else
              name="material-symbols:equal-rounded"
              class="text-yellow-400"
            />
          </div>
        </template>
        <template v-else>
          <span class="text-gray-500">N/A</span>
        </template>
      </div>
      <div class="items-center rounded-lg px-2 py-1 text-white z-10">
        <div
          class="flex items-center gap-2 p-2 rounded-lg"
          :class="{
            'bg-green-400': wl_diff < 0,
            'bg-yellow-400': wl_diff == 0,
            'bg-red-400': wl_diff > 0,
            'bg-gray-500': wl_diff === null,
          }"
        >
          <div class="flex flex-col">
            <span class="font-semibold ml-2">
              {{ Math.round(q_today) || 'N/A' }}
            </span>
          </div>
          <div
            class="flex items-center gap-1 bg-white rounded px-2 py-1 text-sm"
            :class="{
              'text-green-600': wl_diff_brae_lv < 0,
              'text-yellow-600': wl_diff_brae_lv == 0,
              'text-red-600': wl_diff_brae_lv > 0,
              'text-gray-600': wl_diff_brae_lv === null,
            }"
          >
            <span>
              {{ wl_diff_brae_lv.toFixed(2) || 'N/A' }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- ล่าง -->
    <div
      class="text-xs text-white px-2 py-1 rounded-md inline-block"
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
    q_today: { type: Number, default: 0 },
    wl_diff_brae_lv: { type: Number, default: 0 },
    wl_diff: { type: Number, default: 0 },
  })
</script>
