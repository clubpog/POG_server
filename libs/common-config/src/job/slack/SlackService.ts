import { Injectable, HttpException } from '@nestjs/common';
import { ISlackService } from './interface/ISlackService';
import { IncomingWebhook } from '@slack/client';
import { ConfigService } from '../../../../entity/config/configService';

@Injectable()
export class SlackService implements ISlackService {
  async sentryWebhook(
    request: Request,
    exception: HttpException,
  ): Promise<void> {
    const webhook = new IncomingWebhook(ConfigService.slackSentryHook());
    const { method, url } = request;

    webhook.send({
      attachments: [
        {
          color: 'danger',
          text: '🚨 Server Error 🚨',
          fields: [
            {
              title: `Request URL: ${method} ${url}`,
              value: exception.stack,
              short: false,
            },
          ],
          ts: Math.floor(new Date().getTime() / 1000).toString(),
        },
      ],
    });
  }

  failToConnectSlack(error: Error): Promise<void> {
    console.error(error);
    process.exit(1);
  }
}
