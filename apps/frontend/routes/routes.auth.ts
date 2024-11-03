import type { SignUpByWalletDTO } from "@dapp/dto/dto.user";
import { API } from "~/routes";
// const { $hello } = useNuxtApp();

export async function singup(dto: SignUpByWalletDTO) {
  return await API.post("/auth/signup", dto);
}
