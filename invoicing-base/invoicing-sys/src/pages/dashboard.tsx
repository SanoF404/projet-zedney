import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowRight,
  ArrowUpRight,
  FilePlus2,
  FileText,
  LoaderCircle,
  Plus,
  ReceiptText,
  UsersRound,
  Wallet
} from 'lucide-react';
import { api } from '@/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBreadcrumb } from '@/context/BreadcrumbContext';
import { useIntro } from '@/context/IntroContext';
import { useTranslation } from 'react-i18next';
import type { Invoice, Payment } from '@/types';

const formatDate = (value: string | undefined, locale: string) => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric' }).format(
    date
  );
};

const formatAmount = (amount: number | undefined, currency?: string, locale = 'fr') => {
  const value = Number(amount || 0);
  if (currency) {
    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        maximumFractionDigits: 2
      }).format(value);
    } catch {
      // Fall back to a plain amount when the server returns an unsupported currency code.
    }
  }
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(value);
};

const invoiceStatusClass = (status?: string) => {
  if (status?.includes('paid')) return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400';
  if (status?.includes('expired')) return 'bg-rose-500/10 text-rose-600 dark:text-rose-400';
  if (status?.includes('draft')) return 'bg-muted text-muted-foreground';
  return 'bg-amber-500/10 text-amber-700 dark:text-amber-400';
};

