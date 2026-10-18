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
import { ArticleService } from '../services/article.service';
import { toDto, toDtoArray } from 'src/shared/database/utils/dtos';
import { ResponseArticleDto } from '../dtos/article/article.response.dto';
import { CreateArticleDto } from '../dtos/article/article.create.dto';
import { UpdateArticleDto } from '../dtos/article/article.update.dto';
import { LogInterceptor } from 'src/shared/logger/decorators/logger.interceptor';
import { LogEvent } from 'src/shared/logger/decorators/log-event.decorator';
import { EVENT_TYPE } from 'src/shared/logger/enums/event-type.enum';
import { AdvancedRequest } from 'src/types';

@ApiTags('article')
@ApiBearerAuth('access_token')
@UseInterceptors(LogInterceptor)
@UseInterceptors(ClassSerializerInterceptor)
@Controller({ version: '1', path: '/article' })
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('/all')
  async findAll(@Query() options: IQueryObject): Promise<ResponseArticleDto[]> {
    return toDtoArray(
      ResponseArticleDto,
      await this.articleService.findAll(options),
    );
  }

  @Get('/list')
  @ApiPaginatedResponse(ResponseArticleDto)
  async findAllPaginated(
    @Query() query: IQueryObject,
  ): Promise<PageDto<ResponseArticleDto>> {
    const paginated = await this.articleService.findAllPaginated(query);
    return {
      ...paginated,
      data: toDtoArray(ResponseArticleDto, paginated.data),
    };
  }

  @Get('/:id')
  async findOneById(@Param('id') id: number): Promise<ResponseArticleDto> {
    return toDto(ResponseArticleDto, await this.articleService.findOneById(id));
  }

  @Post('')
  @LogEvent(EVENT_TYPE.ARTICLE_CREATED)
  async save(
    @Body() createArticleDto: CreateArticleDto,
    @Request() req: AdvancedRequest,
  ): Promise<ResponseArticleDto> {
    const article = await this.articleService.save(createArticleDto);
    req.logInfo = { id: article.id, title: article.title };
    return toDto(ResponseArticleDto, article);
  }

  @Put('/:id')
  @LogEvent(EVENT_TYPE.ARTICLE_UPDATED)
  async update(
    @Param('id') id: number,
    @Body() updateArticleDto: UpdateArticleDto,
    @Request() req: AdvancedRequest,
  ): Promise<ResponseArticleDto> {
    const article = await this.articleService.update(id, updateArticleDto);
    req.logInfo = { id: article.id, title: article.title };
    return toDto(ResponseArticleDto, article);
  }

  @Delete('/:id')
  @LogEvent(EVENT_TYPE.ARTICLE_DELETED)
  async delete(
    @Param('id') id: number,
    @Request() req: AdvancedRequest,
  ): Promise<ResponseArticleDto> {
    const article = await this.articleService.softDelete(id);
    req.logInfo = { id: article.id, title: article.title };
    return toDto(ResponseArticleDto, article);
  }
}
