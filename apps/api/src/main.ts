import { ConfigService } from './../../../libs/entity/config/configService';
import { NestFactory } from '@nestjs/core';
import * as winston from 'winston';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import { ApiAppModule } from './ApiAppModule';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';
import { SetNestApp } from '@app/common-config/setNestApp';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import expressBasicAuth from 'express-basic-auth';
import * as Sentry from '@sentry/node';
import { SlackService } from '@app/common-config/job/slack/slackService';

class Application {
  private logger = new Logger(Application.name);
  private DEV_MODE: boolean;

  constructor(private server: NestExpressApplication) {
    this.server = server;
    this.DEV_MODE = process.env.NODE_ENV === 'production' ? false : true;
  }

  private async swagger() {
    this.setUpBasicAuth();
    this.setUpOpenAPIMiddleware();
  }

  private setUpBasicAuth() {
    this.server.use(
      ['/docs', '/docs-json'],
      expressBasicAuth({
        challenge: true,
        users: {
          [ConfigService.swaggerAdminAuth().ADMIN_USER]:
            ConfigService.swaggerAdminAuth().ADMIN_PASSWORD,
        },
      }),
    );
  }

  private setUpOpenAPIMiddleware() {
    this.server.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      optionsSuccessStatus: 200,
    });
    const swaggerCustomOptions: SwaggerCustomOptions = {
      swaggerOptions: {
        persistAuthorization: true,
      },
    };
    const options = new DocumentBuilder()
      .setTitle('POG - API')
      .setDescription('POG API 목록')
      .setVersion('0.0.1')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT tokwn',
          in: 'header',
        },
        'Authorization',
      )
      .build();

    const document = SwaggerModule.createDocument(this.server, options);
    SwaggerModule.setup('docs', this.server, document, swaggerCustomOptions);
  }

  private sentry() {
    Sentry.init({
      dsn: ConfigService.sentryDsn(),
    });
  }

  async bootstrap() {
    SetNestApp(this.server, new SlackService());
    this.sentry();
    await this.swagger();
    await this.server.listen(ConfigService.appPort());
  }

  startLog() {
    if (this.DEV_MODE) {
      this.logger.log(
        `✅ Server on http://localhost:${ConfigService.appPort()}`,
      );
    } else {
      this.logger.log(`✅ Server on port ${ConfigService.appPort()}...`);
    }
  }
}

async function bootstrap(): Promise<void> {
  const server = await NestFactory.create<NestExpressApplication>(
    ApiAppModule,
    {
      logger: WinstonModule.createLogger({
        transports: [
          new winston.transports.Console({
            level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
            format: winston.format.combine(
              winston.format.timestamp(),
              nestWinstonModuleUtilities.format.nestLike('MyApp', {
                prettyPrint: true,
              }),
            ),
          }),
        ],
      }),
    },
  );

  const app = new Application(server);
  await app.bootstrap();
  app.startLog();
}

bootstrap().catch(error => {
  new Logger('init').error(error);
});
