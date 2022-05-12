import { Exclude, Expose } from 'class-transformer';
import { Enum, EnumType } from 'ts-jenum';

@Enum('code')
export class EApplicationInjectionToken extends EnumType<EApplicationInjectionToken>() {
  @Exclude() private readonly _code: string;
  @Exclude() private readonly _name: string;

  static readonly PUSH_JOB = new EApplicationInjectionToken(
    'PUSH_JOB',
    'PushJob',
  );

  static readonly RIOT_API_JOB = new EApplicationInjectionToken(
    'RIOT_API_JOB',
    'RiotApiJob',
  );

  static readonly BULL_JOB = new EApplicationInjectionToken(
    'BULL_JOB',
    'BullJob',
  );

  static readonly PUSH_API_TASK = new EApplicationInjectionToken(
    'PUSH_API_TASK',
    'PushApiTask',
  );

  private constructor(code: string, name: string) {
    super();
    this._code = code;
    this._name = name;
  }

  @Expose()
  get code(): string {
    return this._code;
  }

  @Expose()
  get name(): string {
    return this._name;
  }

  toCodeName() {
    return {
      code: this.code,
      name: this.name,
    };
  }
}
