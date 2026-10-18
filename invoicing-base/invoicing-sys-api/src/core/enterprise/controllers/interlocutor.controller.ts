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
import { toDto, toDtoArray } from 'src/shared/database/utils/dtos';
import { CreateInterlocutorDto } from '../dtos/interlocutor/interlocutor.create.dto';
import { UpdateInterlocutorDto } from '../dtos/interlocutor/interlocutor.update.dto';
import { InterlocutorService } from '../services/interlocutor.service';
import { ResponseInterlocutorDto } from '../dtos/interlocutor/interlocutor.response.dto';

@ApiTags('interlocutor')
@ApiBearerAuth('access_token')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(LogInterceptor)
@Controller({ version: '1', path: '/interlocutor' })
export class InterlocutorController {
  constructor(private readonly interlocutorService: InterlocutorService) {}

  @Get('/all')
  async findAll(
    @Query() options: IQueryObject,
  ): Promise<ResponseInterlocutorDto[]> {
    return toDtoArray(
      ResponseInterlocutorDto,
      await this.interlocutorService.findAll(options),
    );
  }

  @Get('/list')
  @ApiPaginatedResponse(ResponseInterlocutorDto)
  async findAllPaginated(
    @Query() query: IQueryObject,
  ): Promise<PageDto<ResponseInterlocutorDto>> {
    const paginated = await this.interlocutorService.findAllPaginated(query);
    return {
      ...paginated,
      data: toDtoArray(ResponseInterlocutorDto, paginated.data),
    };
  }

  @Get('/enterprise/:enterpriseId')
  async findByEnterpriseId(
    @Param('enterpriseId') enterpriseId: number,
  ): Promise<ResponseInterlocutorDto[]> {
    return toDtoArray(
      ResponseInterlocutorDto,
      await this.interlocutorService.findByEnterpriseId(enterpriseId),
    );
  }

  @Get('/:id')
  async findOneById(@Param('id') id: number): Promise<ResponseInterlocutorDto> {
    return toDto(
      ResponseInterlocutorDto,
      await this.interlocutorService.findOneById(id),
    );
  }

  @Post('')
  @LogEvent(EVENT_TYPE.INTERLOCUTOR_CREATED)
  async save(
    @Body() createInterlocutorDto: CreateInterlocutorDto,
    @Request() req: AdvancedRequest,
  ): Promise<ResponseInterlocutorDto> {
    const interlocutor = await this.interlocutorService.save(
      createInterlocutorDto,
    );
    req.logInfo = { id: interlocutor.id };
    return interlocutor;
  }

  @Put('/:id')
  @LogEvent(EVENT_TYPE.INTERLOCUTOR_UPDATED)
  async update(
    @Param('id') id: number,
    @Body() updateInterlocutorDto: UpdateInterlocutorDto,
    @Request() req: AdvancedRequest,
  ): Promise<ResponseInterlocutorDto> {
    req.logInfo = { id };
    return this.interlocutorService.update(id, updateInterlocutorDto);
  }

  @Delete('/:id')
  @LogEvent(EVENT_TYPE.INTERLOCUTOR_DELETED)
  async delete(
    @Param('id') id: number,
    @Request() req: AdvancedRequest,
  ): Promise<ResponseInterlocutorDto> {
    req.logInfo = { id };
    return this.interlocutorService.softDelete(id);
  }
}
