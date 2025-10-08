import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { VerificationService } from './verification.service';

@Module({
  imports: [],
  controllers: [MailController],
  providers: [MailService,VerificationService],
  exports: [MailService,VerificationService],
})
export class MailModule {}
