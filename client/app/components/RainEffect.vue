<template>
  <div
    class="fixed top-0 left-0 w-[600dvh] h-[100dvh] min-w-full min-h-full pointer-events-none z-0 overflow-hidden z-[9998]"
    
  >
    <!-- เม็ดฝน -->
    <div
      v-for="(drop, i) in drops"
      :key="i"
      class="absolute bg-blue-500 rain-drop"
      :style="{
        left: `${drop.left}px`,
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
        top: `${flash.top}px`,
        left: `${flash.left}px`,
        background: 'linear-gradient(to bottom, #fffbe7 60%, #facc15 100%)',
        animation: 'flash 0.2s ease-in-out',
        boxShadow: '0 0 16px 4px #fffbe7',
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'

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

  onMounted(() => {
    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight

    if (props.isDrop === false) return
    // สร้างเม็ดฝน
    for (let i = 0; i < props.dropCount; i++) {
      drops.value.push({
        left: Math.random() * screenWidth,
        width: 2 + Math.random() * 3,
        height: 10 + Math.random() * 20,
        duration: 0.5 + Math.random() * 1,
        delay: Math.random() * 2,
      })
    }

    // สร้างฟลัชฟ้าผ่าแบบสุ่ม
    setInterval(() => {
      if (props.isFlash === false) return
      flashes.value = [] // เคลียร์ฟลัชเก่า
      for (let i = 0; i < 350; i++) {
        flashes.value.push({
          top: Math.random() * screenHeight,
          left: Math.random() * screenWidth,
          size: 50 + Math.random() * 100, // ขนาดฟ้าผ่า
        })
      }
      // เคลียร์ฟลัชหลัง animation จบ
      setTimeout(() => (flashes.value = []), 200)
    }, 2000 + Math.random() * 3000) // ทุก 2-5 วินาที
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
