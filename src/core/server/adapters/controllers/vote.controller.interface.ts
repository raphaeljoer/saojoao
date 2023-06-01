import { VoteDto } from '@/core/server/domain/dto/vote.dto.type';
import { SerializedArtist } from '@/core/server/domain/entities/artist';
import { Either } from '@/core/shared/errors/either';
import { MissingParamsError } from '@/core/shared/errors/missing-params.error';
import { CountByIdRepositoryError } from '../../infra/database/repositories/errors/CountByIdRepositoryError';
import { CountTotalRepositoryError } from '../../infra/database/repositories/errors/CountTotalRepositoryError';

export type AddVoteControllerInput = {
  vote: VoteDto;
  recaptchaTokenV2: string;
  recaptchaTokenV3: string;
};

export type AddVoteControllerOutPut = Either<MissingParamsError, VoteDto>;
export type GetResultControllerOutPut = Either<
  CountByIdRepositoryError | CountTotalRepositoryError,
  SerializedArtist[]
>;
export interface VoteControllerInterface {
  addVote(input: AddVoteControllerInput): Promise<AddVoteControllerOutPut>;
  getResult(): Promise<GetResultControllerOutPut>;
}
