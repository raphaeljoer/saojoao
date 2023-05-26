import { VoteInputType } from '@/core/client/adapters/types/api-gateway.type';
import { coreClient } from '@/core/main-client';
import { UseMutationOptions, useMutation } from 'react-query';

type Options =
  | Omit<
      UseMutationOptions<void, unknown, VoteInputType, unknown>,
      'mutationFn'
    >
  | undefined;

export const useAddVoteMutation = (options?: Options) => {
  return useMutation(
    (input: VoteInputType) => coreClient.api.addVote(input),
    options
  );
};
