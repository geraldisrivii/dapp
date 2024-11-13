import { HttpException, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  createFile(file: Express.Multer.File): string {
    try {
      const filename = uuid.v4() + path.extname(file.originalname);

      const dirPath = path.join(__dirname, '..', 'static');

      const filePath = path.join(dirPath, filename);

      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      fs.writeFileSync(filePath, file.buffer);

      return filename;
    } catch (error: any) {
      throw new HttpException(error.message, 500);
    }
  }
}
