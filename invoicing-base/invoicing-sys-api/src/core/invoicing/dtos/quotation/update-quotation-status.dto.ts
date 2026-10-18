import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { QuotationEvent } from '../../enums/quotation-event.enum';

export class UpdateQuotationStatusDto {
  @ApiProperty({
    enum: QuotationEvent,
    description: 'The workflow event to trigger on the quotation',
  })
  @IsEnum(QuotationEvent)
  event: QuotationEvent;
}
