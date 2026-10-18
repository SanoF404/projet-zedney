import { Injectable } from '@nestjs/common';
import { AbstractCrudService } from 'src/shared/database/services/abstract-crud.service';
import { AddressEntity } from '../entities/address.entity';
import { AddressRepository } from '../repositories/address.repository';

@Injectable()
export class AddressService extends AbstractCrudService<AddressEntity> {
  constructor(private readonly addressRepository: AddressRepository) {
    super(addressRepository);
  }
}
