import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterTypeOrm } from '@nestjs-cls/transactional-adapter-typeorm';
import { DatabaseAbstractRepository } from 'src/shared/database/repositories/database.repository';
import { TemplateTypeEntity } from '../entities/template-type.entity';

@Injectable()
export class TemplateTypeRepository extends DatabaseAbstractRepository<TemplateTypeEntity> {
  constructor(
    @InjectRepository(TemplateTypeEntity)
    private readonly repository: import('typeorm').Repository<TemplateTypeEntity>,
    txHost: TransactionHost<TransactionalAdapterTypeOrm>,
  ) {
    super(repository, txHost);
  }
}
