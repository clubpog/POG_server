export class Logger {
  private context: string;
  private option: object;

  constructor(context?: string, option?: object) {
    this.context = context;
    this.option = option;
  }

  error(log: string, error: string) {
    return log;
  }
}
