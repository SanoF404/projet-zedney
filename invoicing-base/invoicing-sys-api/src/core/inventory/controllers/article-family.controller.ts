import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Query,
  Param,
  Put,
  UseInterceptors,
  ClassSerializerInterceptor,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PageDto } from 'src/shared/database/dtos/database.page.dto';
import { IQueryObject } from 'src/shared/database/interfaces/database-query-options.interface';
import { ApiPaginatedResponse } from 'src/shared/database/decorators/api-paginated-resposne.decorator';
import { ArticleFamilyService } from '../services/article-family.service';
import { toDto, toDtoArray } from 'src/shared/database/utils/dtos';
import { ResponseArticleFamilyDto } from '../dtos/article-family/article-family.response.dto';
import { CreateArticleFamilyDto } from '../dtos/article-family/article-family.create.dto';
import { UpdateArticleFamilyDto } from '../dtos/article-family/article-family.update.dto';
import { LogInterceptor } from 'src/shared/logger/decorators/logger.interceptor';
import { LogEvent } from 'src/shared/logger/decorators/log-event.decorator';
import { AdvancedRequest } from 'src/types';
import { EVENT_TYPE } from 'src/shared/logger/enums/event-type.enum';

@ApiTags('article-family')
@ApiBearerAuth('access_token')
@UseInterceptors(LogInterceptor)
@UseInterceptors(ClassSerializerInterceptor)
@Controller({ version: '1', path: '/article-family' })
export class ArticleFamilyController {
  constructor(private readonly articleFamilyService: ArticleFamilyService) {}

  @Get('/all')
  async findAll(
    @Query() options: IQueryObject,
  ): Promise<ResponseArticleFamilyDto[]> {
    return toDtoArray(
      ResponseArticleFamilyDto,
      await this.articleFamilyService.findAll(options),
    );
  }

  @Get('/list')
  @ApiPaginatedResponse(ResponseArticleFamilyDto)
  async findAllPaginated(
    @Query() query: IQueryObject,
  ): Promise<PageDto<ResponseArticleFamilyDto>> {
    const paginated = await this.articleFamilyService.findAllPaginated(query);
    return {
      ...paginated,
      data: toDtoArray(ResponseArticleFamilyDto, paginated.data),
    };
  }

  @Get('/:id')
  async findOneById(
    @Param('id') id: number,
  ): Promise<ResponseArticleFamilyDto> {
    return toDto(
      ResponseArticleFamilyDto,
      await this.articleFamilyService.findOneById(id),
    );
  }

  @Post('')
  @LogEvent(EVENT_TYPE.ARTICLE_FAMILY_CREATED)
  async save(
    @Body() createArticleFamilyDto: CreateArticleFamilyDto,
    @Request() req: AdvancedRequest,
  ): Promise<ResponseArticleFamilyDto> {
    const articleFamily = await this.articleFamilyService.save(
      createArticleFamilyDto,
    );
    req.logInfo = { id: articleFamily.id, title: articleFamily.title };
    return toDto(
      ResponseArticleFamilyDto,
      await this.articleFamilyService.save(createArticleFamilyDto),
    );
  }

  @Put('/:id')
  @LogEvent(EVENT_TYPE.ARTICLE_FAMILY_UPDATED)
  async update(
    @Param('id') id: number,
    @Body() updateArticleFamilyDto: UpdateArticleFamilyDto,
    @Request() req: AdvancedRequest,
  ): Promise<ResponseArticleFamilyDto> {
    const articleFamily = await this.articleFamilyService.update(
      id,
      updateArticleFamilyDto,
    );
    req.logInfo = { id: articleFamily.id, title: articleFamily.title };
    return toDto(
      ResponseArticleFamilyDto,
      await this.articleFamilyService.update(id, updateArticleFamilyDto),
    );
  }

  @Delete('/:id')
  @LogEvent(EVENT_TYPE.ARTICLE_FAMILY_DELETED)
  async delete(
    @Param('id') id: number,
    @Request() req: AdvancedRequest,
  ): Promise<ResponseArticleFamilyDto> {
    const articleFamily = await this.articleFamilyService.softDelete(id);
    req.logInfo = { id: articleFamily.id, title: articleFamily.title };
    return toDto(
      ResponseArticleFamilyDto,
      await this.articleFamilyService.softDelete(id),
    );
  }
}
