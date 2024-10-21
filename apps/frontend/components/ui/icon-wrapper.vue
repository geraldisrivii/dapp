<script lang="ts" setup>
export interface IconWrapperProps {
  width?: string | number;
  height?: string | number;
  color?: string;
  stroke?: string;
}

withDefaults(defineProps<IconWrapperProps>(), {
  height: "24",
  width: "24",
  color: "currentColor",
  stroke: "none",
});
</script>

<template>
  <svg
    class="flex"
    role="presentation"
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :stroke="stroke"
    :style="`min-width: ${width}px; min-height: ${height}px`"
    :viewBox="`0 0 ${width} ${height}`"
  >
    <g :fill="color">
      <slot />
    </g>
  </svg>
</template>

<style scoped>
svg {
  display: block;
}
</style>
