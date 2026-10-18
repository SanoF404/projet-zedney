import { Injectable } from '@nestjs/common';
import { AbstractCrudService } from 'src/shared/database/services/abstract-crud.service';
import { QuotationArticleEntity } from '../entities/quotation-article.entity';
import { QuotationArticleRepository } from '../repositories/quotation-article.repository';
import { DeepPartial } from 'typeorm';
import { ArticleService } from 'src/core/inventory/services/article.service';
import { Transactional } from '@nestjs-cls/transactional';
import { TaxRateEntity } from 'src/core/tax/entities/tax-rate.entity';

type QuotationArticleInput = DeepPartial<QuotationArticleEntity> & {
  taxIds?: number[];
};

@Injectable()
export class QuotationArticleService extends AbstractCrudService<QuotationArticleEntity> {
  constructor(
    private readonly articleService: ArticleService,
    quotationArticleRepository: QuotationArticleRepository,
  ) {
    super(quotationArticleRepository);
  }

  @Transactional()
  async extendedSave(quotationArticle: QuotationArticleInput) {
    const { taxIds, ...rest } = quotationArticle;
    const created = await this.articleService.save(rest.article);
    if (!created) throw new Error('Failed to create article');

    const saveData: DeepPartial<QuotationArticleEntity> = {
      ...rest,
      articleId: created.id,
    };

    if (taxIds !== undefined) {
      saveData.taxes = taxIds.map((id) => ({ id }) as TaxRateEntity);
    }

    return this.repository.save(saveData);
  }

  @Transactional()
  async extendedSaveMany(quotationArticles: QuotationArticleInput[]) {
    return Promise.all(
      quotationArticles.map((quotationArticle) =>
        this.extendedSave(quotationArticle),
      ),
    );
  }

  @Transactional()
  async extendedUpdate(id: number, quotationArticle: QuotationArticleInput) {
    const { article, taxIds, ...rest } = quotationArticle;
    const updated = await this.articleService.update(article.id, article);

    const saveData: DeepPartial<QuotationArticleEntity> = {
      ...rest,
      id,
      articleId: updated.id,
    };

    if (taxIds !== undefined) {
      saveData.taxes = taxIds.map((taxId) => ({ id: taxId }) as TaxRateEntity);
    }

    return this.repository.save(saveData);
  }

  @Transactional()
  async extendedUpdateMany(
    quotationArticles: {
      id: number;
      data: QuotationArticleInput;
    }[],
  ) {
    return Promise.all(
      quotationArticles.map(({ id, data }) => this.extendedUpdate(id, data)),
    );
  }
}
