import type { SignUpByWalletDTO } from "@dapp/dto/dto.user";
import { API } from "~/routes";
import type { AuthDTO } from "@dapp/dto/dto.auth";

export async function singup(dto: SignUpByWalletDTO) {
  return await API.post<AuthDTO>("/auth/signup", dto);
}
