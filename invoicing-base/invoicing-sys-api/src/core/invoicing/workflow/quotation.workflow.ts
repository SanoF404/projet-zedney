import { setup } from 'xstate';

export const quotationMachine = setup({
  types: {
    context: {} as { IsUpdatable: boolean },
    events: {} as
      | { type: 'Validate' }
      | { type: 'Send' }
      | { type: 'Invalidate' }
      | { type: 'Accept' }
      | { type: 'Reject' }
      | { type: 'To Invoice' }
      | { type: 'Revive' },
  },
}).createMachine({
  context: {
    IsUpdatable: true,
    IsPrintable: true,
  },
  id: 'Quotation Flow',
  initial: 'Draft',
  states: {
    Draft: {
      on: {
        Validate: {
          target: 'Validated',
        },
        Send: {
          target: 'Sent',
        },
      },
      meta: {
        isUpdatable: true,
        isPrintable: false,
      },
    },
    Validated: {
      on: {
        Send: {
          target: 'Sent',
        },
      },
      meta: {
        isUpdatable: true,
        isPrintable: true,
      },
    },
    Sent: {
      on: {
        Invalidate: {
          target: 'Draft',
        },
        Accept: {
          target: 'Accepted',
        },
        Reject: {
          target: 'Rejected',
        },
      },
      meta: {
        isUpdatable: false,
        isPrintable: true,
      },
    },
    Accepted: {
      on: {
        'To Invoice': {
          target: 'Invoiced',
        },
      },
      meta: {
        isUpdatable: false,
        isPrintable: true,
      },
    },
    Rejected: {
      on: {
        Revive: {
          target: 'Draft',
        },
      },
      meta: {
        isUpdatable: false,
        isPrintable: false,
      },
    },
    Invoiced: {
      type: 'final',
      meta: {
        isUpdatable: false,
        isPrintable: true,
      },
    },
  },
});
