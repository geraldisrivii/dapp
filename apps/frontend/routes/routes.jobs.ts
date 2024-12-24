import { API } from "~/routes";
import type { JobDTO } from "@dapp/dto/dto.job";

export async function getJobs() {
  return await API.get<JobDTO[]>("/jobs", {params: {
    categories: ['3d', 'web']
  }});
}
