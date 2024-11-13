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
import { RoleDTO } from '@internal/dto/dto.role';
import { IsEmail, IsString, Length } from 'class-validator';
import { Address, isAddress } from 'viem';
import { IsAddress } from '~/validation/validation.address';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export class CreateUser implements CreateUserDTO {
  @SwaggerAddress()
  @IsAddress()
  address: Address;
}

export class SignupByWallet implements SignUpByWalletDTO {
  @SwaggerAddress()
  @IsAddress()
  address: Address;
  @SwaggerValue()
  @IsString()
  signature: Address;
}

@Entity({
  name: 'users',
})
export class User implements UserDTO {
  @SwaggerID()
  @PrimaryGeneratedColumn()
  id: number;

  @SwaggerEmail()
  @Column({ unique: true, nullable: true, type: 'varchar' })
  email: string;

  @SwaggerAddress()
  @IsAddress()
  @Column({ unique: true, nullable: false, type: 'varchar' })
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
