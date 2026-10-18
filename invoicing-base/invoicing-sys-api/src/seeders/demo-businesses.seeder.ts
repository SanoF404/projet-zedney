import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { SocialTitles } from 'src/app/enums/social-titles.enum';
import { ActivityService } from 'src/modules/activity/services/activity.service';
import { CabinetService } from 'src/modules/cabinet/services/cabinet.service';
import { CountryService } from 'src/modules/country/services/country.service';
import { CurrencyService } from 'src/modules/currency/services/currency.service';
import { FirmService } from 'src/modules/firm/services/firm.service';
import { FirmInterlocutorEntryService } from 'src/modules/firm-interlocutor-entry/services/firm-interlocutor-entry.service';
import { InterlocutorService } from 'src/modules/interlocutor/services/interlocutor.service';
import { PaymentConditionService } from 'src/modules/payment-condition/services/payment-condition.service';
import { EnterpriseService } from 'src/core/enterprise/services/enterprise.service';
import { RefParamService } from 'src/shared/reference-types/services/ref-param.service';

const demoBusinesses = [
  {
    name: 'Atelier Nova Demo', taxIdNumber: 'DEMO-FR-100001', activity: 'Art et design',
    phone: '+33 1 00 00 01 01', website: 'https://atelier-nova.example.test',
    notes: 'Entreprise fictive de design et identité visuelle. Données de démonstration.',
    address: ['12 rue des Ateliers', 'Bâtiment A', 'Paris', '75001'],
    main: { title: SocialTitles.MRS, name: 'Camille', surname: 'Moreau', email: 'camille.moreau@atelier-nova.example.test', phone: '+33 6 00 00 01 01', position: 'Directrice générale' },
    contact: { title: SocialTitles.MR, name: 'Hugo', surname: 'Petit', email: 'hugo.petit@atelier-nova.example.test', phone: '+33 6 00 00 01 02', position: 'Responsable achats' },
  },
  {
    name: 'Blue Oak Technologies Demo', taxIdNumber: 'DEMO-FR-100002', activity: 'Technologie',
    phone: '+33 1 00 00 02 01', website: 'https://blue-oak.example.test',
    notes: 'Société fictive de services numériques et logiciels. Données de démonstration.',
    address: ['24 avenue du Progrès', 'Étage 2', 'Lyon', '69001'],
    main: { title: SocialTitles.MR, name: 'Yanis', surname: 'Bernard', email: 'yanis.bernard@blue-oak.example.test', phone: '+33 6 00 00 02 01', position: 'Directeur général' },
    contact: { title: SocialTitles.MS, name: 'Inès', surname: 'Robert', email: 'ines.robert@blue-oak.example.test', phone: '+33 6 00 00 02 02', position: 'Responsable administrative' },
  },
  {
    name: 'Maison Céleste Demo', taxIdNumber: 'DEMO-FR-100003', activity: 'Vente au détail (e-commerce et hors ligne)',
    phone: '+33 1 00 00 03 01', website: 'https://maison-celeste.example.test',
    notes: 'Marque fictive de décoration et articles pour la maison. Données de démonstration.',
    address: ['8 place des Créateurs', 'Local 4', 'Bordeaux', '33000'],
    main: { title: SocialTitles.MRS, name: 'Lina', surname: 'Dubois', email: 'lina.dubois@maison-celeste.example.test', phone: '+33 6 00 00 03 01', position: 'Fondatrice' },
    contact: { title: SocialTitles.MISS, name: 'Sarah', surname: 'Laurent', email: 'sarah.laurent@maison-celeste.example.test', phone: '+33 6 00 00 03 02', position: 'Gestionnaire de compte' },
  },
  {
    name: 'Green Bridge Logistics Demo', taxIdNumber: 'DEMO-FR-100004', activity: 'Exploitation minière et logistique',
    phone: '+33 1 00 00 04 01', website: 'https://green-bridge.example.test',
    notes: 'Prestataire fictif de transport et logistique. Données de démonstration.',
    address: ['31 rue des Entrepôts', 'Zone démo', 'Nantes', '44000'],
    main: { title: SocialTitles.MR, name: 'Noah', surname: 'Simon', email: 'noah.simon@green-bridge.example.test', phone: '+33 6 00 00 04 01', position: 'Directeur des opérations' },
    contact: { title: SocialTitles.MRS, name: 'Jade', surname: 'Michel', email: 'jade.michel@green-bridge.example.test', phone: '+33 6 00 00 04 02', position: 'Comptable' },
  },
  {
    name: 'Horizon Conseil Demo', taxIdNumber: 'DEMO-FR-100005', activity: 'Services financiers',
    phone: '+33 1 00 00 05 01', website: 'https://horizon-conseil.example.test',
    notes: 'Cabinet fictif de conseil aux petites entreprises. Données de démonstration.',
    address: ['5 boulevard des Idées', 'Bureau 12', 'Toulouse', '31000'],
    main: { title: SocialTitles.MR, name: 'Adam', surname: 'Lefebvre', email: 'adam.lefebvre@horizon-conseil.example.test', phone: '+33 6 00 00 05 01', position: 'Associé' },
    contact: { title: SocialTitles.MRS, name: 'Maya', surname: 'Garcia', email: 'maya.garcia@horizon-conseil.example.test', phone: '+33 6 00 00 05 02', position: 'Assistante de direction' },
  },
  {
    name: 'Les Jardins du Canal Demo', taxIdNumber: 'DEMO-FR-100006', activity: 'Agriculture',
    phone: '+33 1 00 00 06 01', website: 'https://jardins-canal.example.test',
    notes: 'Exploitation agricole fictive spécialisée dans les produits locaux. Données de démonstration.',
    address: ['17 chemin des Vergers', 'Ferme démo', 'Lille', '59000'],
    main: { title: SocialTitles.MRS, name: 'Nora', surname: 'Roux', email: 'nora.roux@jardins-canal.example.test', phone: '+33 6 00 00 06 01', position: 'Gérante' },
    contact: { title: SocialTitles.MR, name: 'Elias', surname: 'Fournier', email: 'elias.fournier@jardins-canal.example.test', phone: '+33 6 00 00 06 02', position: 'Responsable commercial' },
  },
  {
    name: 'Pixel & Papier Demo', taxIdNumber: 'DEMO-FR-100007', activity: 'Publication et médias Web',
    phone: '+33 1 00 00 07 01', website: 'https://pixel-papier.example.test',
    notes: 'Studio fictif de création de contenus et édition numérique. Données de démonstration.',
    address: ['42 rue des Images', 'Studio 3', 'Rennes', '35000'],
    main: { title: SocialTitles.MS, name: 'Léa', surname: 'Girard', email: 'lea.girard@pixel-papier.example.test', phone: '+33 6 00 00 07 01', position: 'Directrice de création' },
    contact: { title: SocialTitles.MR, name: 'Louis', surname: 'Bonnet', email: 'louis.bonnet@pixel-papier.example.test', phone: '+33 6 00 00 07 02', position: 'Responsable administratif' },
  },
  {
    name: 'Atout Bâtiment Demo', taxIdNumber: 'DEMO-FR-100008', activity: 'Construction',
    phone: '+33 1 00 00 08 01', website: 'https://atout-batiment.example.test',
    notes: 'Entreprise fictive de rénovation et petits travaux. Données de démonstration.',
    address: ['9 allée des Compagnons', 'Atelier 8', 'Strasbourg', '67000'],
    main: { title: SocialTitles.MR, name: 'Ethan', surname: 'Mercier', email: 'ethan.mercier@atout-batiment.example.test', phone: '+33 6 00 00 08 01', position: 'Gérant' },
    contact: { title: SocialTitles.MRS, name: 'Zoé', surname: 'Lambert', email: 'zoe.lambert@atout-batiment.example.test', phone: '+33 6 00 00 08 02', position: 'Responsable facturation' },
  },
];

