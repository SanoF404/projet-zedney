import { ResponseWorkflowDto } from 'src/shared/workflows/dtos/response-workflow.dto';
import { ResponseQuotationDto } from './response-quotation.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class ResponseQuotationWorkflowDto extends ResponseWorkflowDto {
  @ApiProperty({
    type: ResponseQuotationDto,
    description: 'The quotation details along with its workflow status',
  })
  @Expose()
  @Type(() => ResponseQuotationDto)
  quotation: ResponseQuotationDto;

  @ApiProperty({
    type: Boolean,
    description: 'Whether the quotation is printable in its current state',
  })
  @Expose()
  isPrintable: boolean;
}
