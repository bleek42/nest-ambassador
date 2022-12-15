import { UpdateUserDto } from './../user/dto/update-user.dto';
import { AuthService } from './auth.service';
import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Post,
  Put,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

import { AuthGuard } from './guards/auth.guard';
import { UserService } from './../user/user.service';
import { UserEntity } from 'src/database/entity/user.entity';
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('admin')
  public async validateUser(@Req() request: Request): Promise<UserEntity> {
    const cookie = request.cookies['jwt'];
    const { id } = await this.jwtService.verifyAsync(cookie);
    const user = await this.userService.findByUserId(id);

    return user;
  }

  @UseGuards(AuthGuard)
  @Post('admin/login')
  public async adminLogin(
    @Body('username') username: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ message }> {
    const jwt = await this.authService.login(username, password);
    await response.cookie('jwt', jwt);

    return {
      message: 'User successfully logged in!',
    };
  }

  @UseGuards(AuthGuard)
  @Post('admin/logout')
  public async adminLogout(
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ message }> {
    await response.clearCookie('jwt');

    return {
      message: 'User successfully logged out!',
    };
  }

  @UseGuards(AuthGuard)
  @Put('admin/profile')
  public async updateAdminProfile(
    @Req() request: Request,
    @Body('user') userUpdate: UpdateUserDto,
    @Body('confirmPassword') confirmPassword: string,
  ): Promise<UserEntity> {
    const cookie = request.cookies['jwt'];
    const { id, admin } = await this.jwtService.verifyAsync(cookie);
    if (!admin) {
      throw new UnauthorizedException('User does not have admin privleges!');
    }

    const { username, email, password } = userUpdate;
    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match!');
    }

    await this.userService.updateUser(id, { username, email, password });

    return this.userService.findByUserId(id);
  }
}
