<script setup lang="ts">
const jobsStore = useJobs();
const { jobs } = storeToRefs(jobsStore);

await jobsStore.init()
</script>

<template>
  <div class="flex flex-col">
    <global-job v-for="job in jobs" :key="job.id" v-bind="job" />
  </div>
</template>

<style lang="scss" scoped></style>
