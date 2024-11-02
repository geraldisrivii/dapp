import { RoleDTO } from "./dto.role";

export interface CreateUserDTO {
  email: string;
  password: string;
}

export interface UserDTO {
  id: number;

  email: string;

  password: string;

  banned: boolean;

  bannedReason: string;

  roles: RoleDTO[];
}

export interface RelatedUserDTO extends Omit<UserDTO, "roles"> {}
