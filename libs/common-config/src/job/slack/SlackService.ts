import { IncomingWebhook } from '@slack/webhook';
import { Injectable, HttpException } from '@nestjs/common';
import { ISlackService } from './interface/ISlackService';
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
          pretext: '시스템 가동 준비 실패',
          author_name: 'POG Server Error',
          author_icon:
            'https://user-images.githubusercontent.com/59385491/165659528-1b289595-352b-40c0-95ee-19b8d9b438d1.png',
          title: '🚨 Server Error 🚨',
          title_link:
            'https://sentry.io/organizations/pog_server/issues/?project=6365859',
          fields: [
            {
              title: `Request URL: ${method} ${url}`,
              value: exception.stack,
              short: false,
            },
          ],
          footer: 'Sentry',
          footer_icon:
            'https://user-images.githubusercontent.com/59385491/165660470-adca4360-64f4-4ef9-a48f-f6984020cfb3.png',
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
