<template>
  <lazy-client-only>
    <div class="p-4 text-center flex flex-col">
      <button
        v-for="connector in connectors"
        :key="connector.id"
        @click="
          connect({
            connector,
          })
        "
      >
        {{ connector.name }}
      </button>

      <p>{{ address }}</p>

      <button @click="getStr" class="text-3xl font-bold underline">
        getStr
      </button>
      <button @click="Pay">Pay</button>
    </div>
  </lazy-client-only>
</template>

<script setup lang="ts">
import { useAccount, useConnect } from "@wagmi/vue";
import {
  getClient,
  getPublicClient,
  getWalletClient,
} from "@wagmi/vue/actions";
import type { CreateUserDTO } from "@dapp/dto/dto.user";
import { etherUnits, getContract, parseEther } from "viem";
import { config } from "~/configs/configs.wagmi";
import {demoAbi} from "@dapp/abi/abi.demo";

const { connectors, connect } = useConnect();

const { address } = useAccount();



const { $config } = useNuxtApp();

console.log($config.public.DEMO_CONTRACT_ADDRESS);

async function getStr() {
  console.log();
  const contract = getContract({
    address: $config.public.DEMO_CONTRACT_ADDRESS as `0x${string}`,
    abi: demoAbi,
    client: await getWalletClient(config),
  });

  const data = await contract.read.getStr();

  console.log(data);
}

onMounted(() => {
  const client = getPublicClient(config);

  client.watchContractEvent({
    abi: demoAbi,
    address: $config.public.DEMO_CONTRACT_ADDRESS as `0x${string}`,
    eventName: "Paid",
    onLogs: (data) => {
      console.log(data);
    },
  });
});

async function Pay() {
  const client = getPublicClient(config);

  const contract = getContract({
    address: $config.public.DEMO_CONTRACT_ADDRESS as `0x${string}`,
    abi: demoAbi,
    client: await getWalletClient(config),
  });

  const data = await contract.write.pay([], {
    value: parseEther("1"),
  });
}
</script>

<style lang="scss"></style>
