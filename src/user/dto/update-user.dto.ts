import { IsNotEmpty, IsEmail, IsBoolean, IsDate } from 'class-validator';
import { AfterInsert } from 'typeorm';

export class UpdateUserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  // @IsNotEmpty()
  // readonly confirmPassword: string;
}
