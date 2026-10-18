import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsOptional } from 'class-validator';
import { CreateArticleDto } from 'src/core/inventory/dtos/article/article.create.dto';

export class CreateQuotationArticleDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  quotationId: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  articleId: number;

  @ApiProperty({ type: CreateArticleDto })
  @IsObject()
  @IsOptional()
  article?: CreateArticleDto;

  @ApiProperty({ type: Number })
  @IsNumber()
  order: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  quantity: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  unitPrice: number;

  @ApiProperty({ type: String, enum: ['rate', 'fixed'], default: 'rate' })
  discountType: 'rate' | 'fixed';

  @ApiProperty({ type: Number })
  @IsNumber()
  discountValue: number;

  @ApiProperty({ type: [Number] })
  @IsOptional()
  @IsNumber({}, { each: true })
  taxIds?: number[];
}
