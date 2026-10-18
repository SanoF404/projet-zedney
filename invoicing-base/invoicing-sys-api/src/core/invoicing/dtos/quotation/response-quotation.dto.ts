import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ResponseEnterpriseDto } from 'src/core/enterprise/dtos/enterprise/enterprise.response.dto';
import { ResponseInterlocutorDto } from 'src/core/enterprise/dtos/interlocutor/interlocutor.response.dto';
import { ResponseDtoHelper } from 'src/shared/database/dtos/database.response.dto';
import { ResponseQuotationArticleDto } from '../quotation-article/response-quotation-article.dto';
import { ResponseRefParamDto } from 'src/shared/reference-types/dtos/ref-param/response-ref-param.dto';
import { ResponseBankAccountDto } from 'src/core/bank-account/dtos/bank-account.response.dto';
import { ResponseQuotationUploadDto } from '../quotation-upload/response-quotation-upload.dto';

export class ResponseQuotationDto extends ResponseDtoHelper {
  @ApiProperty({ type: Number })
  @Expose()
  id: number;

  @ApiProperty({ enum: ['incoming', 'outgoing'] })
  @Expose()
  direction: 'incoming' | 'outgoing';

  @ApiProperty({ type: String })
  @Expose()
  status: string;

  @ApiProperty({ type: Date })
  @Expose()
  date: Date;

  @ApiProperty({ type: Date })
  @Expose()
  dueDate: Date;

  @ApiProperty({ type: String })
  @Expose()
  object: string;

  @ApiProperty({ type: String })
  @Expose()
  generalConditions: string;

  @ApiProperty({ type: String })
  @Expose()
  notes?: string;

  @ApiProperty({ type: ResponseEnterpriseDto })
  @Expose()
  @Type(() => ResponseEnterpriseDto)
  enterprise: ResponseEnterpriseDto;

  @ApiProperty({ type: Number })
  @Expose()
  enterpriseId: number;

  @ApiProperty({ type: ResponseInterlocutorDto })
  @Expose()
  @Type(() => ResponseInterlocutorDto)
  interlocutor: ResponseInterlocutorDto;

  @ApiProperty({ type: Number })
  @Expose()
  interlocutorId: number;

  @ApiProperty({ type: ResponseRefParamDto })
  @Expose()
  @Type(() => ResponseRefParamDto)
  currency: ResponseRefParamDto;

  @ApiProperty({ type: Number })
  @Expose()
  currencyId: number;

  @ApiProperty({ type: ResponseBankAccountDto })
  @Expose()
  @Type(() => ResponseBankAccountDto)
  bankAccount: ResponseBankAccountDto;

  @ApiProperty({ type: Number })
  @Expose()
  bankAccountId: number;

  @ApiProperty({ type: () => [ResponseQuotationArticleDto] })
  @Expose()
  @Type(() => ResponseQuotationArticleDto)
  quotationArticles: ResponseQuotationArticleDto[];

  @ApiProperty({ type: () => [ResponseQuotationUploadDto] })
  @Expose()
  @Type(() => ResponseQuotationUploadDto)
  uploads: ResponseQuotationUploadDto[];
}
