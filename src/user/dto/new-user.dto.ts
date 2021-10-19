import { IsEmail, IsNotEmpty } from 'class-validator';

export class NewUserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly confirmPassword: string;
}
