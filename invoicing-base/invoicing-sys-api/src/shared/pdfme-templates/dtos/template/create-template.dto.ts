import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsOptional, IsString, IsUUID, Length } from 'class-validator';

export class CreateTemplateDto {
  @ApiProperty({ type: String })
  @IsString()
  @Length(1, 255)
  name: string;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ type: String, required: false })
  @IsUUID()
  @IsOptional()
  templateTypeId?: string;

  @ApiProperty({ type: Number, required: false })
  @IsOptional()
  documentId?: number;

  @ApiProperty({ type: Object, required: false })
  @IsOptional()
  @IsJSON()
  variables?: object;

  @ApiProperty({ type: Object, required: false })
  @IsOptional()
  @IsJSON()
  backupVariables?: object;
}
