import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LogInterceptor } from 'src/shared/logger/decorators/logger.interceptor';
import { toDto } from 'src/shared/database/utils/dtos';
import { QuotationWorkflowService } from '../services/quotation-workflow.service';
import { ResponseQuotationWorkflowDto } from '../dtos/quotation/response-quotation-workflow.dto';
import { UpdateQuotationStatusDto } from '../dtos/quotation/update-quotation-status.dto';

@ApiTags('quotation-workflow')
@ApiBearerAuth('access_token')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(LogInterceptor)
@Controller({
  version: '1',
  path: '/quotation-workflow',
})
export class QuotationWorkflowController {
  constructor(
    private readonly quotationWorkflowService: QuotationWorkflowService,
  ) {}

  @Get(':id')
  async findOneById(
    @Param('id') id: number,
    @Query('join') join?: string,
  ): Promise<ResponseQuotationWorkflowDto | null> {
    return toDto(
      ResponseQuotationWorkflowDto,
      await this.quotationWorkflowService.findOneById(id, join),
    );
  }

  @Post(':id/next')
  async next(
    @Param('id') id: number,
    @Body() updateQuotationStatusDto: UpdateQuotationStatusDto,
  ): Promise<ResponseQuotationWorkflowDto> {
    const updatedQuotation = await this.quotationWorkflowService.next(
      id,
      updateQuotationStatusDto.event,
    );
    return toDto(ResponseQuotationWorkflowDto, updatedQuotation);
  }
}
