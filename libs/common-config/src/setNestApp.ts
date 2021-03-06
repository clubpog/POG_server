import { CustomValidationError } from '@app/common-config/filter/CustomValidationError';
import {
  BadRequestException,
  ClassSerializerInterceptor,
  INestApplication,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { HttpExceptionFilter } from './filter/HttpExceptionFilter';
import { SlackService } from './job/slack/SlackService';

export function SetNestApp<T extends INestApplication>(
  app: T,
  slack?: SlackService,
): void {
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
      validateCustomDecorators: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter(slack));
}
