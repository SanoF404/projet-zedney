import { ApiProperty } from '@nestjs/swagger';
import { ResponseDtoHelper } from 'src/shared/database/dtos/database.response.dto';
import { Expose } from 'class-transformer';

export class ResponseTemplateTypeDto extends ResponseDtoHelper {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  code: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty({ type: Object, required: false })
  @Expose()
  variables?: object;
}
