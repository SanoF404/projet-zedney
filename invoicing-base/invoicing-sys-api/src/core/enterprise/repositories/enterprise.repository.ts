import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EnterpriseEntity } from '../entities/enterprise.entity';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterTypeOrm } from '@nestjs-cls/transactional-adapter-typeorm';
import { DatabaseAbstractRepository } from 'src/shared/database/repositories/database.repository';

@Injectable()
export class EnterpriseRepository extends DatabaseAbstractRepository<EnterpriseEntity> {
  constructor(
    @InjectRepository(EnterpriseEntity)
    private readonly enterpriseRepository: Repository<EnterpriseEntity>,
    txHost: TransactionHost<TransactionalAdapterTypeOrm>,
  ) {
    super(enterpriseRepository, txHost);
  }
}
