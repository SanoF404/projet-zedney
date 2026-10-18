import { QuotationStatus } from '../enums/quotation-status.enum';
import { QuotationEvent } from '../enums/quotation-event.enum';
import { AbstractWorkflowService } from 'src/shared/workflows/services/workflow.service';
import { quotationMachine } from '../workflow/quotation.workflow';
import { QuotationService } from './quotation.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QuotationWorkflowService extends AbstractWorkflowService<
  QuotationStatus,
  QuotationEvent
> {
  constructor(private readonly quotationService: QuotationService) {
    super(quotationMachine, QuotationEvent);
  }

  async findOneById(id: number, join?: string) {
    const quotation = await this.quotationService.findOneById(id, join);
    return {
      status: quotation.status,
      isUpdatable: this.isUpdatable(quotation.status),
      isPrintable: this.isPrintable(quotation.status),
      nextSteps: this.getNextSteps(quotation.status),
      quotation,
    };
  }

  async next(id: number, event: QuotationEvent) {
    const quotation = await this.quotationService.findOneById(id);
    const newStatus = this.transition(quotation.status, event);
    await this.quotationService.save({ id: quotation.id, status: newStatus });
    return this.findOneById(id);
  }

  isPrintable(currentStatus: QuotationStatus): boolean {
    const snapshot = this.machine.resolveState({
      value: currentStatus,
    });

    const meta = snapshot.getMeta();

    // pick the first (and only) meta entry
    const stateMeta = Object.values(meta)[0] as
      | { isPrintable?: boolean }
      | undefined;

    return stateMeta?.isPrintable ?? false;
  }
}
