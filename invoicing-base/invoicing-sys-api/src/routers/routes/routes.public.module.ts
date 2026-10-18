import { Module } from '@nestjs/common';
import { AppConfigModule } from 'src/shared/app-config/app-config.module';
import { AppConfigController } from 'src/shared/app-config/controllers/app-config.controller';
import { LoggerModule } from 'src/shared/logger/logger.module';
import { ArticleModule } from 'src/modules/article/article.module';
import { ArticleController } from 'src/modules/article/controllers/article.controller';
import { CabinetModule } from 'src/modules/cabinet/cabinet.module';
import { CabinetController } from 'src/modules/cabinet/controllers/cabinet.controller';
import { DefaultConditionController } from 'src/modules/default-condition/controllers/default-condition.controller';
import { DefaultConditionModule } from 'src/modules/default-condition/default-condition.module';
import { InvoiceController } from 'src/modules/invoice/controllers/invoice.controller';
import { InvoiceModule } from 'src/modules/invoice/invoice.module';
import { PaymentController } from 'src/modules/payment/controllers/payment.controller';
import { PaymentModule } from 'src/modules/payment/payment.module';
import { QuotationController } from 'src/modules/quotation/controllers/quotation.controller';
import { QuotationModule } from 'src/modules/quotation/quotation.module';
import { TaxController } from 'src/modules/tax/controllers/tax.controller';
import { TaxModule } from 'src/modules/tax/tax.module';
import { SequenceController } from 'src/modules/sequence/controllers/sequence.controller';
import { SequenceModule } from 'src/modules/sequence/sequence.module';

@Module({
  controllers: [
    ArticleController,
    AppConfigController,
    CabinetController,
    DefaultConditionController,
    InvoiceController,
    PaymentController,
    QuotationController,
    SequenceController,
    TaxController,
  ],
  providers: [],
  exports: [],
  imports: [
    LoggerModule,
    ArticleModule,
    AppConfigModule,
    CabinetModule,
    DefaultConditionModule,
    InvoiceModule,
    PaymentModule,
    QuotationModule,
    SequenceModule,
    TaxModule,
  ],
})
export class RoutesPublicModule {}
