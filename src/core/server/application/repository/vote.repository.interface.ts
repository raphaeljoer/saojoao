import { Either } from '@/core/shared/errors/either';
import { VoteDto } from '../../domain/dto/vote.dto.type';
import { AddRepositoryError } from '../../infra/database/repositories/errors/AddRepositoryError';
import { GetAllRepositoryError } from '../../infra/database/repositories/errors/AuditVotesRepositoryError';
import { CountByIdRepositoryError } from '../../infra/database/repositories/errors/CountByIdRepositoryError';
import { CountTotalRepositoryError } from '../../infra/database/repositories/errors/CountTotalRepositoryError';

export type AddRepositoryOutput = Either<AddRepositoryError, VoteDto>;
export type CountByIdRepositoryOutput = Either<CountByIdRepositoryError, number>; //prettier-ignore
export type CountTotalRepositoryOutput = Either<CountTotalRepositoryError, number>; //prettier-ignore
export type GetAllRepositoryOutput = Either<GetAllRepositoryError, VoteDto[]>; //prettier-ignore

export interface VoteRepositoryInterface {
  add(input: VoteDto): Promise<AddRepositoryOutput>;
  countTotal(): Promise<CountTotalRepositoryOutput>;
  countById(artistId: string): Promise<CountByIdRepositoryOutput>;
  getAll(): Promise<GetAllRepositoryOutput>;
}
