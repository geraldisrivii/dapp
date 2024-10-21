import { API } from "~/routes";
// const { $hello } = useNuxtApp();

export async function someGet() {
  return await API.get<{ str: "ds" }>("/");
}
