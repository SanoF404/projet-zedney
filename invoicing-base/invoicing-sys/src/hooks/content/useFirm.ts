import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/api';

const useFirm = (id?: number, enabled: boolean = true) => {
  const { isPending: isFetchFirmPending, data: firmResp } = useQuery({
    queryKey: ['firm', id],
    queryFn: () => api.core.enterprise.findById(id!),
    enabled: !!id && enabled
  });

  const firm = React.useMemo(() => firmResp ?? null, [firmResp]);

  return { firm, isFetchFirmPending };
};

export default useFirm;
