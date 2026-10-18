import { PartialType } from '@nestjs/mapped-types';
import { CreateQuotationDto } from './create-quotation.dto';
import { UpdateQuotationUploadDto } from '../quotation-upload/update-quotation-upload.dto';

export class UpdateQuotationDto extends PartialType(CreateQuotationDto) {
  declare uploads: UpdateQuotationUploadDto[];
}
