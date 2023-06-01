import { SerializedArtist } from '@/core/server/domain/entities/artist';
import { CountTotalRepositoryError } from '@/core/server/infra/database/repositories/errors/CountTotalRepositoryError';
import { Either } from '@/core/shared/errors/either';
import { CountByIdRepositoryError } from '../../../infra/database/repositories/errors/CountByIdRepositoryError';
import { UseCaseInterface } from '../usecase.interface';

export type GetResultUsecaseOutput = Either<
  CountByIdRepositoryError | CountTotalRepositoryError,
  SerializedArtist[]
>;
export type GetResultUsecaseInterface = UseCaseInterface<
  void,
  GetResultUsecaseOutput
>;
