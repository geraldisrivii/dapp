import { AuthDTO } from '@dapp/dto/dto.auth';
import { UserDTO } from '@dapp/dto/dto.user';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '~/users/users.model';

export class Auth implements AuthDTO {
  @ApiProperty({ example: 'access token', description: 'Access token' })
  access: string;
  @ApiProperty({ example: 'refresh token', description: 'Refresh token' })
  refresh: string;
  @ApiProperty({ type: User, description: 'User' })
  user: UserDTO;
}
