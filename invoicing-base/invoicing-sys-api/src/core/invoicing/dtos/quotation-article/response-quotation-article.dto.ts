import { ApiProperty } from '@nestjs/swagger';
import { ResponseQuotationDto } from '../quotation/response-quotation.dto';
import { Expose, Type } from 'class-transformer';
import { ResponseArticleDto } from 'src/core/inventory/dtos/article/article.response.dto';
import { ResponseDtoHelper } from 'src/shared/database/dtos/database.response.dto';
import { ResponseTaxRateDto } from 'src/core/tax/dtos/tax-rate.response.dto';

export class ResponseQuotationArticleDto extends ResponseDtoHelper {
  @ApiProperty({ type: Number })
  @Expose()
  id: number;

  @ApiProperty({ type: () => ResponseQuotationDto })
  @Expose()
  @Type(() => ResponseQuotationDto)
  quotation: ResponseQuotationDto;

  @ApiProperty({ type: Number })
  @Expose()
  quotationId: number;

  @ApiProperty({ type: () => ResponseArticleDto })
  @Expose()
  @Type(() => ResponseArticleDto)
  article: ResponseArticleDto;

  @ApiProperty({ type: Number })
  @Expose()
  articleId: number;

  @ApiProperty({ type: Number })
  @Expose()
  order: number;

  @ApiProperty({ type: Number })
  @Expose()
  quantity: number;

  @ApiProperty({ type: Number })
  @Expose()
  unitPrice: number;

  @ApiProperty({ type: String, enum: ['rate', 'fixed'], default: 'rate' })
  @Expose()
  discountType: 'rate' | 'fixed';

  @ApiProperty({ type: Number })
  @Expose()
  discountValue: number;

  @ApiProperty({ type: [ResponseTaxRateDto] })
  @Expose()
  @Type(() => ResponseTaxRateDto)
  taxes: ResponseTaxRateDto[];
}
