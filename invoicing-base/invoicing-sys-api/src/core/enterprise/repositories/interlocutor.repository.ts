import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterTypeOrm } from '@nestjs-cls/transactional-adapter-typeorm';
import { DatabaseAbstractRepository } from 'src/shared/database/repositories/database.repository';
import { InterlocutorEntity } from '../entities/interlocutor.entity';

@Injectable()
export class InterlocutorRepository extends DatabaseAbstractRepository<InterlocutorEntity> {
  constructor(
    @InjectRepository(InterlocutorEntity)
    private readonly interlocutorRepository: Repository<InterlocutorEntity>,
    txHost: TransactionHost<TransactionalAdapterTypeOrm>,
  ) {
    super(interlocutorRepository, txHost);
  }
}
