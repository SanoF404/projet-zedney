import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PageDto } from 'src/shared/database/dtos/database.page.dto';
import { ResponseTaxRateDto } from '../dtos/tax-rate.response.dto';
import { IQueryObject } from 'src/shared/database/interfaces/database-query-options.interface';
import { LogInterceptor } from 'src/shared/logger/decorators/logger.interceptor';
import { ApiPaginatedResponse } from 'src/shared/database/decorators/api-paginated-resposne.decorator';
import { TaxRateService } from '../services/tax-rate.service';
import { toDto, toDtoArray } from 'src/shared/database/utils/dtos';
import { UpdateTaxRateDto } from '../dtos/tax-rate.update.dto';
import { CreateTaxRateDto } from '../dtos/tax-rate.create.dto';
import { LogEvent } from 'src/shared/logger/decorators/log-event.decorator';
import { EVENT_TYPE } from 'src/shared/logger/enums/event-type.enum';
import { AdvancedRequest } from 'src/types';

@ApiTags('tax-rate')
@Controller({ version: '1', path: '/tax-rate' })
@UseInterceptors(LogInterceptor)
@UseInterceptors(ClassSerializerInterceptor)
export class TaxRateController {
  constructor(private readonly taxRateService: TaxRateService) {}
  @Get('/all')
  async findAll(@Query() options: IQueryObject): Promise<ResponseTaxRateDto[]> {
    return toDtoArray(
      ResponseTaxRateDto,
      await this.taxRateService.findAll(options),
    );
  }

  @Get('/list')
  @ApiPaginatedResponse(ResponseTaxRateDto)
  async findAllPaginated(
    @Query() query: IQueryObject,
  ): Promise<PageDto<ResponseTaxRateDto>> {
    const paginated = await this.taxRateService.findAllPaginated(query);
    return {
      ...paginated,
      data: toDtoArray(ResponseTaxRateDto, paginated.data),
    };
  }

  @Get('/:id')
  async findOneById(@Param('id') id: number): Promise<ResponseTaxRateDto> {
    return toDto(ResponseTaxRateDto, await this.taxRateService.findOneById(id));
  }

  @Post('')
  @LogEvent(EVENT_TYPE.TAX_RATE_CREATED)
  async save(
    @Body() createTaxRateDto: CreateTaxRateDto,
    @Request() req: AdvancedRequest,
  ): Promise<ResponseTaxRateDto> {
    const taxRate = await this.taxRateService.save(createTaxRateDto);
    req.logInfo = { id: taxRate.id, label: taxRate.label };
    return toDto(ResponseTaxRateDto, taxRate);
  }

  @Put('/:id')
  @LogEvent(EVENT_TYPE.TAX_RATE_UPDATED)
  async update(
    @Param('id') id: number,
    @Body() updateTaxRateDto: UpdateTaxRateDto,
    @Request() req: AdvancedRequest,
  ): Promise<ResponseTaxRateDto> {
    const taxRate = await this.taxRateService.update(id, updateTaxRateDto);
    req.logInfo = { id: taxRate.id, label: taxRate.label };
    return toDto(ResponseTaxRateDto, taxRate);
  }

  @Delete('/:id')
  @LogEvent(EVENT_TYPE.TAX_RATE_DELETED)
  async delete(
    @Param('id') id: number,
    @Request() req: AdvancedRequest,
  ): Promise<ResponseTaxRateDto> {
    const taxRate = await this.taxRateService.softDelete(id);
    req.logInfo = { id: taxRate.id, label: taxRate.label };
    return toDto(ResponseTaxRateDto, taxRate);
  }
}
