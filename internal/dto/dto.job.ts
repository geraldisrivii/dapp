import { AttachmentDTO, CreateAttachmentDTO } from "./dto.attachment";
import { CategoryDTO } from "./dto.category";
import { CreateTagDTO, TagDTO } from "./dto.tag";
import { UserDTO } from "./dto.user";

export interface CreateJobDTO {
  title: string;
  description: string;
  attachments: CreateAttachmentDTO[];
  price: bigint;
  tags: CreateTagDTO[];
  category: string;
  type: JobPriceTypeDTO;
}

export enum QueryFiltersDTO {
  NEW = "new",
}

export enum JobsSortEnum {
  DATE = "createdAt",
  PRICE = "price",
}


export enum JobPriceTypeDTO {
  HOUR = "hour",
  FIXED = "fixed",
}

export interface JobDTO {
  id: number;
  title: string;
  description: string;
  tags: TagDTO[];
  attachments: AttachmentDTO[];
  user: UserDTO;
  category: CategoryDTO;
  // ETH
  price: bigint;

  // type of price
  type: JobPriceTypeDTO;
}

export type JobDTOWithoutRelations = Omit<JobDTO, "user">;
