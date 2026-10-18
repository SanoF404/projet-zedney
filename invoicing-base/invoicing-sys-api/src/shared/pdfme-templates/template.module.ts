import { Module } from '@nestjs/common';
import { TemplateTypeController } from './controllers/template-type.controller';
import { TemplateController } from './controllers/template.controller';
import { TemplateTypeService } from './services/template-type.service';
import { TemplateTypeRepository } from './repositories/template-type.repository';
import { TemplateService } from './services/template.service';
import { TemplateRepository } from './repositories/template.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateEntity } from './entities/template.entity';
import { StorageModule } from '../storage/storage.module';
import { TemplateTypeEntity } from './entities/template-type.entity';
import { LoggerModule } from '../logger/logger.module';

@Module({
  controllers: [TemplateController, TemplateTypeController],
  providers: [
    TemplateService,
    TemplateRepository,
    TemplateTypeService,
    TemplateTypeRepository,
  ],
  exports: [
    TemplateService,
    TemplateTypeService,
    TemplateRepository,
    TemplateTypeRepository,
  ],
  imports: [
    TypeOrmModule.forFeature([TemplateEntity, TemplateTypeEntity]),
    StorageModule,
    LoggerModule,
  ],
})
export class TemplateModule {}
