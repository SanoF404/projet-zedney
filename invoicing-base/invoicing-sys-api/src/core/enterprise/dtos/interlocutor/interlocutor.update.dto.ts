import { PartialType } from '@nestjs/mapped-types';
import { CreateInterlocutorDto } from './interlocutor.create.dto';

export class UpdateInterlocutorDto extends PartialType(CreateInterlocutorDto) {}
