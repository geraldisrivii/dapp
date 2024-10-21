<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { getModalById } from "~/components/modal";

interface ModalTemplateProps {
  id: string;
  title?: string;
  fullscreen?: boolean;
  silenceOutside?: boolean;
  alignTitle?: "left" | "center" | "right";
}

const props = withDefaults(defineProps<ModalTemplateProps>(), {
  alignTitle: "left",
});
const { id: modalId, silenceOutside } = toRefs(props);

const modalTemplateRef = ref();
const modal = getModalById(modalId.value)!;
const { state } = modal;

onClickOutside(modalTemplateRef, (e: PointerEvent) => {
  if (silenceOutside.value) {
    return;
  }
  const target = e.target as HTMLElement;
  const targetParent = target.parentElement;
  if (targetParent?.className.includes("template__")) {
    return;
  }
  modal.setState(false);
});

const setModalState = (_state: boolean) => {
  modal.setState(_state);
};

defineExpose({
  modalId: modalId.value,
  modal,
});
</script>

<template>
  <transition>
    <div
      v-if="state"
      class="bg-white rounded-[10px] p-6 min-w-[350px] min-h-[270px] flex gap-4"
      :class="{ 'template-fullscreen': fullscreen }"
      ref="modalTemplateRef"
    >
      <div v-if="$slots.left">
        <slot name="left" />
      </div>
      <div class="w-full">
        <div class="flex w-full items-end justify-end">
          <button
            @click="setModalState(false)"
            role="button"
            aria-label="close"
          >
            <icon-wrapper width="20" height="20">
              <icons-close />
            </icon-wrapper>
          </button>
        </div>
        <p v-if="title" :class="`font-sherif text-4xl text-blue-600 text-${alignTitle}`">{{ title }}</p>
        <slot />
      </div>
      <div v-if="$slots.right">
        <slot name="right" />
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
// Animation's
.fade {
  &-enter-active,
  &-leave-active {
    transition: $t opacity;
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}
</style>
