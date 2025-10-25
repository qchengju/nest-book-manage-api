import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, writeFileSync, unlinkSync, rename } from 'fs';
import { join } from 'path';
import { getCurrentDir } from '../config/server.config';

@Injectable()
export class FileService {
  private readonly uploadDir = join(getCurrentDir(), 'uploads');

  constructor() {
    // 确保上传目录存在
    if (!existsSync(this.uploadDir)) {
      mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  saveFile(file: Express.Multer.File, fileName?: string): string {
    const finalFileName = fileName || `${Date.now()}-${file.originalname}`;
    const filePath = join(this.uploadDir, finalFileName);

    // 如果提供了 buffer，则写入 buffer 数据
    if (file.buffer) {
      writeFileSync(filePath, file.buffer);
    } else if (file.path) {
      rename(file.path, filePath, err => {
        if (err) {
          throw err;
        }
      });
    } else {
      throw new Error('文件数据无效');
    }

    return `${this.uploadDir}/${finalFileName}`;
  }

  /**
   * 删除文件
   * @param filePath 文件路径
   */
  deleteFile(filePath: string): void {
    try {
      const fullPath = join(process.cwd(), filePath);
      unlinkSync(fullPath);
    } catch (error) {
      // 文件不存在或删除失败，可以选择记录日志
      console.warn(`Failed to delete file: ${filePath}`, error);
    }
  }

  generateUniqueFileName(originalName: string): string {
    const ext = originalName.split('.').pop();
    const nameWithoutExt = originalName.split('.').slice(0, -1).join('.');
    return `${nameWithoutExt}-${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
  }

}
