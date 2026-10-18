import { Injectable } from '@nestjs/common';
import { ArticleFamilyRepository } from '../repositories/article-family.repository';
import { AbstractCrudService } from 'src/shared/database/services/abstract-crud.service';
import { ArticleFamilyEntity } from '../entities/article-family.entity';

@Injectable()
export class ArticleFamilyService extends AbstractCrudService<ArticleFamilyEntity> {
  constructor(
    private readonly articleFamilyRepository: ArticleFamilyRepository,
  ) {
    super(articleFamilyRepository);
  }
}
