import { Either } from '@/core/shared/errors/either';
import { SerializedVote } from '../../domain/entities/vote';
import { AddRepositoryError } from '../../infra/database/repositories/errors/AddRepositoryError';
import { GetAllRepositoryError } from '../../infra/database/repositories/errors/AuditVotesRepositoryError';
import { CountByIdRepositoryError } from '../../infra/database/repositories/errors/CountByIdRepositoryError';
import { CountTotalRepositoryError } from '../../infra/database/repositories/errors/CountTotalRepositoryError';

export type AddRepositoryOutput = Either<AddRepositoryError, SerializedVote>;
export type CountByIdRepositoryOutput = Either<CountByIdRepositoryError, number>; //prettier-ignore
export type CountTotalRepositoryOutput = Either<CountTotalRepositoryError, number>; //prettier-ignore
export type GetAllRepositoryOutput = Either<GetAllRepositoryError, SerializedVote[]>; //prettier-ignore

export interface VoteRepositoryInterface {
  add(input: SerializedVote): Promise<AddRepositoryOutput>;
  countTotal(): Promise<CountTotalRepositoryOutput>;
  countById(artistId: string): Promise<CountByIdRepositoryOutput>;
  getAll(): Promise<GetAllRepositoryOutput>;
}
