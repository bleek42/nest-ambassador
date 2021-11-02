import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

import { AuthGuard } from './auth.guard';
import { UserService } from './../user/user.service';
import { UserEntity } from 'src/user/entity/user.entity';
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('admin')
  @UseGuards(AuthGuard)
  public async getAuthUser(@Req() request: Request): Promise<UserEntity> {
    const cookie = request.cookies['jwt'];
    const { id } = await this.jwtService.verifyAsync(cookie);
    const user = await this.userService.findByUserId(id);

    return user;
  }

  @Post('admin/login')
  public async login(
    @Body('username') username: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ message }> {
    const user = await this.userService.findByUsername(username);

    if (!user) {
      throw new NotFoundException(`User with username ${username} not found!`);
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

    await response.cookie('jwt', jwt);

    return {
      message: `User ${user.username} logged in!`,
    };
  }

  @Post('admin/logout')
  public async logout(
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ message }> {
    await response.clearCookie('jwt');

    return {
      message: 'User logged out!',
    };
  }

  private async validateHashedPassword(
    inputPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(inputPassword, hashedPassword);
  }
}
