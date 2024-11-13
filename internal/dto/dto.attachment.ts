import { UserDTO } from "./dto.user";

export enum AttachmentType {
  IMAGE = "IMAGE",
  LINK = "LINK",
};

export interface AttachmentDTO {
  id: number;
  title: string;
  value: string;
  type: AttachmentType;
}

export interface CreateAttachmentDTO extends Omit<AttachmentDTO, "id"> {}




