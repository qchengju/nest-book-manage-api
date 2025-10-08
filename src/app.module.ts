import { Module } from '@nestjs/common';

import { APP_FILTER } from '@nestjs/core';
import { CatchEverythingFilter } from './filter/all-exception.filter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from './config/server.config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [TypeOrmModule.forRoot(getDatabaseConfig()), AuthModule, UserModule, BookModule, MailModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CatchEverythingFilter,
    },
  ],
})
export class AppModule {}
