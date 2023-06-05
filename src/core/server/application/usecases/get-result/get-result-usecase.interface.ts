import { ResultPresenterInterface } from '@/core/server/adapters/presenter/result/result.presenter.interface';
import { PublicViewArtist } from '@/core/server/domain/entities/artist';
import { CountTotalRepositoryError } from '@/core/server/infra/database/repositories/errors/CountTotalRepositoryError';
import { Either } from '@/core/shared/errors/either';
import { CountByIdRepositoryError } from '../../../infra/database/repositories/errors/CountByIdRepositoryError';
import { UseCaseInterface } from '../usecase.interface';

export type GetResultUsecaseInput = {
  presenter: ResultPresenterInterface;
};

export type GetResultUsecaseOutput = Either<
  CountByIdRepositoryError | CountTotalRepositoryError,
  PublicViewArtist[]
>;
export type GetResultUsecaseInterface = UseCaseInterface<
  GetResultUsecaseInput,
  GetResultUsecaseOutput
>;
