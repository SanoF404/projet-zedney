# Automatic Variable Insertion for PDFMe Templates

This document outlines the conceptual strategy for defining and automatically inserting variables into `pdfme` templates across the invoicing system.

## The Goal

To allow users to create rich PDF templates using the `pdfme` editor, where dynamic system data (like Invoice Numbers, Client Names, and Totals) is automatically injected during document generation without manual intervention.

## 1. Standardized Variable Dictionaries

To ensure consistent mapping between our database entities and the `pdfme` template fields, we need to define strict, standardized variable dictionaries based on the `TemplateType` (`INVOICE` or `QUOTATION`).

### Proposed Invoice Variables (`TemplateType.INVOICE`)

- **Enterprise Info:**
  - `enterprise.name`
  - `enterprise.logo` (Image field)
  - `enterprise.address`
  - `enterprise.contact`
- **Client Info:**
  - `client.name`
  - `client.address`
  - `client.email`
  - `client.taxId`
- **Invoice Details:**
  - `invoice.number`
  - `invoice.issueDate`
  - `invoice.dueDate`
  - `invoice.subtotal`
  - `invoice.taxTotal`
  - `invoice.discountTotal`
  - `invoice.grandTotal`
  - `invoice.notes`
- **Line Items (Table/Array):**
  - `items` (Array for pdfme table)
    - `items.description`
    - `items.quantity`
    - `items.unitPrice`
    - `items.total`

### Proposed Quotation Variables (`TemplateType.QUOTATION`)

- **Enterprise & Client Info:** (Same as Invoice)
- **Quotation Details:**
  - `quotation.number`
  - `quotation.issueDate`
  - `quotation.validUntil`
  - `quotation.subtotal`
  - `quotation.grandTotal`
  - `quotation.notes`
- **Line Items:** (Same as Invoice)

## 2. Frontend Integration (Template Builder)

Currently, users design templates using the `PDFEditor` component in `CreateTemplateForm` and `UpdateTemplateForm`.

### Proposed Enhancements:

1. **Variable Picker/Sidebar:** Introduce a UI panel alongside the `pdfme` editor that lists the available variables for the selected `TemplateType`.
2. **Field Naming Constraints:** When a user drags a text field onto the canvas, they should map its "name" property to one of the standard variables (e.g., naming a field exactly `client.name`).
3. **Type-Aware Validation:** The form could optionally validate that the template's defined fields (`variables` JSON in the database) correspond to the allowed dictionary for that `TemplateType`.

## 3. Backend Generation & Data Mapping

When the system needs to generate the final PDF (e.g., downloading an invoice):

1. The backend fetches the `TemplateEntity` (which contains the base PDF and the `pdfme` schema).
2. The backend fetches the actual data entity (e.g., `InvoiceEntity` and its relations).
3. A **Mapper Utility** translates the complex `InvoiceEntity` into a flat or structured JSON object that exactly matches the Variable Dictionary keys.
4. This mapped object is passed as the `inputs` array to the `pdfme` generator alongside the template schema.

## Open Questions

> [!WARNING]
> Please review and provide your thoughts on the following questions to help refine the idea:

1. **Naming Convention:** Do you prefer flat naming (e.g., `invoice_number`, `client_name`) or nested object naming (e.g., `invoice.number`, `client.name`)? `pdfme` supports both, but flat strings are sometimes easier to manage in UI dropdowns.
2. **Custom Variables:** Should users be allowed to define their own custom fields (e.g., for custom notes), or should they be strictly limited to the variables we provide?
3. **Table Generation:** Invoices and Quotations have line items. `pdfme` handles tables differently than simple text fields. Have you already experimented with `pdfme` tables, or should we include a custom plugin/approach for dynamic line items?

## Next Steps

Once we agree on the variable structure and answers to the open questions, we can:

1. Create a `constants/template-variables.ts` file holding the predefined variables.
2. Update the `PDFEditor` component to display these variables as a helper list or drag-and-drop items.
3. Build the data mapping utility for PDF generation.
