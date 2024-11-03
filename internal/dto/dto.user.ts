import { Address } from "viem";
import { RoleDTO } from "./dto.role";

export interface CreateUserDTO {
  email: string;
}

export interface SignUpByWalletDTO {
  address: Address;
  signature: Address;
}

export interface UserDTO {
  id: number;

  email: string;

  banned: boolean;

  bannedReason: string;

  roles: RoleDTO[];
}

export interface RelatedUserDTO extends Omit<UserDTO, "roles"> {}
