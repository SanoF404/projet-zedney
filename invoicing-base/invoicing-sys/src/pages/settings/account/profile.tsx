import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { api } from '@/api';
import { InformationalSettings } from '@/components/settings/InformationalSettings';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Spinner } from '@/components/shared';
import { useCurrentUser } from '@/hooks/content/user/useCurrentUser';
import { UpdateUserDto } from '@/types';

export default function Page() {
  const { t } = useTranslation('settings');
  const { user, isFetchUserPending, refetchUser } = useCurrentUser();
  const [form, setForm] = React.useState<UpdateUserDto>({});

  React.useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        username: user.username || '',
        phone: user.phone || '',
        bio: user.bio || ''
      });
    }
  }, [user]);

  const { mutate: saveProfile, isPending } = useMutation({
    mutationFn: (data: UpdateUserDto) => api.admin.user.update(user!.id, data),
    onSuccess: async () => {
      await refetchUser();
      toast.success(t('profile.saved'));
    },
    onError: () => toast.error(t('profile.save_error'))
  });

  const set = (key: keyof UpdateUserDto, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  return (
    <InformationalSettings>
      <Card>
        <CardHeader><CardTitle>{t('profile.title')}</CardTitle></CardHeader>
        <CardContent>
          {isFetchUserPending ? (
            <div className="py-8 text-center text-muted-foreground">{t('profile.loading')}</div>
          ) : user ? (
            <form className="space-y-5" onSubmit={(event) => { event.preventDefault(); saveProfile(form); }}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2"><Label htmlFor="profile-firstName">{t('profile.first_name')}</Label><Input id="profile-firstName" value={form.firstName || ''} onChange={(e) => set('firstName', e.target.value)} /></div>
                <div className="space-y-2"><Label htmlFor="profile-lastName">{t('profile.last_name')}</Label><Input id="profile-lastName" value={form.lastName || ''} onChange={(e) => set('lastName', e.target.value)} /></div>
                <div className="space-y-2"><Label htmlFor="profile-username">{t('profile.username')}</Label><Input id="profile-username" value={form.username || ''} onChange={(e) => set('username', e.target.value)} /></div>
                <div className="space-y-2"><Label htmlFor="profile-email">{t('profile.email')}</Label><Input id="profile-email" value={user.email || ''} disabled /></div>
                <div className="space-y-2"><Label htmlFor="profile-phone">{t('profile.phone')}</Label><Input id="profile-phone" value={form.phone || ''} onChange={(e) => set('phone', e.target.value)} /></div>
              </div>
              <div className="space-y-2"><Label htmlFor="profile-bio">{t('profile.bio')}</Label><Textarea id="profile-bio" value={form.bio || ''} onChange={(e) => set('bio', e.target.value)} /></div>
              <div className="flex justify-end"><Button type="submit" disabled={isPending || isFetchUserPending}>{t('profile.save')}<Spinner className="ml-2" size="small" show={isPending} /></Button></div>
            </form>
          ) : (
            <p className="py-8 text-center text-muted-foreground">{t('profile.load_error')}</p>
          )}
        </CardContent>
      </Card>
    </InformationalSettings>
  );
}
