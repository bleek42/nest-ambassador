import { UserService } from './../user/user.service';
import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Post,
  Res,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('admin/login')
  public async login(
    @Body('username') username: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ message }> {
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

    const jwt = await this.jwtService.signAsync({
      id: user.id,
    });

    response.cookie('jwt', jwt);

    return {
      message: `User ${user.username} logged in!`,
    };
  }

  private async validateHashedPassword(
    inputPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(inputPassword, hashedPassword);
  }
}
