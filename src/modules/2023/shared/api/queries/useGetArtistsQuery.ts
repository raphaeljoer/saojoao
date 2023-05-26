import { coreClient } from '@/core/main-client';
import { useQuery } from 'react-query';

export const useGetArtistsQuery = () => {
  return useQuery('@getArtists', () => coreClient.api.getArtists());
};
