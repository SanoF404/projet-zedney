import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { BankAccountService } from 'src/core/bank-account/services/bank-account.service';
import { EnterpriseService } from 'src/core/enterprise/services/enterprise.service';
import { InterlocutorService } from 'src/core/enterprise/services/interlocutor.service';
import { QuotationService } from 'src/core/invoicing/services/quotation.service';
import { RefParamService } from 'src/shared/reference-types/services/ref-param.service';

@Injectable()
export class DemoQuotationsSeederCommand {
  constructor(
    private readonly enterpriseService: EnterpriseService,
    private readonly interlocutorService: InterlocutorService,
    private readonly quotationService: QuotationService,
    private readonly bankAccountService: BankAccountService,
    private readonly refParamService: RefParamService,
  ) {}

  @Command({
    command: 'seed:demo-quotations',
    describe: 'Seed fictional sales and supplier quotations',
  })
  async seed() {
    const parameters = await this.refParamService.findAll({});
    const euro = parameters.find(
      (parameter) =>
        parameter.refTypeId === 'currency' &&
        (parameter.extras as { code?: string })?.code === 'EUR',
    );
    if (!euro) throw new Error('Seed currencies before demo quotations');

    let accounts = await this.bankAccountService.findAll({});
    if (!accounts.length) {
      accounts = [
        await this.bankAccountService.save({
          name: 'Compte fictif de démonstration',
          currencyId: euro.id,
          isMain: true,
        }),
      ];
    }

    const enterprises = await this.enterpriseService.findAll({});
    if (!enterprises.length) {
      throw new Error('Seed demo businesses before demo quotations');
    }

    const existingQuotations = await this.quotationService.findAll({});
    const demoQuotes = [
      { direction: 'outgoing' as const, enterpriseIndex: 0, object: 'DEMO Vente - Identité visuelle Atelier Nova' },
      { direction: 'outgoing' as const, enterpriseIndex: 1, object: 'DEMO Vente - Licence logicielle Blue Oak' },
      { direction: 'outgoing' as const, enterpriseIndex: 2, object: 'DEMO Vente - Mobilier Maison Céleste' },
      { direction: 'outgoing' as const, enterpriseIndex: 3, object: 'DEMO Vente - Prestation logistique Green Bridge' },
      { direction: 'incoming' as const, enterpriseIndex: 4, object: 'DEMO Achat - Conseil Horizon' },
      { direction: 'incoming' as const, enterpriseIndex: 5, object: 'DEMO Achat - Produits Les Jardins du Canal' },
      { direction: 'incoming' as const, enterpriseIndex: 6, object: 'DEMO Achat - Impression Pixel & Papier' },
      { direction: 'incoming' as const, enterpriseIndex: 7, object: 'DEMO Achat - Travaux Atout Bâtiment' },
    ];

    let created = 0;
    for (const [index, demo] of demoQuotes.entries()) {
      if (existingQuotations.some((quotation) => quotation.object === demo.object)) continue;

      const enterprise = enterprises[demo.enterpriseIndex % enterprises.length];
      const interlocutors = await this.interlocutorService.findByEnterpriseId(enterprise.id);
      if (!interlocutors.length) {
        throw new Error(`No contact linked to demo enterprise ${enterprise.name}`);
      }

      const date = new Date();
      date.setDate(1);
      date.setMonth(date.getMonth() - (index % 4));
      const dueDate = new Date(date);
      dueDate.setDate(dueDate.getDate() + 30);

      await this.quotationService.extendedSave({
        direction: demo.direction,
        date,
        dueDate,
        object: demo.object,
        generalConditions: 'Conditions fictives de démonstration.',
        enterpriseId: enterprise.id,
        interlocutorId: interlocutors[0].id,
        currencyId: euro.id,
        bankAccountId: accounts[0].id,
        notes: 'Document fictif créé pour remplir la démonstration du site.',
        quotationArticles: [],
        uploads: [],
      });
      created += 1;
    }

    console.log(`Demo sales and purchase quotations ready (${created} created this run).`);
  }
}
