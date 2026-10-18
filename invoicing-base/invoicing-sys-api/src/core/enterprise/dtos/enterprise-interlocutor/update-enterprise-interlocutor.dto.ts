import { PartialType } from '@nestjs/mapped-types';
import { CreateEnterpriseInterlocutorDto } from './create-enterprise-interlocutor.dto';
import { UpdateInterlocutorDto } from '../interlocutor/interlocutor.update.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsObject } from 'class-validator';

export class UpdateEnterpriseInterlocutorDto extends PartialType(
  CreateEnterpriseInterlocutorDto,
) {
  @ApiProperty({ type: UpdateInterlocutorDto })
  @IsObject()
  declare interlocutors?: UpdateInterlocutorDto;
}
