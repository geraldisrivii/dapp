import { UserDTO } from "./dto.user";

export interface AuthDTO {
  access: string;
  refresh: string;
  user: UserDTO;
}


