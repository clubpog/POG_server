import { Logger } from 'libs/common-config/test/stub/LoggerStub';

export class JwtServiceStub {
  private options: object;
  private logger: Logger;

  constructor(
    options: { secret: string; signOptions: object },
    logger: Logger,
  ) {
    this.options = options;
    this.logger = logger;
  }

  public sign(payload) {
    return payload;
  }
}
