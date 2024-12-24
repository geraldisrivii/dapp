<script setup lang="ts">
export interface CommonSpinnerProps {}

const props = withDefaults(defineProps<CommonSpinnerProps>(), {});
</script>
<template>
  <span
    class="loader block size-[28px] animate-spin border-white rounded-full"
  ></span>
</template>

<style scoped lang="scss">
.loader {
  @apply border-[3px] border-solid border-b-transparent;
}
</style>
