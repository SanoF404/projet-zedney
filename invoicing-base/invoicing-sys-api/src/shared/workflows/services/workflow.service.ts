import { BadRequestException, Injectable } from '@nestjs/common';
import { getNextSnapshot } from 'xstate';

@Injectable()
export class AbstractWorkflowService<S, E> {
  machine: any;
  constructor(
    machine: any,
    private readonly eventsEnum: Record<string, E>,
  ) {
    this.machine = machine;
  }

  canTransition(currentStatus: S, event: E): boolean {
    const snapshot = this.machine.resolveState({
      value: currentStatus,
    });
    return snapshot.can({ type: event });
  }

  transition(currentStatus: S, event: E): S {
    const snapshot = this.machine.resolveState({
      value: currentStatus,
    });

    if (!snapshot.can({ type: event })) {
      throw new BadRequestException(
        `Cannot perform '${event}' with status '${currentStatus}'`,
      );
    }

    const nextSnapshot = getNextSnapshot(this.machine, snapshot, {
      type: event as any,
    });
    return nextSnapshot.value as S;
  }

  getNextSteps(currentStatus: S): { label: string }[] {
    const snapshot = this.machine.resolveState({
      value: currentStatus,
    });

    const allEvents = Object.values(this.eventsEnum) as E[];

    return allEvents
      .filter((event) => snapshot.can({ type: event as any }))
      .map((event) => ({ label: event.toString() }));
  }

  isUpdatable(currentStatus: S): boolean {
    const snapshot = this.machine.resolveState({
      value: currentStatus,
    });

    const meta = snapshot.getMeta();

    // pick the first (and only) meta entry
    const stateMeta = Object.values(meta)[0] as
      | { isUpdatable?: boolean }
      | undefined;

    return stateMeta?.isUpdatable ?? false;
  }
}
