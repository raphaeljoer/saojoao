import { SerializedArtist } from '@/core/shared/domain/entities/artist';
import { Either } from '@/core/shared/errors/either';
import { UnexpectedError } from '../../errors/unexpected-error';
import { UseCaseInterface } from '../usecase.interface';

export type GetResultUsecaseOutput = Either<
  UnexpectedError,
  SerializedArtist[]
>;
export type GetResultUsecaseInterface = UseCaseInterface<
  void,
  GetResultUsecaseOutput
>;
