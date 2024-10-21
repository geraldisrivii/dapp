<template>
  <div class="categories bg-black-600 relative py-[147px]">
    <div class="container">
      <div class="grid grid-cols-[_repeat(3,1fr)_400px_] grid-rows-[_310px_310px_] gap-6">
        <global-category
          :class="`row-span-${category.rows ?? 1} col-span-${category.cols ?? 1}` "
          v-for="category in categories"
          v-bind="category"
        />
      </div>
      <!-- <div class="grid grid-rows-3 grid-flow-col gap-4">
        <div class="row-span-3 ...">01</div>
        <div class="col-span-2 ...">02</div>
        <div class="row-span-2 col-span-2 ...">03</div>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { categories } from "~/constants/constants.temp-categories";
</script>

<style lang="scss" scoped></style>
