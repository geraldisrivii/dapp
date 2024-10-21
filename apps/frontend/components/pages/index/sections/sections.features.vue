<template>
  <div class="features relative mb-[123px]">
    <div class="container-1140 text-center">
      <p class="uppercase font-medium mb-2 text-blue-700">Features</p>
      <p class="h2 mb-16">Our ethereum-based freelance platform</p>
      <div class="flex lg:justify-between flex-wrap justify-center gap-12">
        <scoped-diginity
          v-for="(diginity, index) in diginities"
          :key="index"
          v-bind="diginity"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { diginities } from "~/constants/constants.diginitites";
</script>

<style lang="scss" scoped></style>
