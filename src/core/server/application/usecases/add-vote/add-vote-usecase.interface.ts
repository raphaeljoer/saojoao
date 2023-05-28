import { VoteDto } from '@/core/server/domain/dto/vote.dto.type';
import { Either } from '@/core/shared/errors/either';
import { GoogleRecaptchaInvalidHostnameError } from '../../errors/recaptcha-invalid-hostname.error';
import { GoogleRecaptchaInvalidTokenError } from '../../errors/recaptcha-invalid-token.error';
import { UnexpectedError } from '../../errors/unexpected-error';
import { UseCaseInterface } from '../usecase.interface';

export type AddVoteUsecaseOutput = Either<
  | GoogleRecaptchaInvalidTokenError
  | GoogleRecaptchaInvalidHostnameError
  | UnexpectedError,
  VoteDto
>;

export type AddVoteUsecaseInterface = UseCaseInterface<
  VoteDto,
  AddVoteUsecaseOutput
>;
