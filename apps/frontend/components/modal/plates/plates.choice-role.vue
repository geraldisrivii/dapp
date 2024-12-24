<script setup lang="ts">
import { RoleDTO } from "@dapp/dto/dto.role";
import { getWalletClient } from "@wagmi/core";
import { useAccount } from "@wagmi/vue";
import { getModalById } from "~/components/modal";
import { config } from "~/configs/configs.wagmi";
import { PLATE_CHOICE_ROLE } from "~/constants/constants.plates";
import { singup } from "~/routes/routes.auth";

const modal = getModalById(PLATE_CHOICE_ROLE);

const { address } = useAccount();

const userStore = useUser();

async function onConnect(role: RoleDTO) {
  const walletClient = await getWalletClient(config);

  const signature = await walletClient.signMessage({
    message: "hello",
  });

  if (!address.value) {
    return;
  }

  const response = await singup({
    address: address.value,
    signature,
    role,
  });

  if (response.status === 201) {
    modal?.setState(false);

    userStore.saveUser(response.data);
  }
}
</script>

<template>
  <modal-template
    align-title="center"
    title="Choice your role"
    :id="PLATE_CHOICE_ROLE"
  >
    <div
      class="w-full max-w-[500px] md:w-[500px] flex flex-col gap-2.5 pt-[30px]"
    >
      <div class="flex items-center gap-2.5 w-full">
        <common-button class="w-full" @click="onConnect(RoleDTO.EMPLOYER)">
          Employer
        </common-button>
        <common-button
          @click="onConnect(RoleDTO.EMPLOYEE)"
          class="!text-black w-full"
          variant="outline"
        >
          Freelancer
        </common-button>
      </div>
    </div>
  </modal-template>
</template>

<style lang="scss" scoped></style>
