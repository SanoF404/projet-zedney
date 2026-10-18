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
import { toDto, toDtoArray } from 'src/shared/database/utils/dtos';
import { LogInterceptor } from 'src/shared/logger/decorators/logger.interceptor';
import { LogEvent } from 'src/shared/logger/decorators/log-event.decorator';
import { EVENT_TYPE } from 'src/shared/logger/enums/event-type.enum';
import { AdvancedRequest } from 'src/types';
import { TemplateService } from '../services/template.service';
import { ResponseTemplateDto } from '../dtos/template/response-template.dto';
import { CreateTemplateDto } from '../dtos/template/create-template.dto';
import { UpdateTemplateDto } from '../dtos/template/update-template.dto';

@ApiTags('template')
@ApiBearerAuth('access_token')
@UseInterceptors(LogInterceptor)
@UseInterceptors(ClassSerializerInterceptor)
@Controller({ version: '1', path: '/template' })
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Get('/all')
  async findAll(
    @Query() options: IQueryObject,
  ): Promise<ResponseTemplateDto[]> {
    return toDtoArray(
      ResponseTemplateDto,
      await this.templateService.findAll(options),
    );
  }

  @Get('/list')
  @ApiPaginatedResponse(ResponseTemplateDto)
  async findAllPaginated(
    @Query() query: IQueryObject,
  ): Promise<PageDto<ResponseTemplateDto>> {
    const paginated = await this.templateService.findAllPaginated(query);
    return {
      ...paginated,
      data: toDtoArray(ResponseTemplateDto, paginated.data),
    };
  }

  @Get('/:id')
  async findOneById(@Param('id') id: string): Promise<ResponseTemplateDto> {
    return toDto(
      ResponseTemplateDto,
      await this.templateService.findOneById(id),
    );
  }

  @Post('')
  @LogEvent(EVENT_TYPE.TEMPLATE_CREATED)
  async save(
    @Body() createTemplateDto: CreateTemplateDto,
    @Request() req: AdvancedRequest,
  ): Promise<ResponseTemplateDto> {
    const template = await this.templateService.save(createTemplateDto);
    req.logInfo = { id: template.id, name: template.name };
    return toDto(ResponseTemplateDto, template);
  }

  @Put('/:id')
  @LogEvent(EVENT_TYPE.TEMPLATE_UPDATED)
  async update(
    @Param('id') id: string,
    @Body() updateTemplateDto: UpdateTemplateDto,
    @Request() req: AdvancedRequest,
  ): Promise<ResponseTemplateDto> {
    const template = await this.templateService.update(id, updateTemplateDto);
    req.logInfo = { id: template.id, name: template.name };
    return toDto(ResponseTemplateDto, template);
  }

  @Delete('/:id')
  @LogEvent(EVENT_TYPE.TEMPLATE_DELETED)
  async delete(
    @Param('id') id: string,
    @Request() req: AdvancedRequest,
  ): Promise<ResponseTemplateDto> {
    const template = await this.templateService.softDelete(id);
    req.logInfo = { id: template.id, name: template.name };
    return toDto(ResponseTemplateDto, template);
  }
}
