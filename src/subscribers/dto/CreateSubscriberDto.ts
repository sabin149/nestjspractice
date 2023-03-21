import { IsEmail } from 'class-validator';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubscriberDto {
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  name: string;
}
