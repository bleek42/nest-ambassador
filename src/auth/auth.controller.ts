import { UserService } from './../user/user.service';
import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Post,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('admin/login')
  public async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<void> {
    const user = await this.userService.findByUsername(username);
    console.log(user);

    if (!user) {
      throw new NotFoundException(`User with ${username} not found!`);
    }
    const comparePasswords = await this.validateHashedPassword(
      password,
      user.password,
    );
    if (!comparePasswords) {
      throw new BadRequestException('Incorrect password!');
    }
  }

  private async validateHashedPassword(
    inputPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(inputPassword, hashedPassword);
  }
}
