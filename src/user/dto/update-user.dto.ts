import { IsNotEmpty, IsEmail, IsBoolean, IsDate } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
