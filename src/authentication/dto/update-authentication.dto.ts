import { PartialType } from '@nestjs/mapped-types';
import { LoginDto } from './login.dto';

export class UpdateAuthenticationDto extends PartialType(LoginDto) {}
