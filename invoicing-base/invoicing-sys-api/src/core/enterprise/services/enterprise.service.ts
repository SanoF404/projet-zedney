import { Injectable } from '@nestjs/common';
import { EnterpriseRepository } from '../repositories/enterprise.repository';
import { AbstractCrudService } from 'src/shared/database/services/abstract-crud.service';
import { EnterpriseEntity } from '../entities/enterprise.entity';
import { CreateEnterpriseDto } from '../dtos/enterprise/enterprise.create.dto';
import { Transactional } from '@nestjs-cls/transactional';
import { EnterpriseInterlocutorService } from './enterprise-interlocutor.service';
import { CreateAddressDto } from '../dtos/address/address.create.dto';
import { AddressService } from './address.service';
import { UpdateEnterpriseDto } from '../dtos/enterprise/enterprise.update.dto';
import { UpdateAddressDto } from '../dtos/address/address.update.dto';
import { CreateEnterpriseInterlocutorDto } from '../dtos/enterprise-interlocutor/create-enterprise-interlocutor.dto';

@Injectable()
export class EnterpriseService extends AbstractCrudService<EnterpriseEntity> {
  constructor(
    private readonly enterpriseRepository: EnterpriseRepository,
    private readonly addressService: AddressService,
    private readonly enterpriseInterlocutorService: EnterpriseInterlocutorService,
  ) {
    super(enterpriseRepository);
  }

  @Transactional()
  async extendedSave(
    createEnterpriseDto: CreateEnterpriseDto,
    deliveryAddressDto: CreateAddressDto,
    invoicingAddressDto: CreateAddressDto,
    interlocutors: CreateEnterpriseInterlocutorDto[],
  ): Promise<EnterpriseEntity> {
    const deliveryAddress = await this.addressService.save(deliveryAddressDto);
    const invoicingAddress =
      await this.addressService.save(invoicingAddressDto);

    const enterprise = await this.enterpriseRepository.save({
      ...createEnterpriseDto,
      deliveryAddress,
      invoicingAddress,
    });

    await this.enterpriseInterlocutorService.extendedSaveMany(
      interlocutors.map((interlocutor) => ({
        ...interlocutor,
        enterprise,
      })),
    );

    return enterprise;
  }

  @Transactional()
  async extendedUpdate(
    id: number,
    updateEnterpriseDto: UpdateEnterpriseDto,
    deliveryAddressDto: UpdateAddressDto,
    invoicingAddressDto: UpdateAddressDto,
  ): Promise<EnterpriseEntity> {
    const enterprise = await this.findOneById(id);
    const deliveryAddress = await this.addressService.update(
      enterprise.deliveryAddressId,
      deliveryAddressDto,
    );
    const invoicingAddress = await this.addressService.update(
      enterprise.invoicingAddressId,
      invoicingAddressDto,
    );
    return this.enterpriseRepository.save({
      ...enterprise,
      ...updateEnterpriseDto,
      deliveryAddress,
      invoicingAddress,
    });
  }
}
