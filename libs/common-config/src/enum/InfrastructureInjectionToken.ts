import { Exclude, Expose } from 'class-transformer';
import { Enum, EnumType } from 'ts-jenum';

@Enum('code')
export class EInfrastructureInjectionToken extends EnumType<EInfrastructureInjectionToken>() {
  @Exclude() private readonly _code: string;
  @Exclude() private readonly _name: string;

  static readonly EVENT_STORE = new EInfrastructureInjectionToken(
    'EVENT_STORE',
    'EventStore',
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
