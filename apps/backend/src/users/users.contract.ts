import { demoAbi } from '@internal/abi/abi.demo';
import { Injectable } from '@nestjs/common';
import { createPublicClient, getContract, http } from 'viem';
import { hardhat } from 'viem/chains';
import { eventBus } from '~/classes/classes.event-bus';
import { IContract, ILog } from '~/interfaces/interfaces.contract';
import { UsersService } from '~/users/users.service';
import { PaidArgs } from '@internal/dto/dto.contract.paid';
import { Contract } from 'ethers';

@Injectable()
export class UsersContract implements IContract {
  constructor(private usersService: UsersService) {
    this.init();
  }

  onLogs(logs: ILog<PaidArgs>[]) {
    eventBus.publish('paid', {
      email: 'dsdsds@gma32356idsldsa.com',
    });
  }

  async init() {
    const publicClient = createPublicClient({
      chain: hardhat,
      transport: http(),
    });

    const user = await this.usersService.getUserByEmail(
      'dsdsds@gma32356idsldsa.com',
    );

    if (!user) {
      throw new Error('User not found');
    }

    const contract = getContract({
      address: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
      abi: demoAbi,
      client: publicClient,
    });

    contract.watchEvent.Paid({}, { onLogs: this.onLogs });
  }
}
