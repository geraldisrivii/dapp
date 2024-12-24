import type { CategoryDTO } from "@dapp/dto/dto.category";
import { getCategories } from "~/routes/routes.categories";

export const useCategories = defineStore("categories", function () {
  const categories = ref<CategoryDTO[]>([]);

  const { pending, withPending } = usePending();

  const fetchCategories = async function () {
    categories.value = (await getCategories()).data;
  };

  const init = async function () {
    if(!categories.value.length) {
      await withPending(fetchCategories);
    }
  };

  return {
    // S
    categories,
    pending,
    // F
    fetchCategories,
    init
  };
});
