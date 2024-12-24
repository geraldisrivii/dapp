<script setup lang="ts">
export type CommonCheckboxVariant = "primary";

export interface CommonCheckboxProps {
  variant?: CommonCheckboxVariant;
  label: string;
  name: string;
  modelValue?: boolean;
}

const props = withDefaults(defineProps<CommonCheckboxProps>(), {
  variant: "primary",
});
</script>

<template>
  <div class="flex">
    <input
      class="checkbox accent-blue-dark"
      :class="`checkbox_${props.variant}`"
      @change="
        $emit('update:modelValue', ($event.target as HTMLInputElement).checked)
      "
      :checked="props.modelValue"
      type="checkbox"
      :name="name"
      :id="name"
    />
    <label
      :for="name"
      class="ml-2 uppercase select-none cursor-pointer"
      :class="modelValue ? 'text-blue-dark' : 'text-[#797D91]'"
      >{{ label }}</label
    >
  </div>
</template>

<style lang="scss" scoped>
.checkbox {
}
</style>
