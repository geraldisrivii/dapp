import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { CreateUserDTO, SignUpByWalletDTO, UserDTO } from '@dapp/dto/dto.user';
import { ApiProperty } from '@nestjs/swagger';
import {
  SwaggerAddress,
  SwaggerBoolean,
  SwaggerEmail,
  SwaggerID,
  SwaggerPassword,
  SwaggerValue,
} from '~/swager/swager.decorators';
import { Role } from '~/roles/roles.model';
import { UsersRoles } from '~/user_roles/users_roles.model';
import { RoleDTO } from '@internal/dto/dto.role';
import { IsEmail, IsString, Length } from 'class-validator';
import { Address, isAddress } from 'viem';
import { IsAddress } from '~/validation/validation.address';

export class CreateUser implements CreateUserDTO {
  @SwaggerEmail()
  @IsEmail()
  email: string;
}

export class SignupByWallet implements SignUpByWalletDTO {
  @SwaggerAddress()
  @IsAddress()
  address: Address;
  @SwaggerValue()
  @IsString()
  signature: Address;
}

@Table({ tableName: 'users' })
export class User extends Model<User, CreateUser> implements UserDTO {
  @SwaggerID()
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @SwaggerEmail()
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @SwaggerAddress()
  @IsAddress()
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  address: Address;

  @SwaggerBoolean()
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean;

  @ApiProperty({ example: 'some reason', description: 'User ban reason' })
  @Column({ type: DataType.STRING, allowNull: true })
  bannedReason: string;

  @ApiProperty({ type: [Role], description: 'User roles' })
  @BelongsToMany(() => Role, () => UsersRoles)
  roles: RoleDTO[];
}
