export const templateTypesSeed = [
  {
    code: 'invoice',
    name: 'Invoice',
    variables: [
      {
        key: 'enterprise.name',
        label: 'Enterprise Name',
        description: 'The name of your company',
      },
      {
        key: 'enterprise.address',
        label: 'Enterprise Address',
        description: 'Your company address',
      },
      {
        key: 'enterprise.contact',
        label: 'Enterprise Contact',
        description: 'Your contact information',
      },
      {
        key: 'client.name',
        label: 'Client Name',
        description: 'The name of the client',
      },
      {
        key: 'client.address',
        label: 'Client Address',
        description: 'The address of the client',
      },
      {
        key: 'client.email',
        label: 'Client Email',
        description: 'The email of the client',
      },
      {
        key: 'client.taxId',
        label: 'Client Tax ID',
        description: 'The tax identification number of the client',
      },
      {
        key: 'invoice.number',
        label: 'Invoice Number',
        description: 'The generated invoice number',
      },
      {
        key: 'invoice.issueDate',
        label: 'Issue Date',
        description: 'The date the invoice was issued',
      },
      {
        key: 'invoice.dueDate',
        label: 'Due Date',
        description: 'The date the invoice is due',
      },
      {
        key: 'invoice.subtotal',
        label: 'Subtotal',
        description: 'The total amount before taxes and discounts',
      },
      {
        key: 'invoice.taxTotal',
        label: 'Tax Total',
        description: 'The total tax amount',
      },
      {
        key: 'invoice.discountTotal',
        label: 'Discount Total',
        description: 'The total discount amount',
      },
      {
        key: 'invoice.grandTotal',
        label: 'Grand Total',
        description: 'The final total amount to be paid',
      },
      {
        key: 'invoice.notes',
        label: 'Notes',
        description: 'Any additional notes on the invoice',
      },
      {
        key: 'items',
        label: 'Line Items',
        description: 'Array of invoice items for table generation',
      },
      {
        key: 'items.description',
        label: 'Item Description',
        description: 'The description of the line item',
      },
      {
        key: 'items.quantity',
        label: 'Item Quantity',
        description: 'The quantity of the line item',
      },
      {
        key: 'items.unitPrice',
        label: 'Item Unit Price',
        description: 'The unit price of the line item',
      },
      {
        key: 'items.total',
        label: 'Item Total',
        description: 'The total price for the line item',
      },
    ],
  },
  {
    code: 'quotation',
    name: 'Quotation',
    variables: [
      {
        key: 'enterprise.name',
        label: 'Enterprise Name',
        description: 'Legal or trading name of the issuing organization',
      },
      {
        key: 'enterprise.address',
        label: 'Enterprise Address',
        description: 'Registered or operational address',
      },
      {
        key: 'enterprise.contact',
        label: 'Enterprise Contact',
        description: 'Primary contact details',
      },
      {
        key: 'client.name',
        label: 'Client Name',
        description: 'Legal or registered name of the customer',
      },
      {
        key: 'client.address',
        label: 'Client Address',
        description: 'Billing or official address of the client',
      },
      {
        key: 'client.email',
        label: 'Client Email',
        description: 'Primary email address',
      },
      {
        key: 'client.taxId',
        label: 'Client Tax ID',
        description: 'Government-issued tax identification number',
      },
      {
        key: 'quotation.number',
        label: 'Quotation Number',
        description: 'Unique system-generated identifier',
      },
      {
        key: 'quotation.issueDate',
        label: 'Issue Date',
        description: 'Official date when the quotation was generated',
      },
      {
        key: 'quotation.validUntil',
        label: 'Valid Until',
        description:
          'Expiration date after which the quotation is no longer valid',
      },
      {
        key: 'quotation.subtotal',
        label: 'Subtotal',
        description: 'Total amount before applying taxes, discounts',
      },
      {
        key: 'quotation.taxTotal',
        label: 'Tax Total',
        description: 'Aggregate tax amount',
      },
      {
        key: 'quotation.discountTotal',
        label: 'Discount Total',
        description: 'Total value of all discounts',
      },
      {
        key: 'quotation.grandTotal',
        label: 'Grand Total',
        description: 'Final payable amount',
      },
      {
        key: 'quotation.notes',
        label: 'Notes',
        description: 'Supplementary remarks, terms, or conditions',
      },
      {
        key: 'items',
        label: 'Line Items',
        description: 'Collection of individual products or services',
      },
      {
        key: 'items.description',
        label: 'Item Description',
        description: 'Detailed description of the product',
      },
      {
        key: 'items.quantity',
        label: 'Item Quantity',
        description: 'Number of units',
      },
      {
        key: 'items.unitPrice',
        label: 'Item Unit Price',
        description: 'Price per single unit',
      },
      {
        key: 'items.total',
        label: 'Item Total',
        description: 'Computed total for the line item',
      },
    ],
  },
];
