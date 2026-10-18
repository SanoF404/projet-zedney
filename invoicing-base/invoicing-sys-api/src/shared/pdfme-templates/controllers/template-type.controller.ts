import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTemplateTypeDto } from '../dtos/template-type/create-template-type.dto';
import { ResponseTemplateTypeDto } from '../dtos/template-type/response-template-type.dto';
import { UpdateTemplateTypeDto } from '../dtos/template-type/update-template-type.dto';
import { TemplateTypeService } from '../services/template-type.service';
import { IQueryObject } from 'src/shared/database/interfaces/database-query-options.interface';
import { toDtoArray, toDto } from 'src/shared/database/utils/dtos';

@ApiTags('Template Types')
@Controller({ version: '1', path: '/template-types' })
export class TemplateTypeController {
  constructor(private readonly templateTypeService: TemplateTypeService) {}

  @Get('/all')
  async findAll(
    @Query() options: IQueryObject,
  ): Promise<ResponseTemplateTypeDto[]> {
    return toDtoArray(
      ResponseTemplateTypeDto,
      await this.templateTypeService.findAll(options),
    );
  }

  @Get('/:id')
  async findOneById(@Param('id') id: string): Promise<ResponseTemplateTypeDto> {
    return toDto(
      ResponseTemplateTypeDto,
      await this.templateTypeService.findOneById(id),
    );
  }

  @Post('')
  async save(
    @Body() createDto: CreateTemplateTypeDto,
  ): Promise<ResponseTemplateTypeDto> {
    return toDto(
      ResponseTemplateTypeDto,
      await this.templateTypeService.save(createDto),
    );
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateTemplateTypeDto,
  ): Promise<ResponseTemplateTypeDto> {
    return toDto(
      ResponseTemplateTypeDto,
      await this.templateTypeService.update(id, updateDto as any),
    );
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<ResponseTemplateTypeDto> {
    return toDto(
      ResponseTemplateTypeDto,
      await this.templateTypeService.delete(id),
    );
  }
}
