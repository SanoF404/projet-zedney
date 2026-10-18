import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { api } from '@/api';
import { useBreadcrumb } from '@/context/BreadcrumbContext';
import { useIntro } from '@/context/IntroContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2 } from 'lucide-react';

export default function BuyingWithholdingPage() {
  const router = useRouter();
  const { setRoutes, clearRoutes } = useBreadcrumb();
  const { setIntro, clearIntro } = useIntro();
  const { data: rates = [], isPending, error } = useQuery({
    queryKey: ['buying-tax-withholdings'],
    queryFn: api.taxWithholding.find
  });

  React.useEffect(() => {
    setIntro?.('Retenue à la source', 'Consultez les taux de retenue utilisés pour vos opérations.');
    setRoutes?.([
      { title: 'Achats' },
      { title: 'Retenue à la source' }
    ]);
    return () => {
      clearIntro?.();
      clearRoutes?.();
    };
  }, [router.locale]);

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-auto py-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Retenue à la source</CardTitle>
          <CardDescription>Les taux disponibles dans la configuration du cabinet.</CardDescription>
        </CardHeader>
        <CardContent>
          {error ? (
            <p className="py-6 text-sm text-destructive">Impossible de charger les taux de retenue.</p>
          ) : isPending ? (
            <div className="flex items-center gap-2 py-6 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" /> Chargement des taux…
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Libellé</TableHead>
                  <TableHead className="text-right">Taux</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rates.length ? rates.map((rate) => (
                  <TableRow key={rate.id}>
                    <TableCell>{rate.label}</TableCell>
                    <TableCell className="text-right">{rate.rate}%</TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={2} className="h-24 text-center text-muted-foreground">
                      Aucun taux de retenue configuré.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
