import { ApiProperty } from '@nestjs/swagger';
import { CreateInterlocutorDto } from '../interlocutor/interlocutor.create.dto';
import { IsObject, IsString } from 'class-validator';
import { Optional } from '@nestjs/common';

export class CreateEnterpriseInterlocutorDto {
  @ApiProperty({ type: CreateInterlocutorDto })
  @IsObject()
  interlocutor: CreateInterlocutorDto;

  @ApiProperty({ type: Boolean })
  @Optional()
  main: boolean;

  @ApiProperty({ type: String })
  @IsString()
  position: string;
}
