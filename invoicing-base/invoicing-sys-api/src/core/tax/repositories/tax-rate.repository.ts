import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterTypeOrm } from '@nestjs-cls/transactional-adapter-typeorm';
import { DatabaseAbstractRepository } from 'src/shared/database/repositories/database.repository';
import { TaxRateEntity } from '../entities/tax-rate.entity';

@Injectable()
export class TaxRateRepository extends DatabaseAbstractRepository<TaxRateEntity> {
  constructor(
    @InjectRepository(TaxRateEntity)
    private readonly taxRateRepository: Repository<TaxRateEntity>,
    txHost: TransactionHost<TransactionalAdapterTypeOrm>,
  ) {
    super(taxRateRepository, txHost);
  }
}
