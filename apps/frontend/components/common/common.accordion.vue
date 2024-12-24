<script setup lang="ts">
export interface CommonAccordionProps {
  label: string;
}
const state = ref(false);
const props = defineProps<CommonAccordionProps>();
</script>

<template>
  <div class="flex flex-col before:h-[1px] before:bg-gray-300 before:mb-2">
    <button
      @click="state = !state"
      class="label flex items-center justify-between"
    >
      <span class="text-blue-600 text-lg font-medium uppercase">{{
        label
      }}</span>

      <icon-wrapper
        class="duration-300"
        :style="state ? 'transform: rotate(180deg)' : ''"
        width="12"
        height="10"
        stroke="#122952"
      >
        <icons-arrow-dropdown />
      </icon-wrapper>
    </button>
    <transition name="slide">
      <div v-show="state" class="content py-2">
        <slot />
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.2s ease, transform 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
