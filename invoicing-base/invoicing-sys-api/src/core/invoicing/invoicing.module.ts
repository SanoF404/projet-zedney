import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuotationEntity } from './entities/quotation.entity';
import { QuotationRepository } from './repositories/quotation.repository';
import { QuotationService } from './services/quotation.service';
import { QuotationArticleRepository } from './repositories/quotation-article.repository';
import { QuotationArticleService } from './services/quotation-article.service';
import { QuotationWorkflowService } from './services/quotation-workflow.service';
import { QuotationArticleEntity } from './entities/quotation-article.entity';
import { InventoryModule } from '../inventory/inventory.module';
import { TaxModule } from '../tax/tax.module';
import { StorageModule } from 'src/shared/storage/storage.module';
import { QuotationUploadEntity } from './entities/quotation-upload.entity';
import { QuotationUploadService } from './services/quotation-upload.service';
import { QuotationUploadRepository } from './repositories/quotation-upload.repository';

@Module({
  exports: [
    QuotationRepository,
    QuotationArticleRepository,
    QuotationService,
    QuotationArticleService,
    QuotationWorkflowService,
    QuotationUploadService,
  ],
  providers: [
    QuotationRepository,
    QuotationArticleRepository,
    QuotationUploadRepository,
    QuotationService,
    QuotationArticleService,
    QuotationWorkflowService,
    QuotationUploadService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      QuotationEntity,
      QuotationArticleEntity,
      QuotationUploadEntity,
    ]),
    InventoryModule,
    TaxModule,
    StorageModule,
  ],
})
export class InvoicingModule {}
