import { ArgumentMetadata, HttpException, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export class ProjectValidationPipe implements PipeTransform<Promise<any>> {
  async transform(value: any, metadata: ArgumentMetadata) {
    console.log(value, metadata);
    const obj = plainToInstance(metadata.metatype!, value);

    const errors = await validate(obj);

    console.log(errors);

    if (errors.length) {
      throw new HttpException(
        {
          errors: errors.reduce((acc, err) => {
            acc[err.property] = Object.values(err.constraints!)
              .reverse()
              .join(', ');
            return acc;
          }, {}),
        },
        422,
      );
    }

    return value;
  }
}
