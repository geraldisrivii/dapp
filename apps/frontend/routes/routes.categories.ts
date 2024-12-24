import type { SignUpByWalletDTO } from "@dapp/dto/dto.user";
import { API } from "~/routes";
import type { CategoryDTO } from "@dapp/dto/dto.category";

export async function getCategories() {
  return await API.get<CategoryDTO[]>("/categories");
}
