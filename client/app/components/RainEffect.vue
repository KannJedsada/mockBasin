<template>
  <div
    class="fixed inset-0 w-screen h-screen flex items-center justify-center overflow-hidden z-[9999] pointer-events-none"
  >
    <div
      v-for="(drop, i) in drops"
      :key="i"
      class="absolute rain-drop"
      :style="{
        left: `${drop.left}px`,
        animationDuration: `${drop.duration}s`,
        animationDelay: `${drop.delay}s`,
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'

  const drops = ref<{ left: number; duration: number; delay: number }[]>([])

  onMounted(() => {
    const arr = []
    for (let i = 0; i < 100; i++) {
      arr.push({
        left: Math.floor(Math.random() * window.innerWidth),
        duration: 0.2 + Math.random() * 0.3,
        delay: Math.random() * 2,
      })
    }
    drops.value = arr
  })
</script>

<style scoped>
  .rain-drop {
    width: 50px;
    height: 2px;
    border-right: 50px solid rgba(17 149 236 / 0.7);
    border-top: 0;
    border-bottom: 0;
    border-left: 0;
    position: absolute;
    bottom: 100%;
    transform-origin: 100% 50%;
    animation-name: rain;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
  @keyframes rain {
    from {
      transform: rotate(105deg) translateX(0);
    }
    to {
      /* transform: rotate(105deg) translateX(calc(100vh + 20px)); */
      transform: rotate(105deg) translateX(100vh);
    }
  }
</style>
