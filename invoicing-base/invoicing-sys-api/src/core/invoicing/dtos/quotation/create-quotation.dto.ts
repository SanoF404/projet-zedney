import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateQuotationArticleDto } from '../quotation-article/create-quotation-article.dto';
import { CreateQuotationUploadDto } from '../quotation-upload/create-quotation-upload.dto';

export class CreateQuotationDto {
  @ApiProperty({ enum: ['incoming', 'outgoing'] })
  @IsEnum(['incoming', 'outgoing'])
  direction: 'incoming' | 'outgoing';

  @ApiProperty({ type: Date })
  @IsDateString()
  date: Date;

  @ApiProperty({ type: Date })
  @IsDateString()
  dueDate: Date;

  @ApiProperty({ type: String })
  @IsString()
  object: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  generalConditions?: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  enterpriseId: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  interlocutorId: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsOptional()
  currencyId?: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsOptional()
  bankAccountId?: number;

  @ApiProperty({ type: () => [CreateQuotationArticleDto] })
  @IsArray()
  quotationArticles: CreateQuotationArticleDto[];

  @ApiProperty({ type: () => [CreateQuotationUploadDto] })
  @IsArray()
  uploads: CreateQuotationUploadDto[];
}
