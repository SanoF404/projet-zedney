import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { RefTypeRepository } from 'src/shared/reference-types/repositories/ref-type.repository';
import { RefParamRepository } from 'src/shared/reference-types/repositories/ref-param.repository';
import { paymentConditionsSeed } from './data/payment-conditions.data';

@Injectable()
export class RefPaymentConditionsSeedCommand {
  constructor(
    private readonly refTypeRepository: RefTypeRepository,
    private readonly refParamRepository: RefParamRepository,
  ) {}

  @Command({
    command: 'seed:payment-conditions',
    describe: 'Seed system payment conditions',
  })
  async seed() {
    const start = new Date();
    console.log('🚀 Starting seeding of payment conditions...');
    //=============================================================================================
    let paymentConditionsRefType = await this.refTypeRepository.findOne({
      where: { label: 'Payment Conditions' },
    });

    if (!paymentConditionsRefType) {
      paymentConditionsRefType = await this.refTypeRepository.save({
        id: 'payment-conditions',
        label: 'Payment Conditions',
        description: 'Parent reference type for all payment conditions',
      });
      for (const paymentCondition of paymentConditionsSeed) {
        await this.refParamRepository.save({
          label: paymentCondition,
          description: `Description for ${paymentCondition}`,
          refType: paymentConditionsRefType,
          extras: {},
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
