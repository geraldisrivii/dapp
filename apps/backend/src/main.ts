import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { Abi, createPublicClient, http } from 'viem';
import { hardhat, mainnet } from 'viem/chains';

import { demoAbi } from '@internal/abi/abi.demo';


async function bootstrap() {
  const publicClient = createPublicClient({
    chain: hardhat,
    transport: http(),
  });

  const unwatch = publicClient.watchContractEvent({
    address: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
    abi: demoAbi,
    eventName: 'Paid',
    onLogs: (logs) => console.log(logs),
  });

  const app = await NestFactory.create(AppModule);

  await app.listen(3002);
}
bootstrap();
