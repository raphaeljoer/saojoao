import { ResultPresenterInterface } from '@/core/server/adapters/presenter/result/result.presenter.interface';
import { CountTotalRepositoryError } from '@/core/server/infra/database/repositories/errors/CountTotalRepositoryError';
import { Either } from '@/core/shared/errors/either';
import { CountByIdRepositoryError } from '../../../infra/database/repositories/errors/CountByIdRepositoryError';
import { UseCaseInterface } from '../usecase.interface';
import { AuditViewArtist } from './../../../domain/entities/artist';

export type GetAuditResultUsecaseOutput = Either<
  CountByIdRepositoryError | CountTotalRepositoryError,
  AuditViewArtist[]
>;

export type GetAuditResultUsecaseInput = {
  presenter: ResultPresenterInterface;
};

export type GetAuditResultUsecaseInterface = UseCaseInterface<
  GetAuditResultUsecaseInput,
  GetAuditResultUsecaseOutput
>;
