import { Injectable } from '@nestjs/common';
import { AbstractCrudService } from 'src/shared/database/services/abstract-crud.service';
import { TaxRateEntity } from '../entities/tax-rate.entity';
import { TaxRateRepository } from '../repositories/tax-rate.repository';

@Injectable()
export class TaxRateService extends AbstractCrudService<TaxRateEntity> {
  constructor(private readonly taxRateRepository: TaxRateRepository) {
    super(taxRateRepository);
  }
}