@Injectable()
export class DemoBusinessesSeederCommand {
  constructor(
    private readonly firmService: FirmService,
    private readonly interlocutorService: InterlocutorService,
    private readonly linkService: FirmInterlocutorEntryService,
    private readonly countryService: CountryService,
    private readonly currencyService: CurrencyService,
    private readonly activityService: ActivityService,
    private readonly paymentConditionService: PaymentConditionService,
    private readonly cabinetService: CabinetService,
    private readonly enterpriseService: EnterpriseService,
    private readonly refParamService: RefParamService,
  ) {}

  @Command({ command: 'seed:demo-businesses', describe: 'Seed fictional demo businesses and contacts' })
  async seed() {
    const country = await this.countryService.findOneByCondition({ filter: 'alpha2Code||$eq||FR' });
    if (!country) throw new Error('Seed countries before demo businesses');

    const referenceParameters = await this.refParamService.findAll({});
    const countryParameter = referenceParameters.find(
      (parameter) => parameter.refTypeId === 'country' && parameter.label === 'FR',
    );
    const euroParameter = referenceParameters.find(
      (parameter) =>
        parameter.refTypeId === 'currency' &&
        (parameter.extras as { code?: string })?.code === 'EUR',
    );
    const paymentParameter = referenceParameters.find(
      (parameter) => parameter.refTypeId === 'payment-conditions',
    );
    if (!countryParameter || !euroParameter || !paymentParameter) {
      throw new Error('Seed reference parameters before demo businesses');
    }

    const currencies = await this.currencyService.findAll();
    const euro = currencies.find((currency) => currency.code === 'EUR');
    if (!euro) throw new Error('Seed currencies before demo businesses');

    const activities = await this.activityService.findAll();
    const paymentConditions = await this.paymentConditionService.findAll({});
    const existingFirms = await this.firmService.findAll({});
    const cabinet = (await this.cabinetService.findAll())[0];
    if (!activities.length || !paymentConditions.length || !cabinet) {
      throw new Error('Seed activities, payment conditions, and cabinet before demo businesses');
    }

    let firmsCreated = 0;
    let contactsCreated = 0;
    let siteEnterprisesCreated = 0;
    const siteEnterprises = await this.enterpriseService.findAll({});
    for (const demo of demoBusinesses) {
      if (!siteEnterprises.some((entry) => entry.name === demo.name)) {
        const activityParameter = referenceParameters.find(
          (parameter) =>
            parameter.refTypeId === 'activity' &&
            parameter.label === demo.activity,
        ) ?? referenceParameters.find((parameter) => parameter.refTypeId === 'activity');
        const siteAddress = {
          address: demo.address[0],
          address2: demo.address[1],
          region: demo.address[2],
          zipcode: Number(demo.address[3]),
          countryId: countryParameter.id,
        };
        const deliveryAddress = {
          ...siteAddress,
          address: `${demo.address[0]} (livraison)`,
        };
        const siteContacts = [demo.main, demo.contact].map((contact, index) => ({
          main: index === 0,
          position: contact.position,
          interlocutor: {
            title: contact.title,
            firstName: contact.name,
            lastName: contact.surname,
            phone: contact.phone,
            email: contact.email,
          },
        }));
        await this.enterpriseService.extendedSave(
          {
            name: demo.name,
            phone: demo.phone,
            website: demo.website,
            particular: false,
            taxId: demo.taxIdNumber,
            notes: demo.notes,
            activityId: activityParameter?.id,
            currencyId: euroParameter.id,
            paymentConditionId: paymentParameter.id,
            invoicingAddress: siteAddress,
            deliveryAddress,
            interlocutors: siteContacts,
          },
          deliveryAddress,
          siteAddress,
          siteContacts,
        );
        siteEnterprisesCreated += 1;
      }

      let firm = existingFirms.find((entry) => entry.name === demo.name);
      if (!firm) {
        const activity = activities.find((entry) => entry.label === demo.activity) ?? activities[0];
        const address = {
          address: demo.address[0], address2: demo.address[1], region: demo.address[2],
          zipcode: demo.address[3], countryId: country.id,
        };
        firm = await this.firmService.save({
          name: demo.name,
          website: demo.website,
          phone: demo.phone,
          notes: demo.notes,
          isPerson: false,
          taxIdNumber: demo.taxIdNumber,
          activityId: activity.id,
          currencyId: euro.id,
          paymentConditionId: paymentConditions[0].id,
          cabinetId: cabinet.id,
          invoicingAddress: address,
          deliveryAddress: { ...address, address: `${demo.address[0]} (livraison)` },
          mainInterlocutor: demo.main,
        });
        firmsCreated += 1;
        contactsCreated += 1;
      }

      const contacts = [demo.main, demo.contact];
      for (const [index, contact] of contacts.entries()) {
        let interlocutor = await this.interlocutorService.findOneByCondition({
          filter: `email||$eq||${contact.email}`,
        });
        if (!interlocutor) {
          interlocutor = await this.interlocutorService.save(contact);
          contactsCreated += 1;
        }
        await this.linkService.save({
          firmId: firm.id,
          interlocutorId: interlocutor.id,
          isMain: index === 0,
          position: contact.position,
        });
      }
    }

    console.log(`Demo businesses ready for the website: ${demoBusinesses.length} enterprises with ${demoBusinesses.length * 2} linked contacts (${siteEnterprisesCreated} website enterprises created). Legacy firms: ${firmsCreated} created; ${contactsCreated} legacy contacts created.`);
  }
}
