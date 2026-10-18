import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ResponseDtoHelper } from 'src/shared/database/dtos/database.response.dto';
import { ResponseRefParamDto } from 'src/shared/reference-types/dtos/ref-param/response-ref-param.dto';

export class ResponseTaxRateDto extends ResponseDtoHelper {
  @ApiProperty({ type: Number })
  @Expose()
  id: number;

  @ApiProperty({ type: String })
  @Expose()
  label: string;

  @ApiProperty({ type: Number })
  @Expose()
  value: number;

  @ApiProperty({ type: String, enum: ['fixed', 'rate'] })
  @Expose()
  type: 'fixed' | 'rate';

  @ApiProperty({ type: Boolean })
  @Expose()
  special: boolean;

  @ApiProperty({ type: Number })
  @Expose()
  currencyId?: number;

  @ApiProperty({ type: ResponseRefParamDto })
  @Expose()
  @Type(() => ResponseRefParamDto)
  currency?: ResponseRefParamDto;
}
