import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateTemplateTypeDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  code: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  name: string;

  @ApiProperty({ type: Object, required: false })
  @IsOptional()
  @IsJSON()
  variables?: object;
}
