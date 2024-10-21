<script setup lang="ts">
import type { Category } from "~/types/constants/types-constants.temp-categories";

interface GlobalCategoryProps extends Category {}

const props = withDefaults(defineProps<GlobalCategoryProps>(), {});
</script>
<template>
  <button class="category rounded-xl relative h-full w-full">
    <nuxt-img
      class="w-full h-full object-cover rounded-xl"
      :src="`${image}.png`"
      format="webp,avif"
      loading="lazy"
      :srcset="`${image}.png 1x, ${image}.png 2x`"
      :alt="name"
    />
    <div
      class="absolute bottom-4 px-4 w-full flex items-center justify-between"
    >
      <p class="text-2xl uppercase text-white">{{ name }}</p>
      <div
        class="rounded-full bg-white size-[40px] flex items-center justify-center"
      >
        <icon-wrapper stroke="#C6BCB2" width="7" height="12">
          <icons-arrow />
        </icon-wrapper>
      </div>
    </div>
  </button>
</template>

<style lang="scss" scoped></style>
