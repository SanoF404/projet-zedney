import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateQuotationUploadDto } from './create-quotation-upload.dto';

export class UpdateQuotationUploadDto extends PartialType(
  CreateQuotationUploadDto,
) {
  @ApiProperty({ type: Number })
  id: number;
}
