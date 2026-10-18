import { EnterpriseEntity } from 'src/core/enterprise/entities/enterprise.entity';
import { InterlocutorEntity } from 'src/core/enterprise/entities/interlocutor.entity';
import { EntityHelper } from 'src/shared/database/interfaces/database.entity.interface';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuotationStatus } from '../enums/quotation-status.enum';
import { QuotationArticleEntity } from './quotation-article.entity';
import { RefParamEntity } from 'src/shared/reference-types/entities/ref-param.entity';
import { BankAccountEntity } from 'src/core/bank-account/entities/bank-account.entity';
import { QuotationUploadEntity } from './quotation-upload.entity';

@Entity('_quotation')
export class QuotationEntity extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ['incoming', 'outgoing'] })
  direction: 'incoming' | 'outgoing';

  @Column({
    type: 'enum',
    enum: QuotationStatus,
    default: QuotationStatus.Draft,
  })
  status: QuotationStatus;

  // @Column({ type: 'varchar', unique: true })
  // sequence: string;

  @Column({ nullable: true })
  date: Date;

  @Column({ nullable: true })
  dueDate: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  object: string;

  @Column({ type: 'text', nullable: true })
  generalConditions: string;

  @ManyToOne(() => EnterpriseEntity, (enterprise) => enterprise.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'enterpriseId' })
  enterprise: EnterpriseEntity;

  @Column()
  enterpriseId: number;

  @ManyToOne(() => InterlocutorEntity, (interlocutor) => interlocutor.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'interlocutorId' })
  interlocutor: InterlocutorEntity;

  @Column()
  interlocutorId: number;

  @ManyToOne(() => RefParamEntity)
  @JoinColumn({ name: 'currencyId' })
  currency: RefParamEntity;

  @Column({ type: 'int', nullable: true })
  currencyId: number;

  @ManyToOne(() => BankAccountEntity, (bankAccount) => bankAccount.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'bankAccountId' })
  bankAccount: BankAccountEntity;

  @Column()
  bankAccountId: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @OneToMany(
    () => QuotationArticleEntity,
    (quotationArticle) => quotationArticle.quotation,
  )
  quotationArticles: QuotationArticleEntity[];

  @OneToMany(() => QuotationUploadEntity, (upload) => upload.quotation)
  uploads: QuotationUploadEntity[];
}
