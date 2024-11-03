import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { CreateRoleDTO, RoleDTO } from '@dapp/dto/dto.role';
import { ApiProperty } from '@nestjs/swagger';
import { SwaggerID, SwaggerValue } from '~/swager/swager.decorators';
import { User } from '~/users/users.model';
import { UsersRoles } from '~/user_roles/users_roles.model';
import { UserDTO } from '@internal/dto/dto.user';
import { IsString } from 'class-validator';

export class CreateRole implements CreateRoleDTO {
  @IsString()
  @SwaggerValue()
  value: string;

  @IsString()
  @ApiProperty({ example: 'role description', description: 'Role description' })
  description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, CreateRole> implements RoleDTO {
  @SwaggerID()
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @SwaggerValue()
  @Column({ type: DataType.STRING, allowNull: false })
  value: string;

  @ApiProperty({ example: 'Admininstrator', description: 'Role description' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @BelongsToMany(() => User, () => UsersRoles)
  users: UserDTO[];
}
