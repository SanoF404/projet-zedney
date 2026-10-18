import { Injectable } from '@nestjs/common';
import { AbstractCrudService } from 'src/shared/database/services/abstract-crud.service';
import { DeepPartial } from 'typeorm';
import { Transactional } from '@nestjs-cls/transactional';
import { QuotationUploadRepository } from '../repositories/quotation-upload.repository';
import { QuotationUploadEntity } from '../entities/quotation-upload.entity';
import { StorageService } from 'src/shared/storage/services/storage.service';

@Injectable()
export class QuotationUploadService extends AbstractCrudService<QuotationUploadEntity> {
  constructor(
    private readonly storageService: StorageService,
    quotationUploadRepository: QuotationUploadRepository,
  ) {
    super(quotationUploadRepository);
  }

  @Transactional()
  async extendedSave(quotationUpload: DeepPartial<QuotationUploadEntity>) {
    await this.storageService.confirm(quotationUpload.uploadId);
    return this.repository.save({
      quotationId: quotationUpload.quotationId,
      uploadId: quotationUpload.uploadId,
      order: quotationUpload.order,
    });
  }

  @Transactional()
  async extendedSaveMany(
    quotationUploads: DeepPartial<QuotationUploadEntity>[],
  ) {
    return Promise.all(
      quotationUploads.map((quotationUpload) =>
        this.extendedSave(quotationUpload),
      ),
    );
  }

  @Transactional()
  async extendedUpdate(
    id: number,
    quotationUpload: DeepPartial<QuotationUploadEntity>,
  ) {
    return this.repository.update(id, quotationUpload);
  }

  @Transactional()
  async extendedUpdateMany(
    quotationUploads: {
      id: number;
      data: DeepPartial<QuotationUploadEntity>;
    }[],
  ) {
    return Promise.all(
      quotationUploads.map(({ id, data }) => this.extendedUpdate(id, data)),
    );
  }

  @Transactional()
  async extendedSoftDelete(id: number) {
    const existing = await this.repository.findOneById(id);
    if (existing) {
      await this.storageService.delete(existing.uploadId);
      return this.repository.softDelete(id);
    }
    return null;
  }
}
