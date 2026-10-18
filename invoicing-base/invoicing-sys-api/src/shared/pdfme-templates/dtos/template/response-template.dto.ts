import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ResponseDtoHelper } from 'src/shared/database/dtos/database.response.dto';
import { ResponseStorageDto } from 'src/shared/storage/dtos/response-storage.dto';
import { ResponseTemplateTypeDto } from '../template-type/response-template-type.dto';

export class ResponseTemplateDto extends ResponseDtoHelper {
  @ApiProperty({ type: String })
  @Expose()
  id: string;

  @ApiProperty({ type: String })
  @Expose()
  name: string;

  @ApiProperty({ type: () => ResponseTemplateTypeDto })
  @Expose()
  @Type(() => ResponseTemplateTypeDto)
  templateType?: ResponseTemplateTypeDto;

  @ApiProperty({ type: String })
  @Expose()
  templateTypeId?: string;

  @ApiProperty({ type: String })
  @Expose()
  description?: string;

  @ApiProperty({ type: ResponseStorageDto })
  @Expose()
  @Type(() => ResponseStorageDto)
  document?: ResponseStorageDto;

  @ApiProperty({ type: Number })
  @Expose()
  documentId?: number;

  @ApiProperty({ type: Object })
  @Expose()
  variables?: object;

  @ApiProperty({ type: Object })
  @Expose()
  backupVariables?: object;
}
