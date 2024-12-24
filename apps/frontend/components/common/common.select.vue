<script setup lang="ts">
import type { SelectItem } from "~/types/constants/types-constants.select";

export interface CommonSelectProps {
  label: string;
  items: SelectItem[];
  modelValue: SelectItem;
}
const state = ref(false);
const props = defineProps<CommonSelectProps>();
</script>

<template>
  <div class="flex flex-col relative">
    <button @click="state = !state" class="label flex items-center gap-2">
      <span class="text-blue-600 font-medium">{{ label }}</span>

      <icon-wrapper
        class="duration-300"
        :style="state ? 'transform: rotate(180deg)' : ''"
        width="11"
        height="10"
        stroke="#213F74"
      >
        <icons-arrow-dropdown />
      </icon-wrapper>
    </button>
    <transition name="slide">
      <div
        v-show="state"
        class="absolute z-20 left-[50%] translate-x-[-50%] w-max top-8 bg-white border border-gray-300 rounded-md content"
      >
        <div class="w-full" v-for="item in items">
          <slot name="item" :item="item" />
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px) translateX(-50%);
}
</style>
