import { SystemSettings } from '@/components/settings/SystemSettings';
import { TaxRatesPortal } from '@/components/content-management/tax-rates/TaxRatesPortal';

export default function Page() {
  return (
    <SystemSettings>
      <TaxRatesPortal />
    </SystemSettings>
  );
}
