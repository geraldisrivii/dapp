<script setup lang="ts">
import type { Diginity } from '~/types/constants/types-constants.diginities';


interface DiginityProps extends Diginity {}

const props = defineProps<DiginityProps>();
</script>
<template>
  <div class="diginity text-center flex flex-col max-w-[300px] min-w-[250px]">
    <div class=" bg-blue-700 bg-opacity-10 w-fit rounded-full p-4 mx-auto mb-6">
      <img v-if="typeof icon === 'string'" :src="icon" :alt="title" />
      <icon-wrapper width="42" height="42" v-else >
        <component :is="icon"/>
      </icon-wrapper>
    </div>
    <p class="font-sherif font-bold text-2xl mb-3">{{ title }}</p>
    <p class="opacity-70">{{ text }}</p>
  </div>
</template>

<style lang="scss" scoped></style>
