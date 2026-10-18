import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ResponseDtoHelper } from 'src/shared/database/dtos/database.response.dto';
import { ResponseArticleFamilyDto } from '../article-family/article-family.response.dto';

export class ResponseArticleDto extends ResponseDtoHelper {
  @ApiProperty({ type: Number })
  @Expose()
  id: number;

  @ApiProperty({ type: String })
  @Expose()
  title?: string;

  @ApiProperty({ type: String })
  @Expose()
  description?: string;

  @ApiProperty({ type: () => ResponseArticleFamilyDto })
  @Expose()
  @Type(() => ResponseArticleFamilyDto)
  articleFamily?: ResponseArticleFamilyDto;

  @ApiProperty({ type: Number })
  @Expose()
  articleFamilyId?: number;
}
