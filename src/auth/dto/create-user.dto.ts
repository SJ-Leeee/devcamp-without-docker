import { PickType } from '@nestjs/swagger';
import { IsEmail, IsIn, IsString, Length, MinLength } from 'class-validator';
import { User, UserRole } from '../entities';

export class CreateUserDto extends PickType(User, [
  'name',
  'email',
  'password',
  'phone',
  'role',
] as const) {
  @IsString()
  @Length(1, 50)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  phone: string = '00000000000';

  @IsIn(['admin', 'user'])
  role: UserRole = 'admin';
}
