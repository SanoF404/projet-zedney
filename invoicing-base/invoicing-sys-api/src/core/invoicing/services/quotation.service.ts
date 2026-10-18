import { Injectable } from '@nestjs/common';
import { AbstractCrudService } from 'src/shared/database/services/abstract-crud.service';
import { QuotationEntity } from '../entities/quotation.entity';
import { QuotationRepository } from '../repositories/quotation.repository';
import { DeepPartial } from 'typeorm';
import { QuotationArticleEntity } from '../entities/quotation-article.entity';
import { QuotationArticleService } from './quotation-article.service';
import { Transactional } from '@nestjs-cls/transactional';
import { QuotationUploadEntity } from '../entities/quotation-upload.entity';
import { QuotationUploadService } from './quotation-upload.service';

@Injectable()
export class QuotationService extends AbstractCrudService<QuotationEntity> {
  constructor(
    private readonly quotationArticleService: QuotationArticleService,
    private readonly quotationUploadService: QuotationUploadService,
    quotationRepository: QuotationRepository,
  ) {
    super(quotationRepository);
  }

  @Transactional()
  async extendedSave(
    quotation: DeepPartial<QuotationEntity>,
  ): Promise<QuotationEntity> {
    const { quotationArticles, uploads, ...quotationData } = quotation;

    const created = await this.repository.save(quotationData);
    if (!created) {
      throw new Error('Failed to create quotation');
    }

    if (uploads && uploads.length > 0) {
      await Promise.all(
        uploads.map((upload: DeepPartial<QuotationUploadEntity>) =>
          this.quotationUploadService.extendedSave({
            ...upload,
            quotationId: created.id,
          }),
        ),
      );
    }

    if (quotationArticles && quotationArticles.length > 0) {
      await this.quotationArticleService.extendedSaveMany(
        quotationArticles.map(
          (article: DeepPartial<QuotationArticleEntity>) => ({
            ...article,
            quotationId: created.id,
          }),
        ),
      );
    }

    return created;
  }

  @Transactional()
  async extendedUpdate(id: number, quotation: DeepPartial<QuotationEntity>) {
    // const existing = await this.repository.findOneById(id);
    // if (!this.quotationWorkflowService.isUpdatable(existing.status)) {
    //   throw new BadRequestException(
    //     `Quotation with status '${existing.status}' cannot be updated`,
    //   );
    // }

    const { quotationArticles, uploads, ...quotationData } = quotation;

    const updated = await this.repository.update(id, quotationData);
    if (!updated) {
      throw new Error('Failed to update quotation');
    }

    //articles

    const existingArticles =
      (await this.quotationArticleService.repository.findAll({
        where: { quotationId: id },
        relations: ['article', 'taxes'],
      })) as QuotationArticleEntity[];

    const receivedArticles = quotationArticles.map(
      (article) => ({ ...article, quotationId: id }) as QuotationArticleEntity,
    );

    await this.repository.updateJunctionAssociations<QuotationArticleEntity>({
      existingItems: existingArticles,
      updatedItems: receivedArticles,
      keys: ['quotationId', 'articleId'],
      onCreate: async (item: DeepPartial<QuotationArticleEntity>) => {
        return this.quotationArticleService.extendedSave({
          ...item,
          quotationId: id,
        });
      },
      onUpdate: async (id, item: DeepPartial<QuotationArticleEntity>) => {
        return this.quotationArticleService.extendedUpdate(id as number, item);
      },
      onDelete: async (id) => {
        return this.quotationArticleService.softDelete(id);
      },
    });

    //uploads

    const existingUploads =
      (await this.quotationUploadService.repository.findAll({
        where: { quotationId: id },
      })) as QuotationUploadEntity[];

    const receivedUploads = uploads.map(
      (upload) => ({ ...upload, quotationId: id }) as QuotationUploadEntity,
    );

    await this.repository.updateJunctionAssociations<QuotationUploadEntity>({
      existingItems: existingUploads,
      updatedItems: receivedUploads,
      keys: ['quotationId', 'uploadId'],
      onCreate: async (item: DeepPartial<QuotationUploadEntity>) => {
        return this.quotationUploadService.extendedSave({
          ...item,
          quotationId: id,
        });
      },
      onUpdate: async (id, item: DeepPartial<QuotationUploadEntity>) => {
        return this.quotationUploadService.extendedUpdate(id as number, item);
      },
      onDelete: async (id) => {
        return this.quotationUploadService.softDelete(id);
      },
    });

    return updated;
  }
}
