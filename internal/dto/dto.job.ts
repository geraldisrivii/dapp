import { AttachmentDTO, CreateAttachmentDTO } from "./dto.attachment";
import { CreateTagDTO, TagDTO } from "./dto.tag";
import { UserDTO } from "./dto.user";

export interface CreateJobDTO {
  title: string;
  description: string;
  attachments: CreateAttachmentDTO[];
  price: bigint;
  tags: CreateTagDTO[]
}

export interface JobDTO {
  id: number;
  title: string;
  description: string;
  tags: TagDTO[];
  attachments: AttachmentDTO[];
  user: UserDTO;
  // ETH
  price: bigint;
}

export type JobDTOWithoutRelations = Omit<JobDTO, "user">;
