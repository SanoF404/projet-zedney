import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleFamilyDto } from './article-family.create.dto';

export class UpdateArticleFamilyDto extends PartialType(
  CreateArticleFamilyDto,
) {}
