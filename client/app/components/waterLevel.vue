<template>
  <div class="flex flex-col items-end space-y-1">
    <!-- บน -->
    <div class="flex items-center justify-end relative">
      <!-- วงกลมลูกศร -->
      <div
        class="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg transition-colors duration-300"
        :class="{
          'border-4 border-green-400': wl_diff < 0,
          'border-4 border-yellow-400': wl_diff == 0,
          'border-4 border-red-400': wl_diff > 0,
          'border-4 border-gray-400': wl_diff === null,
        }"
        style="position: relative; left: 25px; z-index: 20">
        <template v-if="wl_diff !== null">
          <UIcon
            v-if="wl_diff > 0"
            name="material-symbols:arrow-shape-up-rounded"
            class="text-red-400 text-2xl" />
          <UIcon
            v-else-if="wl_diff < 0"
            name="material-symbols:arrow-shape-down-rounded"
            class="text-green-400 text-2xl" />
          <UIcon
            v-else
            name="material-symbols:equal-rounded"
            class="text-yellow-400 text-2xl" />
        </template>
        <template v-else>
          <span class="text-gray-400 font-medium">N/A</span>
        </template>
      </div>

      <!-- กล่องข้อมูลหลัก -->
      <div
        class="flex items-center rounded-xl px-3 py-2 text-white shadow-lg backdrop-blur-md transition-colors duration-300 z-10 ml-4"
        :class="{
          'bg-gradient-to-r from-green-500 to-green-600': wl_diff < 0,
          'bg-gradient-to-r from-yellow-400 to-yellow-500': wl_diff == 0,
          'bg-gradient-to-r from-red-400 to-red-500': wl_diff > 0,
          'bg-gradient-to-r from-gray-500 to-gray-600': wl_diff === null,
        }">
        <div class="flex flex-col items-start">
          <div class="text-lg font-bold tracking-wide flex items-center gap-1">
            {{ title }}
            <div
              class="flex items-center gap-1 bg-white rounded-lg px-3 py-1 text-sm shadow-sm"
              :class="{
                'text-green-600': wl_diff_brae_lv < 0,
                'text-yellow-600': wl_diff_brae_lv == 0,
                'text-red-600': wl_diff_brae_lv > 0,
                'text-gray-600': wl_diff_brae_lv === null,
              }">
              <span class="font-medium">
                {{ wl_diff_brae_lv?.toFixed(2) || 'N/A' }}
                <span
                  v-if="wl_diff_brae_lv"
                  class="text-xs">
                  ม.
                </span>
              </span>
            </div>
          </div>
          <span class="font-semibold text-xl">
            {{ Math.round(q_today) || 'N/A' }}
            <span
              v-if="q_today"
              class="text-sm font-normal ml-1">
              ลบ.ม./ว
            </span>
          </span>
        </div>
      </div>
    </div>

    <!-- ล่าง -->
    <div
      class="text-xs font-medium px-3 py-1 rounded-lg shadow-md backdrop-blur-sm inline-block"
      :class="{
        'bg-green-500/80': wl_diff < 0,
        'bg-yellow-400/80': wl_diff == 0,
        'bg-red-400/80': wl_diff > 0,
        'bg-gray-500/80': wl_diff === null,
      }">
      ({{ wl_diff?.toFixed(2) || '0' }} ม. จากเมื่อวาน)
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    title: { type: String, default: 'ระดับน้ำ' },
    q_today: { type: Number, default: null },
    wl_diff_brae_lv: { type: Number, default: null },
    wl_diff: { type: Number, default: null },
  })
</script>
