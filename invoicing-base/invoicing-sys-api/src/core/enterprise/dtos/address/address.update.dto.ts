import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressDto } from './address.create.dto';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {}
