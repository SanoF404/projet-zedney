import { Injectable } from '@nestjs/common';
import { AbstractCrudService } from 'src/shared/database/services/abstract-crud.service';
import { TemplateTypeEntity } from '../entities/template-type.entity';
import { TemplateTypeRepository } from '../repositories/template-type.repository';

@Injectable()
export class TemplateTypeService extends AbstractCrudService<TemplateTypeEntity> {
  constructor(private readonly templateTypeRepository: TemplateTypeRepository) {
    super(templateTypeRepository);
  }
}
