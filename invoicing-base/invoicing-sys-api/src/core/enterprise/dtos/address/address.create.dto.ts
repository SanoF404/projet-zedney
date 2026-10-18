import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({ type: String })
  @IsString()
  address: string;

  @ApiProperty({ type: String })
  @IsString()
  @Optional()
  address2?: string;

  @ApiProperty({ type: String })
  @IsString()
  region: string;

  @ApiProperty({ type: Number })
  @IsInt()
  zipcode: number;

  @ApiProperty({ type: Number })
  @IsInt()
  countryId: number;
}
