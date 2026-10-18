import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { RefTypeRepository } from 'src/shared/reference-types/repositories/ref-type.repository';
import { RefParamRepository } from 'src/shared/reference-types/repositories/ref-param.repository';
import { taxWithholdingData } from './data/tax-withholding.data';

@Injectable()
export class RefTaxWithholdingSeedCommand {
  constructor(
    private readonly refTypeRepository: RefTypeRepository,
    private readonly refParamRepository: RefParamRepository,
  ) {}

  @Command({
    command: 'seed:tax-withholding',
    describe: 'Seed system tax withholding',
  })
  async seed() {
    const start = new Date();
    console.log('🚀 Starting seeding of tax withholding...');
    //=============================================================================================
    let taxWithholdingRefType = await this.refTypeRepository.findOne({
      where: { label: 'Tax Withholding' },
    });

    if (!taxWithholdingRefType) {
      taxWithholdingRefType = await this.refTypeRepository.save({
        id: 'tax-withholding',
        label: 'Tax Withholding',
        description: 'Parent reference type for all tax withholding',
      });
      for (const taxWithholding of taxWithholdingData) {
        await this.refParamRepository.save({
          label: taxWithholding.label,
          description: `Description for ${taxWithholding.label}`,
          refType: taxWithholdingRefType,
          extras: {
            rate: taxWithholding.rate,
          },
        });
      }
    }

    //=============================================================================================
    const end = new Date();
    console.log(
      `✅ Seeding completed in ${end.getTime() - start.getTime()}ms ⏱️`,
    );
  }
}
