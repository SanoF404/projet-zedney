import axios from './axios';
import { TaxWithholding } from '@/types';

const find = async (): Promise<TaxWithholding[]> => {
  const response = await axios.get<
    {
      id: number;
      label: string;
      createdAt: string;
      updatedAt: string;
      deletedAt?: string;
      isDeletionRestricted?: boolean;
      extras?: { rate?: number };
    }[]
  >('/ref-param/all', {
    params: { filter: 'refTypeId||$eq||tax-withholding' }
  });
  return response.data.map((parameter) => ({
    id: parameter.id,
    label: parameter.label,
    rate: parameter.extras?.rate,
    createdAt: parameter.createdAt,
    updatedAt: parameter.updatedAt,
    deletedAt: parameter.deletedAt || '',
    isDeletionRestricted: parameter.isDeletionRestricted || false
  }));
};

export const taxWithholding = { find };
