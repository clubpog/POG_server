import { BadParameterFilter } from './filter/BadParameterFilter';
import { CustomValidationError } from '@app/common-config/filter/CustomValidationError';
import {
  BadRequestException,
  ClassSerializerInterceptor,
  INestApplication,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ForbiddenFilter } from './filter/ForbiddenFilter';

export function SetNestApp<T extends INestApplication>(app: T): void {
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validationError: {
        value: true,
      },
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(
          validationErrors.map(e => new CustomValidationError(e)),
        );
      },
    }),
  );
  app.useGlobalFilters(new BadParameterFilter(), new ForbiddenFilter());
}
