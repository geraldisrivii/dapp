<script setup lang="ts">
const isActive = ref(false);
</script>

<template>
  <div class="relative">
    <button @click="isActive = !isActive">
      <slot />
    </button>
    <transition name="slide">
      <div
        v-show="isActive"
        class="absolute z-20 left-0 w-full right-0 top-[calc(100%+5px)] bg-white border border-gray-300 p-3 rounded-md"
      >
        <slot name="content" />
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
