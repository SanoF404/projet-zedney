import { EntityHelper } from 'src/shared/database/interfaces/database.entity.interface';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuotationEntity } from './quotation.entity';
import { ArticleEntity } from 'src/core/inventory/entities/article.entity';
import { TaxRateEntity } from 'src/core/tax/entities/tax-rate.entity';

@Entity('quotation-articles')
export class QuotationArticleEntity extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => QuotationEntity, (quotation) => quotation.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'quotationId' })
  quotation: QuotationEntity;

  @Column()
  quotationId: number;

  @ManyToOne(() => ArticleEntity, (article) => article.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'articleId' })
  article: ArticleEntity;

  @Column()
  articleId: number;

  @Column()
  order: number;

  @Column({ type: 'int', nullable: true })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  unitPrice: number;

  @Column({ type: 'enum', enum: ['rate', 'fixed'], default: 'rate' })
  discountType: 'rate' | 'fixed';

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  discountValue: number;

  @ManyToMany(() => TaxRateEntity, (tax) => tax.id, {
    nullable: true,
  })
  @JoinTable({
    name: 'quotation_article_taxes',
    joinColumn: { name: 'quotationArticleId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'taxRateId', referencedColumnName: 'id' },
  })
  taxes: TaxRateEntity[];
}
