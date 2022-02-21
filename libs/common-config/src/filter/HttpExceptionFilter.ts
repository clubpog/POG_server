import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { ValidationError } from 'class-validator';
import { ResponseEntity } from '@app/common-config/response/ResponseEntity';
import { CustomValidationError } from '@app/common-config/filter/CustomValidationError';
import { ResponseStatus } from '@app/common-config/response/ResponseStatus';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const responseBody = exception.getResponse();
    const ResponseStatusValue =
      Object.keys(ResponseStatus)[
        Object.values(ResponseStatus).indexOf(status as ResponseStatus)
      ];
    const isValidationError = responseBody instanceof ValidationError;

    return response
      .status(status)
      .json(
        instanceToPlain(
          ResponseEntity.ERROR_WITH_DATA<CustomValidationError[]>(
            responseBody['error'] === undefined
              ? responseBody['message']
              : responseBody['error'],
            ResponseStatus[ResponseStatusValue],
            isValidationError
              ? [this.toCustomValidationErrorByNest(responseBody)]
              : (responseBody['message'] as CustomValidationError[]),
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
