import { UserService } from './user.service';
import { NewUserDto } from './dto/new-user.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  public async register(@Body() newUser: NewUserDto): Promise<void> {
    await this.userService.createUser(newUser);
  }

  @Get('admin/ambassadors')
  public async getAmbassadors() {
    return this.userService.findAmbassadors();
  }
}
