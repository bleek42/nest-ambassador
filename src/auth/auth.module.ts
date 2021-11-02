import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret:
        '684fd5864a28236520baf8623d3aa0dea4f5c893adcf72880711280da8673e8e312e8c4821e181a4e1e49131f60ed18ebaa730b97debb51e08a4bd0c0e915cfc',
      signOptions: {
        expiresIn: '1d',
      },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
