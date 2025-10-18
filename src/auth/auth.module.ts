import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { MailModule } from '../mail/mail.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { getServerConfig } from '../config/server.config';
import { ConfigEnum } from '../enum/config.enum';
import { JwtStrategy } from './auth.strategy';

@Module({
  imports: [
    MailModule,
    UserModule,
    PassportModule,
    JwtModule.register({
      // 开启全局后，其他模块不需要导入JwtModule
      global: true,
      secret: getServerConfig()?.[ConfigEnum.JWT_SECRET],
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
})
export class AuthModule {}
