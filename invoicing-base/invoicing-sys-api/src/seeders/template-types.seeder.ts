import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { TemplateTypeRepository } from 'src/shared/pdfme-templates/repositories/template-type.repository';
import { templateTypesSeed } from './data/template-types.data';

@Injectable()
export class TemplateTypesSeederCommand {
  constructor(
    private readonly templateTypeRepository: TemplateTypeRepository,
  ) {}

  @Command({
    command: 'seed:template-types',
    describe: 'seed default template types',
  })
  async seed() {
    const start = new Date();
    console.log('Starting seeding of template types');

    for (const def of templateTypesSeed) {
      const existing = await this.templateTypeRepository.findOne({
        where: { code: def.code },
      });
      if (!existing) {
        await this.templateTypeRepository.save(def as any);
        console.log(`Seeded TemplateType: ${def.code}`);
      } else if (
        !existing.variables ||
        Object.keys(existing.variables).length === 0
      ) {
        existing.variables = def.variables;
        await this.templateTypeRepository.save(existing as any);
        console.log(`Updated TemplateType variables: ${def.code}`);
      }
    }

    const end = new Date();
    console.log(`Seeding completed in ${end.getTime() - start.getTime()}ms`);
  }
}
