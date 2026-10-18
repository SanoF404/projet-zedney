import { Injectable } from '@nestjs/common';
import { AbstractCrudService } from 'src/shared/database/services/abstract-crud.service';
import { InterlocutorEntity } from '../entities/interlocutor.entity';
import { InterlocutorRepository } from '../repositories/interlocutor.repository';

@Injectable()
export class InterlocutorService extends AbstractCrudService<InterlocutorEntity> {
  constructor(private readonly interlocutorRepository: InterlocutorRepository) {
    super(interlocutorRepository);
  }

  async findByEnterpriseId(
    enterpriseId: number,
  ): Promise<InterlocutorEntity[]> {
    return this.interlocutorRepository.findAll({
      where: {
        enterpriseInterlocutors: {
          enterpriseId,
        },
      },
      relations: ['enterpriseInterlocutors'],
    });
  }
}
