<template>
  <div class="rain-container">
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
    // เพิ่มจำนวนหยดน้ำและปรับให้ครอบคลุมพื้นที่ทั้งหมด
    for (let i = 0; i < 200; i++) {
      arr.push({
        left: Math.floor(Math.random() * (window.innerWidth + 200)), // เพิ่มพื้นที่ด้านข้าง
        duration: 0.3 + Math.random() * 0.8, // ปรับความเร็ว
        delay: Math.random() * 5, // เพิ่มความหลากหลายในการเริ่มต้น
      })
    }
    drops.value = arr
  })
</script>

<style scoped>
  .rain-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    pointer-events: none;
    z-index: 1;
    margin: 0;
    padding: 0;
  }

  .rain-drop {
    width: 60px;
    height: 3px;
    border-right: 60px solid rgba(17 149 236 / 0.6);
    border-top: 0;
    border-bottom: 0;
    border-left: 0;
    position: absolute;
    top: -100px; /* เริ่มจากด้านบนของหน้าจอ */
    transform-origin: 100% 50%;
    animation-name: rain;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  @keyframes rain {
    from {
      transform: rotate(105deg) translateX(-100px);
      opacity: 1;
    }
    to {
      transform: rotate(105deg) translateX(calc(100vh + 100vw + 200px));
      opacity: 0.3;
    }
  }
</style>
