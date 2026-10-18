import { ApiProperty } from '@nestjs/swagger';

export class CreateQuotationUploadDto {
  @ApiProperty({ type: Number })
  uploadId?: number;

  @ApiProperty({ type: Number })
  order?: number;
}
