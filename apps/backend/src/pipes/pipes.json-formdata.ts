import {
  ArgumentMetadata,
  ExecutionContext,
  HttpException,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export class FormDataToJson<T extends Record<string, any>>
  implements PipeTransform<Record<keyof T, any>>
{
  private transformFields: Array<keyof T>;
  constructor(...transformFields: Array<keyof T>) {
    this.transformFields = transformFields;
  }

  async transform(value: Record<keyof T, any>, metadata: ArgumentMetadata) {
    try {
      this.transformFields.forEach((field) => {
        
        if (value[field] == null) {
          return;
        }

        value[field] = JSON.parse(value[field]);
      });
      return value;
    } catch (error: any) {
      throw new HttpException(error.message, 400);
    }
  }
}
