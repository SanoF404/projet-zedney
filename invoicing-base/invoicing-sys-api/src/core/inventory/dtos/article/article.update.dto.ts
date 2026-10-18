import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleDto } from './article.create.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
  @ApiProperty({ type: Number })
  id: number;
}
