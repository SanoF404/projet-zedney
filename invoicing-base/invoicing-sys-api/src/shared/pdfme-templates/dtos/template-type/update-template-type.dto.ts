import { PartialType } from '@nestjs/swagger';
import { CreateTemplateTypeDto } from './create-template-type.dto';

export class UpdateTemplateTypeDto extends PartialType(CreateTemplateTypeDto) {}
