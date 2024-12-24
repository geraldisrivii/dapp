import type { CategoryDTO } from "@dapp/dto/dto.category";
import {
  JobPriceTypeDTO,
  JobsSortEnum,
  QueryFiltersDTO,
  type JobDTO,
} from "@dapp/dto/dto.job";
import { useDebounceFn } from "@vueuse/core";
import { getJobs } from "~/routes/routes.jobs";
import type { SelectItem } from "~/types/constants/types-constants.select";

export interface JobsQuery {
  categories: string[];
  filters: Record<QueryFiltersDTO, boolean>;
  type: JobPriceTypeDTO;
  sort: SelectItem<"asc" | "desc">;
}

export const useJobs = defineStore("jobs", function () {
  const jobs = ref<JobDTO[]>([]);

  const { pending, withPending } = usePending();

  const params = reactive<JobsQuery>({
    categories: [],
    filters: {
      [QueryFiltersDTO.NEW]: false,
    },
    type: JobPriceTypeDTO.FIXED,
    sort: { label: "price", value: "asc" },
  });

  const sortSelectItems = ref<SelectItem[]>([
    { label: "price asc", value: "asc" },
    { label: "price desc", value: "desc" },
  ]);

  const fetchJobs = async function () {
    jobs.value = (await getJobs()).data;
  };

  const init = async function () {
    if (!jobs.value.length) {
      await withPending(fetchJobs);
    }
  };

  function setFilter(name: QueryFiltersDTO, value: boolean) {
    params.filters[name] = value;
  }

  function getFilter(name: QueryFiltersDTO) {
    return params.filters[name];
  }

  watch(
    params,
    useDebounceFn(() => {
      withPending(fetchJobs);
    }, 200)
  );

  return {
    // S
    jobs,
    pending,
    params,
    sortSelectItems,
    // F
    fetchJobs,
    setFilter,
    getFilter,
    init,
  };
});
