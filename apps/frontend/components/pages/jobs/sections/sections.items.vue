<script setup lang="ts">
import { JobPriceTypeDTO, QueryFiltersDTO } from "@dapp/dto/dto.job";

// stores
const categoriesStore = useCategories();
const jobsStore = useJobs();
// to ref
const { categories, pending } = storeToRefs(categoriesStore);
const { jobs, params, sortSelectItems } = storeToRefs(jobsStore);

// need to SSR
await jobsStore.init();

onMounted(() => {
  Promise.all([categoriesStore.init()]);
});
</script>

<template>
  <section
    class="container pt-[79px] pb-[100px] grid-cols-[280px_1fr] gap-20 grid"
  >
    <div class="flex flex-col">
      <common-accordion label="Categories">
        <common-spinner class="border-black mx-auto" v-if="pending" />
        <template v-else>
          <common-checkbox
            class="uppercase"
            v-for="category in categories"
            :key="category.id"
            :name="category.slug"
            :label="category.name"
          />
        </template>
      </common-accordion>
    </div>
    <div class="flex flex-col">
      <div class="flex justify-between items-center mb-7">
        <div class="flex gap-2.5 items-center">
          <common-button-checkbox
            :name="QueryFiltersDTO.NEW"
            :modelValue="params.filters.new"
            @update:modelValue="
              (value) => jobsStore.setFilter(QueryFiltersDTO.NEW, value)
            "
            class="!rounded-full"
          >
            <span>New</span>
          </common-button-checkbox>

          <common-button-checkbox
            :name="QueryFiltersDTO.NEW"
            :modelValue="params.type === JobPriceTypeDTO.HOUR"
            @update:modelValue="
              (value) =>
                (params.type = value
                  ? JobPriceTypeDTO.HOUR
                  : JobPriceTypeDTO.FIXED)
            "
            class="!rounded-full"
          >
            <span>Hourly Pay</span>
          </common-button-checkbox>
        </div>
        <common-select
          v-model="params.sort"
          :items="sortSelectItems"
          label="Sorting"
        >
          <template name="item" #item="{ item }">
            <button
              class="py-[6px] px-4 uppercase font-semibold text-blue-600 text-opacity-85"
            >
              {{ item.label }}
            </button>
          </template>
        </common-select>
      </div>
      <!-- <scoped-jobs /> -->
      <div class="flex flex-col gap-[30px]">
        <global-job v-for="job in jobs" :key="job.id" v-bind="job" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
