import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { TaxRateRepository } from 'src/core/tax/repositories/tax-rate.repository';
import { RefParamRepository } from 'src/shared/reference-types/repositories/ref-param.repository';

const defaultTaxRates = [
  { label: 'TVA standard', value: 20, type: 'rate' as const, special: false },
  { label: 'TVA réduite', value: 10, type: 'rate' as const, special: false },
  { label: 'TVA super réduite', value: 5.5, type: 'rate' as const, special: false },
  { label: 'FODEC', value: 1, type: 'rate' as const, special: true },
];

@Injectable()
export class TaxRatesSeederCommand {
  constructor(
    private readonly taxRateRepository: TaxRateRepository,
    private readonly refParamRepository: RefParamRepository,
  ) {}

  @Command({
    command: 'seed:tax-rates',
    describe: 'Seed example tax rates for the tax settings page',
  })
  async seed() {
    const currency = await this.refParamRepository.findOne({
      where: { refTypeId: 'currency', label: 'Euro' },
    });

    for (const rate of defaultTaxRates) {
      const existing = await this.taxRateRepository.findOne({
        where: { label: rate.label },
      });
      if (!existing) {
        await this.taxRateRepository.save({
          ...rate,
          currency: currency ?? undefined,
          currencyId: currency?.id,
        });
      }
    }

    console.log('✅ Example tax rates are populated.');
  }
}
