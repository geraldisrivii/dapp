import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '~/users/users.model';
import { Role } from '~/roles/roles.model';

@Table({ tableName: 'users_roles', createdAt: false, updatedAt: false })
export class UsersRoles extends Model<UsersRoles> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.STRING })
  user_id: string;

  @ForeignKey(() => Role)
  @Column({ type: DataType.BOOLEAN })
  role_id: string;
}
