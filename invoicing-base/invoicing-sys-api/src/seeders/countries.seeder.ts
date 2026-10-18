import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { RefTypeRepository } from 'src/shared/reference-types/repositories/ref-type.repository';
import { RefParamRepository } from 'src/shared/reference-types/repositories/ref-param.repository';
import { countriesSeed } from './data/countries.data';

@Injectable()
export class RefCountriesSeedCommand {
  constructor(
    private readonly refTypeRepository: RefTypeRepository,
    private readonly refParamRepository: RefParamRepository,
  ) {}

  @Command({
    command: 'seed:countries',
    describe: 'Seed system countries',
  })
  async seed() {
    const start = new Date();
    console.log('🚀 Starting seeding of countries...');
    //=============================================================================================
    let countryRefType = await this.refTypeRepository.findOne({
      where: { label: 'Country' },
    });

    if (!countryRefType) {
      countryRefType = await this.refTypeRepository.save({
        id: 'country',
        label: 'Country',
        description: 'Parent reference type for all countries',
      });
    }
    // Seed missing records even when the reference type already exists. This
    // makes the command safe to rerun after an incomplete/partial seed.
    for (const country of countriesSeed) {
      const existingCountry = await this.refParamRepository.findOne({
        where: { label: country.alpha2Code, refTypeId: countryRefType.id },
      });
      if (!existingCountry) {
        await this.refParamRepository.save({
          label: country.alpha2Code,
          description: `Description for ${country.alpha2Code}`,
          refType: countryRefType,
          extras: {
            alpha2Code: country.alpha2Code,
            alpha3Code: country.alpha3Code,
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
