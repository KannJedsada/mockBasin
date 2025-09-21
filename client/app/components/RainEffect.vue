<template>
  <div
    class="fixed top-0 left-0 w-screen h-screen pointer-events-none z-[9998] overflow-hidden"
  >
    <!-- เม็ดฝน -->
    <div
      v-for="(drop, i) in drops"
      :key="i"
      class="absolute bg-blue-500 rain-drop"
      :style="{
        left: `${drop.left}%`,
        width: `${drop.width}px`,
        height: `${drop.height}px`,
        animationDuration: `${drop.duration}s`,
        animationDelay: `${drop.delay}s`,
      }"
    ></div>

    <!-- ฟ้าผ่าสุ่ม -->
    <div
      v-for="(flash, i) in flashes"
      :key="i"
      class="absolute rounded-sm opacity-70 shadow-lg"
      :style="{
        width: '4px',
        height: `${flash.size}px`,
        top: `${flash.top}%`,
        left: `${flash.left}%`,
        background: 'linear-gradient(to bottom, #fffbe7 60%, #facc15 100%)',
        animation: 'flash 0.2s ease-in-out',
        boxShadow: '0 0 16px 4px #fffbe7',
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'

  const props = defineProps({
    // จำนวนเม็ดฝน
    dropCount: { type: Number, default: 200 },
    isDrop: { type: Boolean, default: false },
    isFlash: { type: Boolean, default: false },
  })

  const drops = ref<
    {
      left: number
      width: number
      height: number
      duration: number
      delay: number
    }[]
  >([])
  const flashes = ref<{ top: number; left: number; size: number }[]>([])

  let flashInterval: NodeJS.Timeout | null = null

  const generateDrops = () => {
    drops.value = []
    if (props.isDrop === false) return

    // สร้างเม็ดฝนใหม่
    for (let i = 0; i < props.dropCount; i++) {
      drops.value.push({
        left: Math.random() * 100, // ใช้ % แทน px
        width: 2 + Math.random() * 3,
        height: 10 + Math.random() * 20,
        duration: 0.5 + Math.random() * 1,
        delay: Math.random() * 2,
      })
    }
  }

  const generateFlash = () => {
    if (props.isFlash === false) return

    flashes.value = [] // เคลียร์ฟลัชเก่า
    for (let i = 0; i < 350; i++) {
      flashes.value.push({
        top: Math.random() * 100, // ใช้ % แทน px
        left: Math.random() * 100, // ใช้ % แทน px
        size: 50 + Math.random() * 100, // ขนาดฟ้าผ่า
      })
    }
    // เคลียร์ฟลัชหลัง animation จบ
    setTimeout(() => (flashes.value = []), 200)
  }

  onMounted(() => {
    // สร้างเม็ดฝนเริ่มต้น
    generateDrops()

    // สร้างฟลัชฟ้าผ่าแบบสุ่ม
    flashInterval = setInterval(generateFlash, 2000 + Math.random() * 3000) // ทุก 2-5 วินาที
  })

  onUnmounted(() => {
    if (flashInterval) {
      clearInterval(flashInterval)
      flashInterval = null
    }
  })
</script>

<style scoped>
  .rain-drop {
    position: absolute;
    bottom: 100%;
    animation-name: rain;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  @keyframes rain {
    0% {
      transform: translateY(0) rotate(10deg);
    }
    100% {
      transform: translateY(100vh) rotate(10deg);
    }
  }

  @keyframes flash {
    0%,
    100% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
  }
</style>
