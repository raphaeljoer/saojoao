import { Either } from '@/core/shared/errors/either';
import { VoteDto } from '../../../shared/domain/dto/vote.dto.type';
import { AddVoteRepositoryError } from '../../infra/database/repositories/errors/AddVoteRepositoryError';
import { CountTotalVotesRepositoryError } from '../../infra/database/repositories/errors/CountTotalVotesRepositoryError';
import { CountVotesRepositoryError } from '../../infra/database/repositories/errors/CountVotesRepositoryError';

export type CountByIdRepositoryInput = { key: keyof VoteDto; value: string };
export type AddVoteRepositoryOutput = Either<AddVoteRepositoryError, VoteDto>;
export type CountVotesRepositoryOutput = Either<CountVotesRepositoryError, number>; //prettier-ignore
export type CountTotalVotesRepositoryOutput = Either<CountTotalVotesRepositoryError, number>; //prettier-ignore

export interface VoteRepositoryInterface {
  addVote: (input: VoteDto) => Promise<AddVoteRepositoryOutput>;
  countVotesTotal: () => Promise<CountTotalVotesRepositoryOutput>;
  countVotes: (input: CountByIdRepositoryInput) => Promise<CountVotesRepositoryOutput>; //prettier-ignore
}
