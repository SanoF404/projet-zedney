import React from 'react';
import { useTheme } from 'next-themes';
import { useTranslation } from 'react-i18next';
import { Monitor, Moon, Sun } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useBreadcrumb } from '@/context/BreadcrumbContext';
import { useRouter } from 'next/router';

const themeOptions = [
  { value: 'light', icon: Sun, label: 'light' },
  { value: 'dark', icon: Moon, label: 'dark' },
  { value: 'system', icon: Monitor, label: 'system' }
] as const;

export default function Page() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { t: tSettings } = useTranslation('settings');
  const { t: tCommon } = useTranslation('common');
  const router = useRouter();
  const { setRoutes } = useBreadcrumb();

  React.useEffect(() => {
    setRoutes([
      { title: tCommon('menu.settings') },
      { title: tCommon('menu.settings.subs.other') }
    ]);
  }, [router.locale, setRoutes, tCommon]);

  const selectedTheme = theme === 'system' ? 'system' : (resolvedTheme ?? theme);

  return (
    <main className="m-5 flex-1 lg:mx-10">
      <div className="mb-6 space-y-1">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{tSettings('other.title')}</h1>
        <p className="text-muted-foreground">{tSettings('other.description')}</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{tCommon('app_settings.theme')}</CardTitle>
          <CardDescription>{tSettings('other.appearance_description')}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          {themeOptions.map(({ value, icon: Icon, label }) => (
            <Button
              key={value}
              type="button"
              variant={selectedTheme === value ? 'default' : 'outline'}
              onClick={() => setTheme(value)}
              aria-pressed={selectedTheme === value}>
              <Icon className="mr-2 size-4" />
              {tCommon(`app_settings.${label}`)}
            </Button>
          ))}
        </CardContent>
      </Card>
    </main>
  );
}
