import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleFamilyEntity } from '../entities/article-family.entity';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterTypeOrm } from '@nestjs-cls/transactional-adapter-typeorm';
import { DatabaseAbstractRepository } from 'src/shared/database/repositories/database.repository';

@Injectable()
export class ArticleFamilyRepository extends DatabaseAbstractRepository<ArticleFamilyEntity> {
  constructor(
    @InjectRepository(ArticleFamilyEntity)
    private readonly articleFamilyRepository: Repository<ArticleFamilyEntity>,
    txHost: TransactionHost<TransactionalAdapterTypeOrm>,
  ) {
    super(articleFamilyRepository, txHost);
  }
}
