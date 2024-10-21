<script setup lang="ts">
export type CommonButtonVariant =
  | "primary"
  | "outline"
  | "rounded"
  | "rounded-dark";

export interface CommonButtonProps {
  variant?: CommonButtonVariant;
}

const props = withDefaults(defineProps<CommonButtonProps>(), {
  variant: "primary",
});
</script>

<template>
  <button
    class="button text-center rounded-md py-4 px-6 min-w-24"
    :class="`button_${props.variant}`"
  >
    <span class="text-base flex items-center text-white font-medium">
      <slot />
    </span>
  </button>
</template>

<style lang="scss" scoped>
.button {
  &_primary {
    @apply bg-blue-700;
  }

  &_outline {
    @apply border border-b-gray;
  }

  &_rounded{
    @apply bg-blue-700 rounded-full;
  }
}
</style>
