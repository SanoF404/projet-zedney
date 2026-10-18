import { EntityHelper } from 'src/shared/database/interfaces/database.entity.interface';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RefParamEntity } from 'src/shared/reference-types/entities/ref-param.entity';

@Entity('tax-rates')
export class TaxRateEntity extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  label: string;

  @Column({ type: 'float' })
  value: number;

  @Column({ type: 'enum', enum: ['rate', 'fixed'], default: 'rate' })
  type: 'rate' | 'fixed';

  @Column({ type: 'boolean', default: false })
  special: boolean;

  @ManyToOne(() => RefParamEntity)
  @JoinColumn({ name: 'currencyId' })
  currency: RefParamEntity;

  @Column({ type: 'int', nullable: true })
  currencyId: number;
}
