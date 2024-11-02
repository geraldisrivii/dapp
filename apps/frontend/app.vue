<script setup lang="ts">
import { addEventCallback, event } from "~/libs/event-source";

onMounted(() => {
  event("test", "/users/sse", () => {
    console.log("test");
  });
});
</script>

<template>
  <nuxt-layout>
    <nuxt-page />
  </nuxt-layout>
</template>

<style lang="scss">
@import "./scss/general.scss";
</style>
