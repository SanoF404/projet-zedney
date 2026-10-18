import { PartialType } from '@nestjs/mapped-types';
import { CreateTaxRateDto } from './tax-rate.create.dto';

export class UpdateTaxRateDto extends PartialType(CreateTaxRateDto) {}
