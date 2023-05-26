import { coreClient } from '@/core/main-client';
import { useQuery } from 'react-query';

export const useGetArtistQuery = (artistId: string) => {
  return useQuery(['@artist', artistId], () =>
    coreClient.api.getArtist(artistId)
  );
};
