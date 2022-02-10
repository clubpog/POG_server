import {
  ArgumentsHost,
  ForbiddenException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { ValidationError } from 'class-validator';
import { ResponseEntity } from '@app/common-config/response/ResponseEntity';
import { CustomValidationError } from '@app/common-config/filter/CustomValidationError';
import { ResponseStatus } from '@app/common-config/response/ResponseStatus';

@Catch(ForbiddenException)
export class ForbiddenFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const responseBody = exception.response;
    const isValidationError = responseBody instanceof ValidationError;

    response
      .status(status)
      .json(
        instanceToPlain(
          ResponseEntity.ERROR_WITH_DATA<CustomValidationError[]>(
            '클라이언트의 접근을 거부합니다.',
            ResponseStatus.FORBIDDEN,
            isValidationError
              ? [this.toCustomValidationErrorByNest(responseBody)]
              : (responseBody.message as CustomValidationError[]),
          ),
        ),
      );
  }

  toCustomValidationErrorByNest(
    responseBody: ValidationError,
  ): CustomValidationError {
    return new CustomValidationError(responseBody);
  }
}
