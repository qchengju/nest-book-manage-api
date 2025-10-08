import { Injectable } from '@nestjs/common';
import * as redis from 'redis';

@Injectable()
export class VerificationService {
  private client;

  constructor() {
    this.client = redis.createClient({
      url: 'redis://localhost:6379',
    });
    this.client.connect();
  }

  // 生成 6 位随机验证码
  generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // 存储验证码（默认 5 分钟过期）
  async storeCode(email: string, code: string, expire: number = 300) {
    // 使用新版本 API
    await this.client.set(`verification:${email}`, code, { EX: expire });
  }

  // 校验验证码
  async verifyCode(email: string, inputCode: string): Promise<boolean> {
    const key = `email:verify:${email}`;
    const storedCode = await this.client.get(key);

    if (!storedCode) {
      return false; // 过期或不存在
    }

    // 校验成功后删除验证码（防止重复使用）
    if (storedCode === inputCode) {
      await this.client.del(key);
      return true;
    }

    return false;
  }
}