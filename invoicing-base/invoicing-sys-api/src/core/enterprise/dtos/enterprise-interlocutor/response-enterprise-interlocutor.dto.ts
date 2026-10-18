import { ApiProperty } from '@nestjs/swagger';
import { ResponseDtoHelper } from 'src/shared/database/dtos/database.response.dto';
import { ResponseEnterpriseDto } from '../enterprise/enterprise.response.dto';
import { Expose, Type } from 'class-transformer';
import { ResponseInterlocutorDto } from '../interlocutor/interlocutor.response.dto';

export class ResponseEnterpriseInterlocutorDto extends ResponseDtoHelper {
  @ApiProperty({ type: Number })
  @Expose()
  id: number;

  @ApiProperty({ type: Number })
  @Expose()
  enterpriseId: number;

  @ApiProperty({ type: Number })
  @Expose()
  interlocutorId: number;

  @ApiProperty({ type: ResponseEnterpriseDto })
  @Expose()
  @Type(() => ResponseEnterpriseDto)
  enterprise: ResponseEnterpriseDto;

  @ApiProperty({ type: ResponseInterlocutorDto })
  @Expose()
  @Type(() => ResponseInterlocutorDto)
  interlocutor: ResponseInterlocutorDto;

  @ApiProperty({ type: Boolean })
  @Expose()
  main: boolean;

  @ApiProperty({ type: String })
  @Expose()
  position: string;
}