function InvoiceRow({ invoice, locale }: { invoice: Invoice; locale: string }) {
  const { t } = useTranslation('invoicing');
  const status = invoice.status ? t(invoice.status, { defaultValue: invoice.status }) : '—';

  return (
    <Link
      href={`/selling/invoice/${invoice.id}`}
      className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-muted/70">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <ReceiptText className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="truncate text-sm font-semibold">
            {invoice.sequential || `#${invoice.id}`}
          </span>
          <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${invoiceStatusClass(invoice.status)}`}>
            {status}
          </span>
        </span>
        <span className="mt-1 block truncate text-xs text-muted-foreground">
          {invoice.firm?.name || invoice.object || formatDate(invoice.date, locale)}
        </span>
      </span>
      <span className="whitespace-nowrap text-right">
        <span className="block text-sm font-semibold">
          {formatAmount(invoice.total, invoice.currency?.code, locale)}
        </span>
        <span className="mt-1 block text-xs text-muted-foreground">
          {formatDate(invoice.date, locale)}
        </span>
      </span>
      <ArrowUpRight className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
    </Link>
  );
}

function PaymentRow({ payment, locale }: { payment: Payment; locale: string }) {
  const { t } = useTranslation('invoicing');

  return (
    <Link
      href={`/selling/payment/${payment.id}`}
      className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-muted/70">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
        <Wallet className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold">
          {payment.firm?.name || `Payment #${payment.id}`}
        </span>
        <span className="mt-1 block truncate text-xs text-muted-foreground">
          {payment.mode ? t(payment.mode, { defaultValue: payment.mode }) : 'Payment'}
        </span>
      </span>
      <span className="whitespace-nowrap text-right">
        <span className="block text-sm font-semibold text-emerald-600 dark:text-emerald-400">
          {formatAmount(payment.amount, payment.currency?.code, locale)}
        </span>
        <span className="mt-1 block text-xs text-muted-foreground">
          {formatDate(payment.date, locale)}
        </span>
      </span>
      <ArrowUpRight className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
    </Link>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { t } = useTranslation('common');
  const { setIntro, clearIntro } = useIntro();
  const { setRoutes, clearRoutes } = useBreadcrumb();
  const locale = router.locale || 'fr';

  React.useEffect(() => {
    setIntro?.(t('dashboardPage.title'), t('dashboardPage.subtitle'));
    setRoutes?.([{ title: t('menu.dashboard.title') }]);
    return () => {
      clearIntro?.();
      clearRoutes?.();
    };
  }, [router.locale]);

  const invoicesQuery = useQuery({
    queryKey: ['dashboard', 'invoices'],
    queryFn: () => api.invoice.findPaginated(1, 5, 'DESC', 'createdAt', '', ['firm', 'currency'])
  });
  const paymentsQuery = useQuery({
    queryKey: ['dashboard', 'payments'],
    queryFn: () => api.payment.findPaginated(1, 5, 'DESC', 'createdAt', '', ['firm', 'currency'])
  });

  const actions = [
    {
      href: '/selling/new-invoice',
      title: t('dashboardPage.newInvoice'),
      detail: t('dashboardPage.newInvoiceHint'),
      icon: FilePlus2,
      color: 'bg-primary/10 text-primary'
    },
    {
      href: '/selling/new-quotation',
      title: t('dashboardPage.newQuotation'),
      detail: t('dashboardPage.newQuotationHint'),
      icon: FileText,
      color: 'bg-sky-500/10 text-sky-600 dark:text-sky-400'
    },
    {
      href: '/contacts/new-enterprise',
      title: t('dashboardPage.newClient'),
      detail: t('dashboardPage.newClientHint'),
      icon: UsersRound,
      color: 'bg-violet-500/10 text-violet-600 dark:text-violet-400'
    }
  ];

  const displayName = session?.user?.name?.trim().split(/\s+/)[0];
  const today = new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  return (
    <div className="flex-1 space-y-6 overflow-y-auto pb-8 pt-2">
      <section className="relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
        <div className="pointer-events-none absolute -right-14 -top-24 size-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 right-1/3 size-56 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="mb-2 text-sm font-medium capitalize text-muted-foreground">{today}</p>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {displayName
                ? t('dashboardPage.greeting', { name: displayName })
                : t('dashboardPage.greetingFallback')}
            </h1>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
              {t('dashboardPage.welcome')}
            </p>
          </div>
          <Link
            href="/selling/new-invoice"
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:brightness-95">
            <Plus className="size-4" />
            {t('dashboardPage.createInvoice')}
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Card className="border-0 bg-gradient-to-br from-primary/10 via-card to-card shadow-sm">
          <CardContent className="flex items-center justify-between p-5 sm:p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {t('dashboardPage.invoicesCreated')}
              </p>
              <p className="mt-2 text-3xl font-bold tabular-nums">
                {invoicesQuery.isPending ? (
                  <LoaderCircle className="size-7 animate-spin" />
                ) : invoicesQuery.isError ? (
                  '—'
                ) : (
                  invoicesQuery.data?.meta.itemCount ?? 0
                )}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{t('dashboardPage.allTime')}</p>
            </div>
            <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <ReceiptText className="size-6" />
            </span>
          </CardContent>
        </Card>
        <Card className="border-0 bg-gradient-to-br from-emerald-500/10 via-card to-card shadow-sm">
          <CardContent className="flex items-center justify-between p-5 sm:p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {t('dashboardPage.paymentsRecorded')}
              </p>
              <p className="mt-2 text-3xl font-bold tabular-nums">
                {paymentsQuery.isPending ? (
                  <LoaderCircle className="size-7 animate-spin" />
                ) : paymentsQuery.isError ? (
                  '—'
                ) : (
                  paymentsQuery.data?.meta.itemCount ?? 0
                )}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{t('dashboardPage.allTime')}</p>
            </div>
            <span className="flex size-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Wallet className="size-6" />
            </span>
          </CardContent>
        </Card>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold">{t('dashboardPage.shortcuts')}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t('dashboardPage.shortcutsHint')}</p>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {actions.map(({ href, title, detail, icon: Icon, color }) => (
            <Link key={href} href={href} className="group rounded-xl border bg-card p-4 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
              <div className="flex items-start justify-between gap-4">
                <span className={`flex size-10 items-center justify-center rounded-xl ${color}`}>
                  <Icon className="size-5" />
                </span>
                <ArrowRight className="mt-1 size-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-foreground" />
              </div>
              <p className="mt-4 font-semibold">{title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{detail}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div>
              <CardTitle className="text-base">{t('dashboardPage.recentInvoices')}</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">{t('dashboardPage.latestFive')}</p>
            </div>
            <Link href="/selling/invoices" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              {t('dashboardPage.viewAll')} <ArrowRight className="size-4" />
            </Link>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            {invoicesQuery.isPending ? (
              <LoadingRows />
            ) : invoicesQuery.isError ? (
              <div className="px-3 py-8 text-center text-sm text-muted-foreground">{t('dashboardPage.loadError')}</div>
            ) : invoicesQuery.data?.data.length ? (
              <div className="divide-y">
                {invoicesQuery.data.data.map((invoice) => (
                  <InvoiceRow key={invoice.id} invoice={invoice} locale={locale} />
                ))}
              </div>
            ) : (
              <EmptyState message={t('dashboardPage.noInvoices')} />
            )}
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div>
              <CardTitle className="text-base">{t('dashboardPage.recentPayments')}</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">{t('dashboardPage.latestFive')}</p>
            </div>
            <Link href="/selling/payments" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              {t('dashboardPage.viewAll')} <ArrowRight className="size-4" />
            </Link>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            {paymentsQuery.isPending ? (
              <LoadingRows />
            ) : paymentsQuery.isError ? (
              <div className="px-3 py-8 text-center text-sm text-muted-foreground">{t('dashboardPage.loadError')}</div>
            ) : paymentsQuery.data?.data.length ? (
              <div className="divide-y">
                {paymentsQuery.data.data.map((payment) => (
                  <PaymentRow key={payment.id} payment={payment} locale={locale} />
                ))}
              </div>
            ) : (
              <EmptyState message={t('dashboardPage.noPayments')} />
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function LoadingRows() {
  return (
    <div className="space-y-2 px-3 py-2" aria-label="Loading">
      {[0, 1, 2].map((row) => (
        <div key={row} className="flex animate-pulse items-center gap-3 py-3">
          <span className="size-10 rounded-xl bg-muted" />
          <span className="flex-1 space-y-2">
            <span className="block h-3 w-2/3 rounded bg-muted" />
            <span className="block h-3 w-1/3 rounded bg-muted" />
          </span>
          <span className="h-4 w-20 rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-10 text-center">
      <span className="flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <ReceiptText className="size-5" />
      </span>
      <p className="mt-3 text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
