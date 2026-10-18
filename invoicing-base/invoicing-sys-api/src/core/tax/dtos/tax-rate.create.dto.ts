import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsPositive, IsString } from 'class-validator';

export class CreateTaxRateDto {
  @ApiProperty({ type: String })
  @IsString()
  label: string;

  @ApiProperty({ type: Number })
  @IsPositive()
  value: number;

  @ApiProperty({ type: String, enum: ['rate', 'fixed'] })
  @IsEnum(['rate', 'fixed'])
  type: 'rate' | 'fixed';

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  special: boolean;

  @ApiProperty({ type: Number })
  currencyId?: number;
}
