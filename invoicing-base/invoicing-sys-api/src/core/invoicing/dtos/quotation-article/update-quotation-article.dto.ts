import { PartialType } from '@nestjs/mapped-types';
import { CreateQuotationArticleDto } from './create-quotation-article.dto';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateArticleDto } from 'src/core/inventory/dtos/article/article.update.dto';

export class UpdateQuotationArticleDto extends PartialType(
  CreateQuotationArticleDto,
) {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: UpdateArticleDto })
  declare article: UpdateArticleDto;
}
