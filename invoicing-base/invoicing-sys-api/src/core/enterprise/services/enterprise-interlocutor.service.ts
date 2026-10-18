import { Injectable } from '@nestjs/common';
import { AbstractCrudService } from 'src/shared/database/services/abstract-crud.service';
import { EnterpriseInterlocutorEntity } from '../entities/enterprise-interlocutor.entity';
import { EnterpriseInterlocutorRepository } from '../repositories/enterprise-interlocutor.repository';
import { CreateEnterpriseInterlocutorDto } from '../dtos/enterprise-interlocutor/create-enterprise-interlocutor.dto';
import { InterlocutorService } from './interlocutor.service';
import { Transactional } from '@nestjs-cls/transactional';

@Injectable()
export class EnterpriseInterlocutorService extends AbstractCrudService<EnterpriseInterlocutorEntity> {
  constructor(
    private readonly enterpriseInterlocutorRepository: EnterpriseInterlocutorRepository,
    private readonly interlocutorService: InterlocutorService,
  ) {
    super(enterpriseInterlocutorRepository);
  }

  @Transactional()
  async extendedSave(
    createEnterpriseInterlocutorDto: CreateEnterpriseInterlocutorDto,
  ): Promise<EnterpriseInterlocutorEntity> {
    const interlocutor = await this.interlocutorService.save(
      createEnterpriseInterlocutorDto.interlocutor,
    );

    if (!interlocutor) {
      throw new Error('Failed to create interlocutor');
    }

    return this.enterpriseInterlocutorRepository.save({
      ...createEnterpriseInterlocutorDto,
      interlocutor,
    });
  }

  @Transactional()
  async extendedSaveMany(
    createEnterpriseInterlocutorDtos: CreateEnterpriseInterlocutorDto[],
  ): Promise<EnterpriseInterlocutorEntity[]> {
    return Promise.all(
      createEnterpriseInterlocutorDtos.map((dto) => this.extendedSave(dto)),
    );
  }
}
