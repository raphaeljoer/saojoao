import { VoteDto } from '@/core/shared/domain/dto/vote.dto.type';
import { Either } from '@/core/shared/errors/either';
import { MissingParamsError } from '@/core/shared/errors/missing-params.error';

export type AddVoteControllerInput = {
  vote: VoteDto;
  recaptchaTokenV2: string;
  recaptchaTokenV3: string;
};

export type AddVoteControllerOutPut = Either<MissingParamsError, VoteDto>;

export interface VoteControllerInterface {
  addVote(input: AddVoteControllerInput): Promise<AddVoteControllerOutPut>;
  getResult(req: any, res: any): Promise<void>;
}
