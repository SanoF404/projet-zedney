import { ApiProperty } from '@nestjs/swagger';
import { ResponseDtoHelper } from 'src/shared/database/dtos/database.response.dto';
import { Expose, Type } from 'class-transformer';
import { ResponseEnterpriseInterlocutorDto } from '../enterprise-interlocutor/response-enterprise-interlocutor.dto';
import { ResponseRefParamDto } from 'src/shared/reference-types/dtos/ref-param/response-ref-param.dto';
import { ResponseAddressDto } from '../address/address.response.dto';

export class ResponseEnterpriseDto extends ResponseDtoHelper {
  @ApiProperty({ type: Number })
  @Expose()
  id: number;

  @ApiProperty({ type: String })
  @Expose()
  name: string;

  @ApiProperty({ type: String })
  @Expose()
  phone: string;

  @ApiProperty({ type: String })
  @Expose()
  website?: string;

  @ApiProperty({ type: Boolean })
  @Expose()
  particular: boolean;

  @ApiProperty({ type: String })
  @Expose()
  taxId?: string;

  @ApiProperty({ type: String })
  @Expose()
  notes?: string;

  @ApiProperty({ type: Boolean })
  @Expose()
  system?: boolean;

  @ApiProperty({ type: Number })
  @Expose()
  activityId?: number;

  @ApiProperty({ type: ResponseRefParamDto })
  @Expose()
  @Type(() => ResponseRefParamDto)
  activity?: ResponseRefParamDto;

  @ApiProperty({ type: Number })
  @Expose()
  currencyId?: number;

  @ApiProperty({ type: ResponseRefParamDto })
  @Expose()
  @Type(() => ResponseRefParamDto)
  currency?: ResponseRefParamDto;

  @ApiProperty({ type: Number })
  @Expose()
  paymentConditionId?: number;

  @ApiProperty({ type: ResponseRefParamDto })
  @Expose()
  @Type(() => ResponseRefParamDto)
  paymentCondition?: ResponseRefParamDto;

  @ApiProperty({ type: () => [ResponseEnterpriseInterlocutorDto] })
  @Expose()
  @Type(() => ResponseEnterpriseInterlocutorDto)
  interlocutors?: ResponseEnterpriseInterlocutorDto[];

  @ApiProperty({ type: Number })
  @Expose()
  invoicingAddressId?: number;

  @ApiProperty({ type: ResponseAddressDto })
  @Expose()
  @Type(() => ResponseAddressDto)
  invoicingAddress?: ResponseAddressDto;

  @ApiProperty({ type: Number })
  @Expose()
  deliveryAddressId?: number;

  @ApiProperty({ type: ResponseAddressDto })
  @Expose()
  @Type(() => ResponseAddressDto)
  deliveryAddress?: ResponseAddressDto;
}
