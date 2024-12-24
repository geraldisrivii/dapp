<script setup lang="ts">
export type CommonButtonCheckboxVariant = "primary";

export interface CommonButtonCheckboxProps {
  variant?: CommonButtonCheckboxVariant;
  name?: string;
  modelValue: boolean;
}

export interface CommonButtonCheckboxEmits {
  (e: "update:modelValue", value: boolean): void;
}

const emit = defineEmits<CommonButtonCheckboxEmits>();
const props = withDefaults(defineProps<CommonButtonCheckboxProps>(), {
  variant: "primary",
});

const { modelValue, name } = toRefs(props);
</script>

<template>
  <button
    @click="emit('update:modelValue', !modelValue)"
    class="button px-[20px] py-[10px] rounded-md"
    :name="name"
    :class="`button_${variant} button_${variant}_${modelValue ? 'active' : 'inactive'}`"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.button {
  &_primary {
    &_active {
      @apply bg-blue-700 text-white;
    }

    &_inactive {
      @apply bg-white text-blue-700;
    }
  }
}
</style>
