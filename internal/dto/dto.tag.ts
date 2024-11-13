import { JobDTO } from "./dto.job";

export interface CreateTagDTO {
  label: string;
}

export interface TagDTO {
  id: number;
  label: string;
  job: JobDTO;
}
