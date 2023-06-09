import { coreClient } from '@/core/main-client';
import { useQuery } from 'react-query';

export const useGetAuditResultQuery = () => {
  return useQuery('@getAuditResult', () => coreClient.api.getAuditResult(), {
    refetchOnWindowFocus: true
  });
};
