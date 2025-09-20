<template>
  <div
    :class="arrowClass"
    class="inline-block"
  >
    <svg
      v-if="props.direction === 'left'"
      width="40"
      height="24"
      viewBox="0 0 40 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M36 12H4M4 12L12 4M4 12L12 20"
        stroke="#00BFFF"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <svg
      v-else-if="props.direction === 'right'"
      width="40"
      height="24"
      viewBox="0 0 40 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 12H36M36 12L28 4M36 12L28 20"
        stroke="#00BFFF"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <svg
      v-else-if="props.direction === 'up'"
      width="24"
      height="40"
      viewBox="0 0 24 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 36V4M12 4L4 12M12 4L20 12"
        stroke="#00BFFF"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <svg
      v-else-if="props.direction === 'down'"
      width="24"
      height="40"
      viewBox="0 0 24 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 4V36M12 36L4 28M12 36L20 28"
        stroke="#00BFFF"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{ direction: string }>()

  const arrowClass = computed(() => {
    switch (props.direction) {
      case 'left':
        return 'animate-bounce-x animate-infinite animate-duration-1000 animate-ease-linear'
      case 'right':
        return 'animate-bounce-x-right animate-infinite animate-duration-1000 animate-ease-linear'
      case 'up':
        return 'animate-bounce-y animate-infinite animate-duration-1000 animate-ease-linear'
      case 'down':
        return 'animate-bounce-y-down animate-infinite animate-duration-1000 animate-ease-linear'
      default:
        return ''
    }
  })
</script>

<style scoped>
  @keyframes bounce-x {
    0%,
    100% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(-20px);
    }
  }
  @keyframes bounce-x-right {
    0%,
    100% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(20px);
    }
  }
  @keyframes bounce-y {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }
  @keyframes bounce-y-down {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(20px);
    }
  }
  .animate-bounce-x {
    animation: bounce-x 1s infinite linear;
  }
  .animate-bounce-x-right {
    animation: bounce-x-right 1s infinite linear;
  }
  .animate-bounce-y {
    animation: bounce-y 1s infinite linear;
  }
  .animate-bounce-y-down {
    animation: bounce-y-down 1s infinite linear;
  }
</style>
