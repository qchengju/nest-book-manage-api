import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

interface SendVerificationCodeOptions {
  to: string;
  code: string;
  subject?: string;
}

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.qq.com', // 以 QQ 邮箱为例
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'qchengju@qq.com', // 发件人邮箱
        pass: 'pyoiaxksbswfdghj',     // 授权码（非登录密码！）
      },
    });
  }

  async sendVerificationCode(options: SendVerificationCodeOptions) {
    const { to, code, subject = '您的邮箱验证码' } = options;

    const html = `
      <h2>邮箱验证码</h2>
      <p>您的验证码是：<strong style="font-size: 24px;">${code}</strong></p>
      <p>有效期 5 分钟，请勿泄露。</p>
    `;

    const mailOptions = {
      from: '"图书管理验证中心" <qchengju@qq.com>',
      to,
      subject,
      html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`验证码已发送至 ${to}`);
    } catch (error) {
      console.error('邮件发送失败:', error);
      throw new Error('邮件发送失败');
    }
  }


}