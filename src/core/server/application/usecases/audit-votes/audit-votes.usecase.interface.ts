import { SerializedArtist } from '@/core/server/domain/entities/artist';
import { CountTotalRepositoryError } from '@/core/server/infra/database/repositories/errors/CountTotalRepositoryError';
import { Either } from '@/core/shared/errors/either';
import { CountByIdRepositoryError } from '../../../infra/database/repositories/errors/CountByIdRepositoryError';
import { UseCaseInterface } from '../usecase.interface';

export type AuditVotesUsecaseOutput = Either<CountByIdRepositoryError | CountTotalRepositoryError, SerializedArtist[]>; //prettier-ignore
export type AuditVotesUsecaseInterface = UseCaseInterface<void, AuditVotesUsecaseOutput>; //prettier-ignore
