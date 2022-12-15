import { UserService } from './user.service';
import { NewUserDto } from './dto/new-user.dto';
import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  public async register(@Body() newUser: NewUserDto): Promise<void> {
    await this.userService.createUser(newUser);
  }

  @Get('admin/ambassador')
  public async getAmbassadors() {
    return this.userService.findAmbassadors();
  }

  @Patch('admin/set')
  public async updateAdminStatus(@Body() user: unknown) {
    return;
  }

  @Patch('admin/ambassador/set')
  public async updateAmbassadorStatus(@Body() user: unknown) {
    return;
  }

  @Delete('admin/delete/:id')
  public async deleteUserById(@Body() user: unknown) {
    return;
  }
}
