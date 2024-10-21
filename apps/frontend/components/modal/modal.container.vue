<script setup lang="ts">
import { useScrollLock } from '@vueuse/core'
import type { ComponentPublicInstance } from 'vue'

const excludeChildrenSelectors = ['tsparticles']
const containerRef = ref<ComponentPublicInstance<HTMLElement>>()
const observedCount = shallowRef(0)
const isNotEmpty = computed(() => observedCount.value > 0)

function onObserve() {
  const childrenArray = [...containerRef.value?.$el?.children]
  observedCount.value =
    childrenArray.filter(
      (x: HTMLElement) =>
        !excludeChildrenSelectors.includes(x.id) &&
        !excludeChildrenSelectors.includes(x.className)
    ).length ?? 0
}
onMounted(() => {
  if (containerRef.value && containerRef.value.$el) {
    const observer = new MutationObserver(onObserve)
    const observerConfig = {
      attributes: true,
      childList: true,
      subtree: true
    }
    observer.observe(containerRef.value.$el, observerConfig)
  }
})
</script>

<template>
  <teleport-target
    id="modal-container"
    class="mcontainer"
    :class="{ 'mcontainer-active': isNotEmpty }"
    ref="containerRef" />
</template>

<style lang="scss" scoped>
.mcontainer {
  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  transition: $t background-color;
  pointer-events: none;
  background-color: rgba(#000, 0);
  z-index: 10001;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  &-active {
    pointer-events: all;
    background-color: rgba(#000, 0.9);
  }
}
</style>
