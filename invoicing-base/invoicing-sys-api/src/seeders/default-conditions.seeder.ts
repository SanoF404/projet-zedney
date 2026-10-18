import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { ACTIVITY_TYPE } from 'src/app/enums/activity-types.enum';
import { DOCUMENT_TYPE } from 'src/app/enums/document-types.enum';
import { DefaultConditionRepository } from 'src/modules/default-condition/repositories/default-condition.repository';

const defaultConditions = [
  {
    activity_type: ACTIVITY_TYPE.SELLING,
    document_type: DOCUMENT_TYPE.QUOTATION,
    value: 'Ce devis est valable 30 jours à compter de sa date d’émission.',
  },
  {
    activity_type: ACTIVITY_TYPE.SELLING,
    document_type: DOCUMENT_TYPE.INVOICE,
    value: 'Paiement à réception de la facture. Tout retard peut entraîner des pénalités.',
  },
  {
    activity_type: ACTIVITY_TYPE.BUYING,
    document_type: DOCUMENT_TYPE.QUOTATION,
    value: 'Demander un devis écrit et confirmer les conditions avant toute commande.',
  },
  {
    activity_type: ACTIVITY_TYPE.BUYING,
    document_type: DOCUMENT_TYPE.INVOICE,
    value: 'Vérifier la facture et les pièces justificatives avant validation du paiement.',
  },
];

@Injectable()
export class DefaultConditionsSeederCommand {
  constructor(
    private readonly defaultConditionRepository: DefaultConditionRepository,
  ) {}

  @Command({
    command: 'seed:default-conditions',
    describe: 'Fill missing default conditions for sales and purchases',
  })
  async seed() {
    for (const condition of defaultConditions) {
      const existing = await this.defaultConditionRepository.findOne({
        where: {
          activity_type: condition.activity_type,
          document_type: condition.document_type,
        },
      });

      if (!existing) {
        await this.defaultConditionRepository.save(condition);
      } else if (!existing.value?.trim()) {
        await this.defaultConditionRepository.save({ ...existing, value: condition.value });
      }
    }

    console.log('✅ Default conditions are populated.');
  }
}
