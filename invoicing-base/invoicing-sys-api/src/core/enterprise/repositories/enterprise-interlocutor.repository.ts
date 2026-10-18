import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterTypeOrm } from '@nestjs-cls/transactional-adapter-typeorm';
import { DatabaseAbstractRepository } from 'src/shared/database/repositories/database.repository';
import { EnterpriseInterlocutorEntity } from '../entities/enterprise-interlocutor.entity';

@Injectable()
export class EnterpriseInterlocutorRepository extends DatabaseAbstractRepository<EnterpriseInterlocutorEntity> {
  constructor(
    @InjectRepository(EnterpriseInterlocutorEntity)
    private readonly enterpriseInterlocutorRepository: Repository<EnterpriseInterlocutorEntity>,
    txHost: TransactionHost<TransactionalAdapterTypeOrm>,
  ) {
    super(enterpriseInterlocutorRepository, txHost);
  }
}
