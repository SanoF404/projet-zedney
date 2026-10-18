import { Module } from '@nestjs/common';
import { UserManagementModule } from 'src/modules/user-management/user-management.module';
import { PermissionsSeederCommand } from './permissions.seeder';
import { RolesSeederCommand } from './roles.seeder';
import { AdminSeederCommand } from './admin.seeder';
import { CurrencyModule } from 'src/modules/currency/currency.module';
import { ActivityModule } from 'src/modules/activity/activity.module';
import { PaymentConditionModule } from 'src/modules/payment-condition/payment-condition.module';
import { CountryModule } from 'src/modules/country/country.module';
import { CabinetModule } from 'src/modules/cabinet/cabinet.module';
import { AddressModule } from 'src/modules/address/address.module';
import { SequencesSeederCommand } from './sequences.seeder';
import { SequenceModule } from 'src/modules/sequence/sequence.module';
import { RefCurrenciesSeedCommand } from './currencies.seeder';
import { ReferenceTypesModule } from 'src/shared/reference-types/reference-types.module';
import { RefActivitiesSeedCommand } from './activities.seeder';
import { RefCountriesSeedCommand } from './countries.seeder';
import { RefTaxWithholdingSeedCommand } from './tax-withholding.seeder';
import { RefPaymentConditionsSeedCommand } from './payment-conditions.seeder';
import { ConfigurationSeedCommand } from './configuration.seeder';
import { ConfigurationsModule } from 'src/shared/configurations/configurations.module';
import { TemplateTypesSeederCommand } from './template-types.seeder';
import { TemplateModule } from 'src/shared/pdfme-templates/template.module';
import { CabinetSeederCommand } from './cabinet.seeder';
import { DemoUsersSeederCommand } from './demo-users.seeder';
import { DemoBusinessesSeederCommand } from './demo-businesses.seeder';
import { FirmModule } from 'src/modules/firm/firm.module';
import { InterlocutorModule } from 'src/modules/interlocutor/Interlocutor.module';
import { FirmInterlocutorEntryModule } from 'src/modules/firm-interlocutor-entry/firm-interlocutor-entry.module';
import { EnterpriseModule } from 'src/core/enterprise/enterprise.module';
import { DemoQuotationsSeederCommand } from './demo-quotations.seeder';
import { DefaultConditionsSeederCommand } from './default-conditions.seeder';
import { TaxRatesSeederCommand } from './tax-rates.seeder';
import { InvoicingModule } from 'src/core/invoicing/invoicing.module';
import { BankAccountModule } from 'src/core/bank-account/bank-account.module';
import { DefaultConditionModule } from 'src/modules/default-condition/default-condition.module';
import { TaxModule } from 'src/core/tax/tax.module';

@Module({
  providers: [
    PermissionsSeederCommand,
    RolesSeederCommand,
    AdminSeederCommand,
    CabinetSeederCommand,
    DemoUsersSeederCommand,
    DemoBusinessesSeederCommand,
    DemoQuotationsSeederCommand,
    DefaultConditionsSeederCommand,
    TaxRatesSeederCommand,
    SequencesSeederCommand,
    RefCurrenciesSeedCommand,
    RefActivitiesSeedCommand,
    RefCountriesSeedCommand,
    RefPaymentConditionsSeedCommand,
    RefTaxWithholdingSeedCommand,
    ConfigurationSeedCommand,
    TemplateTypesSeederCommand,
  ],
  imports: [
    ReferenceTypesModule,
    UserManagementModule,
    CurrencyModule,
    ActivityModule,
    PaymentConditionModule,
    CountryModule,
    CabinetModule,
    AddressModule,
    SequenceModule,
    ConfigurationsModule,
    TemplateModule,
    FirmModule,
    InterlocutorModule,
    FirmInterlocutorEntryModule,
    EnterpriseModule,
    InvoicingModule,
    BankAccountModule,
    DefaultConditionModule,
    TaxModule,
  ],
})
export class SeedersModule {}
