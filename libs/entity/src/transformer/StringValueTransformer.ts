import { ValueTransformer } from 'typeorm';

export class StringValueTransformer implements ValueTransformer {
  to(entityValue: string): string {
    return entityValue;
  }

  from(databaseValue: number): string {
    return String(databaseValue);
  }
}
