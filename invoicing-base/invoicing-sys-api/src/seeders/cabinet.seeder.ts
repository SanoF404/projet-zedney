import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { CabinetService } from 'src/modules/cabinet/services/cabinet.service';
import { ActivityService } from 'src/modules/activity/services/activity.service';
import { CurrencyService } from 'src/modules/currency/services/currency.service';
import { AddressService } from 'src/modules/address/services/address.service';
import { CountryService } from 'src/modules/country/services/country.service';
import {
  cabinetAddressSeederData,
  cabinetSeederData,
} from './data/cabinet.data';

@Injectable()
export class CabinetSeederCommand {
  constructor(
    private readonly cabinetService: CabinetService,
    private readonly activityService: ActivityService,
    private readonly currencyService: CurrencyService,
    private readonly addressService: AddressService,
    private readonly countryService: CountryService,
  ) {}

  @Command({
    command: 'seed:cabinet',
    describe: 'seed system cabinet',
  })
  async seed() {
    const start = new Date();
    console.log('Starting seeding of cabinet');

    const existingCabinet = (await this.cabinetService.findAll()).find(
      (cabinet) => cabinet.id === cabinetSeederData.id,
    );
    if (existingCabinet) {
      console.log('Cabinet already exists; skipping');
      return;
    }

    const activities = await this.activityService.findAll();
    if (!activities.length) {
      throw new Error('Seed activities before seeding the cabinet');
    }
    const activityRandomIndex = Math.floor(Math.random() * activities.length);
    const currencies = await this.currencyService.findAll();
    if (!currencies.length) {
      throw new Error('Seed currencies before seeding the cabinet');
    }
    const currencyRandomIndex = Math.floor(Math.random() * currencies.length);
    const country = await this.countryService.findOneByCondition({
      filter: `alpha2Code||$eq||FR`,
    });
    if (!country) {
      throw new Error('Seed countries before seeding the cabinet');
    }

    const address = await this.addressService.save({
      ...cabinetAddressSeederData,
      countryId: country.id,
    });

    await this.cabinetService.save({
      ...cabinetSeederData,
      addressId: address.id,
      activityId: activities[activityRandomIndex].id,
      currencyId: currencies[currencyRandomIndex].id,
    });

    const end = new Date();
    console.log(`Seeding completed in ${end.getTime() - start.getTime()}ms`);
  }
}
