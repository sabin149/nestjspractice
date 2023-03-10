import { AddressDto } from '../../users/dto/address.dto';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Type(() => AddressDto)
  @ValidateNested()
  @IsNotEmpty()
  address: AddressDto;
}
