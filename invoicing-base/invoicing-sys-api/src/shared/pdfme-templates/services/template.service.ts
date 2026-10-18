import { Injectable } from '@nestjs/common';
import { TemplateRepository } from '../repositories/template.repository';
import { TemplateEntity } from '../entities/template.entity';
import { AbstractCrudService } from 'src/shared/database/services/abstract-crud.service';
import { DeepPartial } from 'typeorm';
import { StorageService } from 'src/shared/storage/services/storage.service';

@Injectable()
export class TemplateService extends AbstractCrudService<TemplateEntity> {
  constructor(
    private readonly templateRepository: TemplateRepository,
    private readonly storageService: StorageService,
  ) {
    super(templateRepository);
  }

  async save(data: DeepPartial<TemplateEntity>): Promise<TemplateEntity> {
    const template = await this.templateRepository.save(data);
    await this.storageService.confirm(template.documentId);
    return template;
  }

  async update(
    id: string,
    data: DeepPartial<TemplateEntity>,
  ): Promise<TemplateEntity> {
    const template = await this.templateRepository.findOneById(id);
    if (!template) {
      throw new Error('Template not found');
    }
    if (data.documentId && data.documentId !== template.documentId) {
      await this.storageService.confirm(data.documentId);
      await this.storageService.delete(template.documentId);
    }
    return this.templateRepository.update(id, data);
  }

  async softDelete(id: string): Promise<TemplateEntity> {
    const template = await this.templateRepository.findOneById(id);
    console.log('Template to delete:', template);
    if (!template) {
      throw new Error('Template not found');
    }
    await this.storageService.delete(template.documentId);
    return this.templateRepository.softDelete(id);
  }

  async findOneByName(name?: string): Promise<TemplateEntity | null> {
    return this.templateRepository.findOne({
      where: { name },
    });
  }
}
