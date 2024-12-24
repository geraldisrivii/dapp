<script setup lang="ts">
export type CommonBadgeVariant = "primary";

export interface CommonBadgeProps {
  variant?: CommonBadgeVariant;
}

const props = withDefaults(defineProps<CommonBadgeProps>(), {
  variant: "primary",
});
</script>

<template>
  <button
    class="badge text-center rounded-sm py-[3px] px-[6px]"
    :class="`badge_${props.variant}`"
  >
    <span
      class="text-center text-[12px] uppercase flex justify-center items-center"
    >
      <slot />
    </span>
  </button>
</template>

<style lang="scss" scoped>
.badge {
  &_primary {
    @apply bg-blue-dark text-white;
  }
}
</style>
