import { Injectable } from '@nestjs/common';
import { DatabaseAbstractRepository } from 'src/shared/database/repositories/database.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionalAdapterTypeOrm } from '@nestjs-cls/transactional-adapter-typeorm';
import { TransactionHost } from '@nestjs-cls/transactional';
import { QuotationArticleEntity } from '../entities/quotation-article.entity';

@Injectable()
export class QuotationArticleRepository extends DatabaseAbstractRepository<QuotationArticleEntity> {
  constructor(
    @InjectRepository(QuotationArticleEntity)
    private readonly quotationArticleRepository: Repository<QuotationArticleEntity>,
    txHost: TransactionHost<TransactionalAdapterTypeOrm>,
  ) {
    super(quotationArticleRepository, txHost);
  }
}
