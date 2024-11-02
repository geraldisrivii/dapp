
import { Body, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from '~/roles/roles.model';
import { RolesService } from '~/roles/roles.service';
import { CreateUser, User } from '~/users/users.model';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    private roleService: RolesService,
  ) {}

  getUsers() {
    return this.userRepository.findAll({ include: [Role] });
  }

  async createUser(dto: CreateUser) {
    const user = await this.userRepository.create(dto);

    const role = await this.roleService.getRoleByValue('user');

    if (!role) {
      throw new HttpException('Role not found', 400);
    }

    user.$set('roles', [role]);

    user.roles = [role];

    return user;
  }

  async getUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }

  async validPassword(user: User, password: string) {
    return bcrypt.compare(password, user.password);
  }

  validPasswordSync(user: User, password: string) {
    return bcrypt.compareSync(password, user.password);
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
