import { Body, HttpException, Injectable } from '@nestjs/common';
import { CreateUser, User } from '~/users/users.model';
import * as bcrypt from 'bcryptjs';
import { Address } from 'viem';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  getUsers() {
    return this.userRepository.find();
  }

  async createUser(dto: CreateUser) {
    return this.userRepository.save(dto);
  }

  async getUserByAddress(address: Address) {
    return this.userRepository.findOne({
      where: { address },
    });
  }

  async getUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
    });
  }


  // async addRole(dto: AddUserRoleDTO) {
  //   let user = await this.userRepository.findOne({
  //     where: { email: dto.email },
  //     include: { all: true },
  //   });

  //   if (!user) {
  //     throw new HttpException('User not found', 400);
  //   }

  //   const role = await this.roleService.getRoleByValue(dto.role);

  //   if (!role) {
  //     throw new HttpException('Role not found', 400);
  //   }

  //   if (user.roles.find((role) => role.value === dto.role)) {
  //     throw new HttpException('User already has this role', 400);
  //   }

  //   user.$add('roles', [role]);

  //   user.roles.push(role);

  //   user.save();

  //   return user;
  // }

  // async banUser(dto: BanUserDTO) {
  //   let user = await this.userRepository.findOne({
  //     where: { email: dto.email },
  //     include: { all: true },
  //   });

  //   if (!user) {
  //     throw new Error('User not found');
  //   }

  //   if (user.banned) {
  //     throw new HttpException('User already banned', 400);
  //   }

  //   user.bannedReason = dto.reason;

  //   user.banned = true;

  //   user.save();

  //   return user;
  // }
}
