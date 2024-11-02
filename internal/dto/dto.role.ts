import { UserDTO } from "./dto.user";

export interface CreateRoleDTO {
  value: string;

  description: string;
}

export interface RoleDTO {
  id: number;

  value: string;

  description: string;

  users: UserDTO[];
}

export interface RelatedRoleDTO extends Omit<RoleDTO, "users"> {}
