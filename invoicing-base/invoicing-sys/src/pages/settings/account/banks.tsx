import { BankAccountPortal } from '@/components/content-management/bank-accounts/BankAccountPortal';
import { InformationalSettings } from '@/components/settings/InformationalSettings';

export default function Page() {
  return (
    <InformationalSettings>
      <BankAccountPortal />
    </InformationalSettings>
  );
}
