import { ResultPresenterInterface } from '@/core/server/adapters/presenter/result/result.presenter.interface';
import { AuditViewArtist } from '@/core/server/domain/entities/artist';
import { CountTotalRepositoryError } from '@/core/server/infra/database/repositories/errors/CountTotalRepositoryError';
import { Either } from '@/core/shared/errors/either';
import { CountByIdRepositoryError } from '../../../infra/database/repositories/errors/CountByIdRepositoryError';
import { UseCaseInterface } from '../usecase.interface';

export type AuditVotesUsecaseInput = {
  presenter: ResultPresenterInterface;
};
export type AuditVotesUsecaseOutput = Either<CountByIdRepositoryError | CountTotalRepositoryError, AuditViewArtist[]>; //prettier-ignore
export type AuditVotesUsecaseInterface = UseCaseInterface<AuditVotesUsecaseInput, AuditVotesUsecaseOutput>; //prettier-ignore
