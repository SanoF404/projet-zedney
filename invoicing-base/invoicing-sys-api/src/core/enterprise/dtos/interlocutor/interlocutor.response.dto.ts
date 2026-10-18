import { ApiProperty } from '@nestjs/swagger';
import { ResponseDtoHelper } from 'src/shared/database/dtos/database.response.dto';
import { Expose, Type } from 'class-transformer';
import { SocialTitles } from 'src/app/enums/social-titles.enum';
import { ResponseEnterpriseInterlocutorDto } from '../enterprise-interlocutor/response-enterprise-interlocutor.dto';

export class ResponseInterlocutorDto extends ResponseDtoHelper {
  @ApiProperty({ type: Number })
  @Expose()
  id: number;

  @ApiProperty({ type: String, enum: SocialTitles })
  @Expose()
  title: SocialTitles;

  @ApiProperty({ type: String })
  @Expose()
  firstName: string;

  @ApiProperty({ type: String })
  @Expose()
  lastName: string;

  @ApiProperty({ type: String })
  @Expose()
  phone: string;

  @ApiProperty({ type: String })
  @Expose()
  email: string;

  @ApiProperty({ type: () => [ResponseEnterpriseInterlocutorDto] })
  @Expose()
  @Type(() => ResponseEnterpriseInterlocutorDto)
  enterprises?: ResponseEnterpriseInterlocutorDto[];
}
