import { Module } from '@nestjs/common';
import { TaxRateService } from './services/tax-rate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxRateEntity } from './entities/tax-rate.entity';
import { TaxRateRepository } from './repositories/tax-rate.repository';

@Module({
  controllers: [],
  providers: [TaxRateRepository, TaxRateService],
  exports: [TaxRateRepository, TaxRateService],
  imports: [TypeOrmModule.forFeature([TaxRateEntity])],
})
export class TaxModule {}
