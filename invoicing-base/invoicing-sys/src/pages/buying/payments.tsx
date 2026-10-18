import { PaymentMain } from '@/components/selling/payment/PaymentMain';

export default function BuyingPaymentsPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden py-4">
      <PaymentMain section="buying" className="flex min-h-0 flex-1 flex-col overflow-hidden" />
    </div>
  );
}
