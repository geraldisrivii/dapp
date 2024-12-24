import { Address } from "viem";
import { RoleDTO } from "./dto.role";

export interface CreateUserDTO {
  address: string;
}

export interface SignUpByWalletDTO {
  address: Address;
  signature: Address;
  role: RoleDTO
}

export interface UserDTO {
  id: number;

  email: string;

  banned: boolean;

  bannedReason: string;

  address: Address;

  role: RoleDTO;
}

export interface RelatedUserDTO extends Omit<UserDTO, "roles"> {}
