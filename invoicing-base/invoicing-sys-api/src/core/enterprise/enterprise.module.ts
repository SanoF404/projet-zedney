import { Module } from '@nestjs/common';
import { EnterpriseService } from './services/enterprise.service';
import { EnterpriseRepository } from './repositories/enterprise.repository';
import { EnterpriseEntity } from './entities/enterprise.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterlocutorEntity } from './entities/interlocutor.entity';
import { InterlocutorRepository } from './repositories/interlocutor.repository';
import { InterlocutorService } from './services/interlocutor.service';
import { EnterpriseInterlocutorEntity } from './entities/enterprise-interlocutor.entity';
import { EnterpriseInterlocutorRepository } from './repositories/enterprise-interlocutor.repository';
import { EnterpriseInterlocutorService } from './services/enterprise-interlocutor.service';
import { AddressRepository } from './repositories/address.repository';
import { AddressService } from './services/address.service';
import { AddressEntity } from './entities/address.entity';

@Module({
  controllers: [],
  providers: [
    EnterpriseRepository,
    InterlocutorRepository,
    EnterpriseInterlocutorRepository,
    AddressRepository,

    EnterpriseService,
    InterlocutorService,
    EnterpriseInterlocutorService,
    AddressService,
  ],
  exports: [
    EnterpriseRepository,
    InterlocutorRepository,
    EnterpriseInterlocutorRepository,
    AddressRepository,

    EnterpriseService,
    InterlocutorService,
    EnterpriseInterlocutorService,
    AddressService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      EnterpriseEntity,
      InterlocutorEntity,
      EnterpriseInterlocutorEntity,
      AddressEntity,
    ]),
  ],
})
export class EnterpriseModule {}
