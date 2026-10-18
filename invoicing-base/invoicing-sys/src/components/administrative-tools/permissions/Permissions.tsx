import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { AlertCircle, KeyRound, LoaderCircle, Search } from 'lucide-react';
import { api } from '@/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useBreadcrumb } from '@/context/BreadcrumbContext';
import { useIntro } from '@/context/IntroContext';
import { useTranslation } from 'react-i18next';
import type { Permission } from '@/types/permission';

const groupPermissions = (permissions: Permission[]) => {
  return permissions.reduce<Record<string, Permission[]>>((groups, permission) => {
    const parts = (permission.label || 'OTHER').split('_');
    const entity = parts.slice(1).join('_') || 'OTHER';
    (groups[entity] ||= []).push(permission);
    return groups;
  }, {});
};

export default function Permissions() {
  const { t } = useTranslation('user-management');
  const { setRoutes, clearRoutes } = useBreadcrumb();
  const { setIntro, clearIntro } = useIntro();
  const [search, setSearch] = React.useState('');

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['admin-permissions'],
    queryFn: () => api.permission.findAll()
  });

  React.useEffect(() => {
    setRoutes?.([
      { title: t('userManagement.page.title') },
      { title: t('userManagement.page.permissions') }
    ]);
    setIntro?.(
      t('userManagement.page.permissions'),
      t('userManagement.page.permissionsDescription')
    );
    return () => {
      clearRoutes?.();
      clearIntro?.();
    };
  }, [t]);

  const filtered = React.useMemo(() => {
    const term = search.trim().toLowerCase();
    return (data || []).filter((permission) =>
      `${permission.label || ''} ${permission.description || ''}`.toLowerCase().includes(term)
    );
  }, [data, search]);

  const groups = React.useMemo(() => groupPermissions(filtered), [filtered]);

  return (
    <div className="flex-1 space-y-4 overflow-y-auto pb-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t('userManagement.page.searchPermissions')}
            className="pl-9"
          />
        </div>
        <Badge variant="secondary" className="w-fit">
          {filtered.length} {t('userManagement.page.permissionsCount')}
        </Badge>
      </div>

      {isPending ? (
        <div className="flex min-h-40 items-center justify-center text-muted-foreground">
          <LoaderCircle className="mr-2 size-5 animate-spin" />
          {t('userManagement.page.loadingPermissions')}
        </div>
      ) : isError ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
            <AlertCircle className="size-7 text-destructive" />
            <p className="text-sm text-muted-foreground">
              {t('userManagement.page.permissionsLoadError')}
            </p>
            <Button variant="outline" onClick={() => refetch()}>
              {t('userManagement.page.retry')}
            </Button>
          </CardContent>
        </Card>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center text-sm text-muted-foreground">
            {t('userManagement.page.noPermissions')}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {Object.entries(groups)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([entity, permissions]) => (
              <Card key={entity}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <KeyRound className="size-4 text-primary" />
                    {entity.replaceAll('_', ' ')}
                  </CardTitle>
                  <Badge variant="outline">{permissions.length}</Badge>
                </CardHeader>
                <CardContent className="space-y-2">
                  {permissions
                    .slice()
                    .sort((a, b) => (a.label || '').localeCompare(b.label || ''))
                    .map((permission) => {
                      const [action] = (permission.label || '').split('_');
                      return (
                        <div
                          key={permission.id ?? permission.label}
                          className="flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium">
                              {(permission.label || '').replaceAll('_', ' ')}
                            </p>
                            {permission.description && (
                              <p className="mt-0.5 text-xs text-muted-foreground">
                                {permission.description}
                              </p>
                            )}
                          </div>
                          <Badge variant="secondary">{action}</Badge>
                        </div>
                      );
                    })}
                </CardContent>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
}
