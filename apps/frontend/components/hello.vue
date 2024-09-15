<template>
  <div>
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

    <button @click="getStr">getStr</button>
    <button @click="Pay">Pay</button>
  </div>
</template>

<script setup lang="ts">
import {
  useAccount,
  useConnect,
  useSimulateContract,
  useWriteContract,
} from "@wagmi/vue";
import {
  getClient,
  getWalletClient,
  sendTransaction,
  writeContract,
} from "@wagmi/vue/actions";
// import { sendTransaction } from "@wagmi/vue/actions";
import { etherUnits, getContract, parseEther } from "viem";
import { demoAbi } from "~/abi/demo";
import { config } from "~/configs/configs.wagmi";
// import { sendTransaction } from "viem/actions";

const { connectors, connect } = useConnect();
const { address } = useAccount();

const { $config } = useNuxtApp();

console.log($config.public.DEMO_CONTRACT_ADDRESS);

// const {} = useSimulateContract();

async function getStr() {
  const contract = getContract({
    address: $config.public.DEMO_CONTRACT_ADDRESS as `0x${string}`,
    abi: demoAbi,
    client: await getWalletClient(config),
  });

  const data = await contract.read.getStr();

  console.log(data);
}

async function Pay() {
  const contract = getContract({
    address: $config.public.DEMO_CONTRACT_ADDRESS as `0x${string}`,
    abi: demoAbi,
    client: await getWalletClient(config),
  });

  const data = await contract.write.pay([], {
    value: parseEther("1"),
  });

  console.log(data);
}

// async function sendTransact() {
//   sendTransaction(config, {
//     to: $config.public.DEMO_CONTRACT_ADDRESS as `0x${string}`,
//     value: parseEther("1"),
//   });
// }
</script>

<style lang="scss" scoped></style>
