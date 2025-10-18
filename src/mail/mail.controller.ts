import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { VerificationService } from './verification.service';
import { ApiTags } from '@nestjs/swagger';
@Controller('auth')
@ApiTags('权限校验')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private readonly verificationService: VerificationService
  ) {}

  @Get('send-code')
  async sendVerificationCode(@Query('email') email: string) {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      throw new BadRequestException('无效的邮箱地址');
    }

    const code = this.verificationService.generateCode();
    await this.verificationService.storeCode(email, code);
    await this.mailService.sendVerificationCode({ to: email, code });

    return { code: 200, message: '验证码已发送', data: null };
  }

  //   @Get('verify-code')
  //   async verifyCode(
  //     @Query('email') email: string,
  //     @Query('code') code: string,
  //   ) {
  //     if (!email || !code) {
  //       throw new BadRequestException('缺少参数');
  //     }

  //     const isValid = await this.verificationService.verifyCode(email, code);
  //     if (!isValid) {
  //       throw new BadRequestException('验证码错误或已过期');
  //     }

  //     return { success: true, message: '验证码校验成功' };
  //   }
}
