import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ResponseQuotationDto } from '../quotation/response-quotation.dto';
import { ResponseStorageDto } from 'src/shared/storage/dtos/response-storage.dto';

export class ResponseQuotationUploadDto {
  @ApiProperty({ type: Number })
  @Expose()
  id: number;

  @ApiProperty({ type: Number })
  @Expose()
  quotationId?: number;

  @ApiProperty({ type: ResponseQuotationDto })
  @Expose()
  @Type(() => ResponseQuotationDto)
  quotation?: ResponseQuotationDto;

  @ApiProperty({ type: Number })
  @Expose()
  uploadId?: number;

  @ApiProperty({ type: ResponseStorageDto })
  @Expose()
  @Type(() => ResponseStorageDto)
  upload?: ResponseStorageDto;

  @ApiProperty({ type: Number })
  @Expose()
  order?: number;
}
