import {
  CreateDateColumn,
  DeleteDateColumn,
  Generated,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LocalDateTime } from 'js-joda';
import { DateTimeUtil } from '../util/DateTimeUtil';
import { BigintValueTransformer } from '../transformer/BigintValueTransformer';

export abstract class BaseTimeEntity {
  @Generated('increment')
  @PrimaryColumn({ type: 'bigint', transformer: new BigintValueTransformer() })
  id: number;

  @CreateDateColumn({ type: 'timestamptz', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: false })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  getCreatedAt(): LocalDateTime {
    return DateTimeUtil.toLocalDateTime(this.createdAt);
  }

  getUpdatedAt(): LocalDateTime {
    return DateTimeUtil.toLocalDateTime(this.updatedAt);
  }

  getDeleteAt(): LocalDateTime | null {
    return DateTimeUtil.toLocalDateTime(this.deletedAt);
  }
}
