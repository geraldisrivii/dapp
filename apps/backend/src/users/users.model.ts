import { CreateUserDTO, SignUpByWalletDTO, UserDTO } from '@dapp/dto/dto.user';
import { ApiProperty } from '@nestjs/swagger';
import {
  SwaggerAddress,
  SwaggerBoolean,
  SwaggerEmail,
  SwaggerEnum,
  SwaggerID,
  SwaggerPassword,
  SwaggerToken,
  SwaggerValue,
} from '~/swager/swager.decorators';
import { RoleDTO } from '@internal/dto/dto.role';
import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { Address, isAddress } from 'viem';
import { IsAddress } from '~/validation/validation.address';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RefreshDTO } from '@internal/dto/dto.auth';

export class CreateUser implements CreateUserDTO {
  @SwaggerAddress()
  @IsAddress()
  address: Address;
  @SwaggerEnum(RoleDTO)
  @IsEnum(RoleDTO)
  role: RoleDTO;
}

export class Refresh implements RefreshDTO{
  @IsString()
  @SwaggerToken()
  refresh: string;
}

export class SignupByWallet implements SignUpByWalletDTO {
  @SwaggerAddress()
  @IsAddress()
  address: Address;
  @SwaggerValue()
  @IsString()
  signature: Address;
  @SwaggerEnum(RoleDTO)
  @IsEnum(RoleDTO)
  role: RoleDTO;
}

@Entity({
  name: 'users',
})
export class User implements UserDTO {
  @SwaggerID()
  @PrimaryGeneratedColumn()
  id: number;

  @SwaggerEmail()
  @Column({ nullable: true, type: 'varchar' })
  email: string;

  @SwaggerAddress()
  @IsAddress()
  @Column({ nullable: false, type: 'varchar' })
  address: Address;

  @Column({ type: 'enum', enum: RoleDTO, default: RoleDTO.EMPLOYEE })
  role: RoleDTO;

  @SwaggerBoolean()
  @Column({ type: 'boolean', default: false })
  banned: boolean;

  @ApiProperty({ example: 'some reason', description: 'User ban reason' })
  @Column({ type: 'varchar', nullable: true })
  bannedReason: string;
}
