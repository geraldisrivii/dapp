import { ArgumentMetadata, HttpException, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export class QueryParserPipe<T extends string> implements PipeTransform<T> {
  private transformFields: string[];
  constructor(...transformFields: string[]) {
    this.transformFields = transformFields;
  }
  async transform(value: string, metadata: ArgumentMetadata) {
    if (
      metadata.type === 'query' &&
      metadata.data &&
      this.transformFields.includes(metadata.data)
    ) {
      if (!value) {
        return [];
      }
      return value.replace(' ', '').split(',');
    }
    return value;
  }
}
