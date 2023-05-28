import { CountTotalVotesRepositoryError } from '@/core/server/infra/database/repositories/errors/CountTotalVotesRepositoryError';
import { SerializedArtist } from '@/core/shared/domain/entities/artist';
import { Either } from '@/core/shared/errors/either';
import { UseCaseInterface } from '../usecase.interface';
import { CountVotesRepositoryError } from './../../../infra/database/repositories/errors/CountVotesRepositoryError';

export type GetResultUsecaseOutput = Either<
  CountVotesRepositoryError | CountTotalVotesRepositoryError,
  SerializedArtist[]
>;
export type GetResultUsecaseInterface = UseCaseInterface<
  void,
  GetResultUsecaseOutput
>;
