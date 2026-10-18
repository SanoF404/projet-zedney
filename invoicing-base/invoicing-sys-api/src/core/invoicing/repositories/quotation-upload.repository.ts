import { Injectable } from '@nestjs/common';
import { DatabaseAbstractRepository } from 'src/shared/database/repositories/database.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionalAdapterTypeOrm } from '@nestjs-cls/transactional-adapter-typeorm';
import { TransactionHost } from '@nestjs-cls/transactional';
import { QuotationUploadEntity } from '../entities/quotation-upload.entity';

@Injectable()
export class QuotationUploadRepository extends DatabaseAbstractRepository<QuotationUploadEntity> {
  constructor(
    @InjectRepository(QuotationUploadEntity)
    private readonly quotationUploadRepository: Repository<QuotationUploadEntity>,
    txHost: TransactionHost<TransactionalAdapterTypeOrm>,
  ) {
    super(quotationUploadRepository, txHost);
  }
}
