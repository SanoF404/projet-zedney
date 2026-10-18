import React from 'react';
import { api } from '@/api';
import { useQuery } from '@tanstack/react-query';

interface useCountryProps {
  enabled?: boolean;
}

export const useCountries = ({ enabled = true }: useCountryProps = { enabled: true }) => {
  const {
    data: countriesResp,
    isPending: isFetchCountriesPending,
    refetch: refetchCountries
  } = useQuery({
    queryKey: ['countries'],
    queryFn: () =>
      api.admin.refParam.findAll({
        filter: 'refTypeId||$eq||country'
      }),
    enabled
  });

  const countries = React.useMemo(() => {
    if (!countriesResp) return [];
    return countriesResp.map((country) => {
      const extras = country.extras as { alpha2Code?: string; alpha3Code?: string } | undefined;
      return {
        id: country.id,
        alpha2Code: extras?.alpha2Code || country.label,
        alpha3Code: extras?.alpha3Code
      };
    });
  }, [countriesResp]);

  return {
    countries,
    isFetchCountriesPending,
    refetchCountries
  };
};
