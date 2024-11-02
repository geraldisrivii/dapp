import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import {
  CreateUserDTO,
  UserDTO,
} from '@dapp/dto/dto.user';
import { ApiProperty } from '@nestjs/swagger';
import {
  SwaggerBoolean,
  SwaggerEmail,
  SwaggerID,
  SwaggerPassword,
} from '~/swager/swager.decorators';
import { Role } from '~/roles/roles.model';
import { UsersRoles } from '~/user_roles/users_roles.model';
import { RoleDTO } from '@internal/dto/dto.role';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUser implements CreateUserDTO {
  @SwaggerEmail()
  @IsString({ message: 'Email must be a string' })
  @IsEmail()
  email: string;
  @SwaggerPassword()
  @IsString({ message: 'Password must be a string' })
  @Length(8, 32)
  password: string;
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

  @SwaggerPassword()
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

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
