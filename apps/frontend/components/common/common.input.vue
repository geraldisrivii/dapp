<script setup lang="ts">
export type CommonInputVariant = "outline";

export interface CommonInputProps {
  modelValue?: string;
  variant?: CommonInputVariant;
  placeholder?: string;
  label?: string;
}

export interface CommonInputEmits {
  (e: "update:modelValue", value: string): void;
}

const props = withDefaults(defineProps<CommonInputProps>(), {
  variant: "outline",
  placeholder: "",
});

const emit = defineEmits<CommonInputEmits>();

function onInput(event: Event) {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
}
</script>

<template>
  <div class="flex flex-col">
    <label v-if="label" class="text-blue-dark">{{ label }}</label>
    <div class="relative">
      <input
        class="input w-full bg-gray-200 rounded-[3.2rem] py-3.5 px-6 min-w-[124px] focus:outline-none"
        :class="`input_${props.variant}`"
        :value="props.modelValue"
        :placeholder="placeholder"
        @input="onInput"
      />
      <slot/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input {
  &_outline {
    @apply border border-gray-500;
  }
}
</style>
