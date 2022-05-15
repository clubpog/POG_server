import { HttpException } from '@nestjs/common';

export interface ISlackService {
  sentryWebhook(request: Request, exception: HttpException): Promise<void>;
}
