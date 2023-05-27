import { Either } from '@/core/shared/errors/either';
import { VoteDto } from '../../../shared/domain/dto/vote.dto.type';
import { AddVoteRepositoryError } from '../../infra/database/repositories/errors/AddVoteRepositoryError';

export type CountByIdRepositoryInput = {
  key: keyof VoteDto;
  value: string;
};

export type AddVoteRepositoryOutput = Either<AddVoteRepositoryError, VoteDto>;

export interface VoteRepositoryInterface {
  addVote: (input: VoteDto) => Promise<AddVoteRepositoryOutput>;
  countVotesTotal: () => Promise<number>;
  countVotes: (input: CountByIdRepositoryInput) => Promise<number>;
}
