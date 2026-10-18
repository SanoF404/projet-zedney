import { Module } from '@nestjs/common';
import { EnterpriseController } from 'src/core/enterprise/controllers/enterprise.controller';
import { InterlocutorController } from 'src/core/enterprise/controllers/interlocutor.controller';
import { EnterpriseModule } from 'src/core/enterprise/enterprise.module';
import { ArticleController } from 'src/core/inventory/controllers/article.controller';
import { ArticleFamilyController } from 'src/core/inventory/controllers/article-family.controller';
import { InventoryModule } from 'src/core/inventory/inventory.module';
import { PseudoQuotationController } from 'src/core/invoicing/controllers/quotation.controller';
import { InvoicingModule } from 'src/core/invoicing/invoicing.module';
import { AuthModule } from 'src/shared/auth/auth.module';
import { AuthController } from 'src/shared/auth/controllers/auth.controller';
import { LoggerModule } from 'src/shared/logger/logger.module';
import { RefParamController } from 'src/shared/reference-types/controllers/ref-param.controller';
import { RefTypeController } from 'src/shared/reference-types/controllers/ref-type.controller';
import { ReferenceTypesModule } from 'src/shared/reference-types/reference-types.module';
import { BankAccountController } from 'src/core/bank-account/controllers/bank-account.controller';
import { BankAccountModule } from 'src/core/bank-account/bank-account.module';
import { TaxRateController } from 'src/core/tax/controllers/tax.controller';
import { TaxModule } from 'src/core/tax/tax.module';
import { QuotationWorkflowController } from 'src/core/invoicing/controllers/quotation-workflow.controller';
import { TemplateController } from 'src/shared/pdfme-templates/controllers/template.controller';
import { StorageController } from 'src/shared/storage/controllers/storage.controller';
import { StorageModule } from 'src/shared/storage/storage.module';
import { TemplateTypeController } from 'src/shared/pdfme-templates/controllers/template-type.controller';
import { TemplateModule } from 'src/shared/pdfme-templates/template.module';

@Module({
  controllers: [
    AuthController,
    EnterpriseController,
    InterlocutorController,
    ArticleController,
    ArticleFamilyController,
    BankAccountController,
    PseudoQuotationController,
    QuotationWorkflowController,
    TaxRateController,
    RefTypeController,
    RefParamController,
    TemplateController,
    TemplateTypeController,
    StorageController,
  ],
  imports: [
    AuthModule,
    LoggerModule,
    EnterpriseModule,
    InventoryModule,
    BankAccountModule,
    InvoicingModule,
    TaxModule,
    ReferenceTypesModule,
    TemplateModule,
    StorageModule,
  ],
})
export class RoutesModule {}
