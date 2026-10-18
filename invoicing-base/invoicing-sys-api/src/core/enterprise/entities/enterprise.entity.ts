import { EntityHelper } from 'src/shared/database/interfaces/database.entity.interface';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EnterpriseInterlocutorEntity } from './enterprise-interlocutor.entity';
import { RefParamEntity } from 'src/shared/reference-types/entities/ref-param.entity';
import { AddressEntity } from './address.entity';

@Entity('enterprise')
export class EnterpriseEntity extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'varchar', nullable: true })
  website: string;

  @Column({ type: 'boolean', default: true })
  particular: boolean;

  @Column({ type: 'varchar', nullable: false })
  taxId: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'boolean', default: false })
  system: boolean;

  @OneToMany(
    () => EnterpriseInterlocutorEntity,
    (enterpriseInterlocutor) => enterpriseInterlocutor.enterprise,
  )
  interlocutors: EnterpriseInterlocutorEntity[];

  @ManyToOne(() => RefParamEntity)
  @JoinColumn({ name: 'activityId' })
  activity: RefParamEntity;

  @Column({ type: 'int', nullable: true })
  activityId: number;

  @ManyToOne(() => RefParamEntity)
  @JoinColumn({ name: 'currencyId' })
  currency: RefParamEntity;

  @Column({ type: 'int', nullable: true })
  currencyId: number;

  @ManyToOne(() => RefParamEntity)
  @JoinColumn({ name: 'paymentConditionId' })
  paymentCondition: RefParamEntity;

  @Column({ type: 'int', nullable: true })
  paymentConditionId: number;

  @ManyToOne(() => AddressEntity)
  @JoinColumn({ name: 'invoicingAddressId' })
  invoicingAddress: AddressEntity;

  @Column({ type: 'int', nullable: true })
  invoicingAddressId: number;

  @ManyToOne(() => AddressEntity)
  @JoinColumn({ name: 'deliveryAddressId' })
  deliveryAddress: AddressEntity;

  @Column({ type: 'int', nullable: true })
  deliveryAddressId: number;
}
