import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from 'src/user/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private async validateHashedPassword(
    inputPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(inputPassword, hashedPassword);
  }

  public async login(username: string, password: string): Promise<string> {
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
      admin: user.admin,
    });

    return jwt;
  }
}
