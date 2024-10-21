<script setup lang="ts">
import type { Connector } from '@wagmi/core';

interface GlobalWalletConnectButtonProps {
  name: string;
  icon: string;
  type: string;
}

const { name } = defineProps<GlobalWalletConnectButtonProps>();
</script>

<template>
  <div class="">
    <p>{{ name }}</p>
  </div>
</template>

<style lang="scss" scoped></style>
