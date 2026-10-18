import { Injectable } from '@nestjs/common';
import { ArticleRepository } from '../repositories/article.repository';
import { AbstractCrudService } from 'src/shared/database/services/abstract-crud.service';
import { ArticleEntity } from '../entities/article.entity';

@Injectable()
export class ArticleService extends AbstractCrudService<ArticleEntity> {
  constructor(private readonly articleRepository: ArticleRepository) {
    super(articleRepository);
  }
}
