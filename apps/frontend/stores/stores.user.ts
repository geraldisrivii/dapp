import type { AuthDTO } from "@dapp/dto/dto.auth";
import type { UserDTO } from "@dapp/dto/dto.user";

export const useUser = defineStore("user", function () {
  const user = ref<UserDTO>(localStorage.getItem("user") as unknown as UserDTO);

  function saveUser(auth: AuthDTO) {
    user.value = auth.user;

    // localStorage
    localStorage.setItem("user", JSON.stringify(auth.user));
    localStorage.setItem("access", JSON.stringify(auth.access));
    localStorage.setItem("refresh", JSON.stringify(auth.refresh));
  }

  return {
    user,
    saveUser,
  };
});
