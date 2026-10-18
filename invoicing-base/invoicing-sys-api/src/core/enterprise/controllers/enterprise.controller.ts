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
  Request,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PageDto } from 'src/shared/database/dtos/database.page.dto';
import { IQueryObject } from 'src/shared/database/interfaces/database-query-options.interface';
import { LogInterceptor } from 'src/shared/logger/decorators/logger.interceptor';
import { LogEvent } from 'src/shared/logger/decorators/log-event.decorator';
import { ApiPaginatedResponse } from 'src/shared/database/decorators/api-paginated-resposne.decorator';
import { AdvancedRequest } from 'src/types';
import { EVENT_TYPE } from 'src/shared/logger/enums/event-type.enum';
import { EnterpriseService } from '../services/enterprise.service';
import { toDto, toDtoArray } from 'src/shared/database/utils/dtos';
import { ResponseEnterpriseDto } from '../dtos/enterprise/enterprise.response.dto';
import { CreateEnterpriseDto } from '../dtos/enterprise/enterprise.create.dto';
import { UpdateEnterpriseDto } from '../dtos/enterprise/enterprise.update.dto';

@ApiTags('enterprise')
@ApiBearerAuth('access_token')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(LogInterceptor)
@Controller({ version: '1', path: '/enterprise' })
export class EnterpriseController {
  constructor(private readonly enterpriseService: EnterpriseService) {}

  @Get('/all')
  async findAll(
    @Query() options: IQueryObject,
  ): Promise<ResponseEnterpriseDto[]> {
    return toDtoArray(
      ResponseEnterpriseDto,
      await this.enterpriseService.findAll(options),
    );
  }

  @Get('/list')
  @ApiPaginatedResponse(ResponseEnterpriseDto)
  async findAllPaginated(
    @Query() query: IQueryObject,
  ): Promise<PageDto<ResponseEnterpriseDto>> {
    const paginated = await this.enterpriseService.findAllPaginated(query);
    return {
      ...paginated,
      data: toDtoArray(ResponseEnterpriseDto, paginated.data),
    };
  }

  @Get('/:id')
  async findOneById(
    @Param('id') id: number,
    @Query() query: IQueryObject,
  ): Promise<ResponseEnterpriseDto> {
    return toDto(
      ResponseEnterpriseDto,
      await this.enterpriseService.findOneById(id, query?.join),
    );
  }

  @Post('')
  @LogEvent(EVENT_TYPE.ENTERPRISE_CREATED)
  async save(
    @Body() createEnterpriseDto: CreateEnterpriseDto,
    @Request() req: AdvancedRequest,
  ): Promise<ResponseEnterpriseDto> {
    const enterprise = await this.enterpriseService.extendedSave(
      createEnterpriseDto,
      createEnterpriseDto.deliveryAddress,
      createEnterpriseDto.invoicingAddress,
      createEnterpriseDto.interlocutors,
    );
    req.logInfo = { id: enterprise.id };
    return enterprise;
  }

  @Put('/:id')
  @LogEvent(EVENT_TYPE.ENTERPRISE_UPDATED)
  async update(
    @Param('id') id: number,
    @Body() updateEnterpriseDto: UpdateEnterpriseDto,
    @Request() req: AdvancedRequest,
  ): Promise<ResponseEnterpriseDto> {
    req.logInfo = { id };
    return this.enterpriseService.extendedUpdate(
      id,
      updateEnterpriseDto,
      updateEnterpriseDto.deliveryAddress,
      updateEnterpriseDto.invoicingAddress,
    );
  }

  @Delete('/:id')
  @LogEvent(EVENT_TYPE.ENTERPRISE_DELETED)
  async delete(
    @Param('id') id: number,
    @Request() req: AdvancedRequest,
  ): Promise<ResponseEnterpriseDto> {
    req.logInfo = { id };
    return this.enterpriseService.softDelete(id);
  }
}
