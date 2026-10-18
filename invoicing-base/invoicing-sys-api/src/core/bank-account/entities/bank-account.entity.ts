import { EntityHelper } from 'src/shared/database/interfaces/database.entity.interface';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { RefParamEntity } from 'src/shared/reference-types/entities/ref-param.entity';

@Entity('bank_account')
export class BankAccountEntity extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 11, nullable: true })
  bic: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  rib: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  iban: string;

  @ManyToOne(() => RefParamEntity)
  @JoinColumn({ name: 'currencyId' })
  currency: RefParamEntity;

  @Column({ type: 'int', nullable: true })
  currencyId: number;

  @Column({ type: 'boolean', default: true })
  isMain: boolean;
}
