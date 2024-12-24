<script setup lang="ts">
import type { JobDTO } from "@dapp/dto/dto.job";
import { formatEther } from "viem";

export interface GlobalJobProps extends JobDTO {}

const props = defineProps<GlobalJobProps>();
</script>
<template>
  <div class="rounded-[10px] p-5 bg-white flex flex-col">
    <div class="flex justify-between mb-2.5">
      <p class="font-sherif text-[24px] font-bold">{{ title }}</p>
      <div class="flex flex-col items-end">
        <span class="text-[22px] font-semibold"
          >{{ formatEther(price) }} ETH</span
        >
        <span class="text-[16px] font-medium text-[#797D91]">≈ 3000$</span>
      </div>
    </div>
    <p class="text-[#464646] mb-5">{{ description }}</p>
    <div class="flex justify-between items-center">
      <ul class="flex gap-[5px]">
        <li v-for="tag in tags" :key="tag.id">
          <common-badge> {{ tag.label }} </common-badge>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
