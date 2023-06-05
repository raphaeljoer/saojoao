import { VoteDto } from '@/core/server/domain/dto/vote.dto.type';
import { PublicViewArtist } from '@/core/server/domain/entities/artist';
import { Either } from '@/core/shared/errors/either';
import { MissingParamsError } from '@/core/shared/errors/missing-params.error';
import { CountByIdRepositoryError } from '../../infra/database/repositories/errors/CountByIdRepositoryError';
import { CountTotalRepositoryError } from '../../infra/database/repositories/errors/CountTotalRepositoryError';
import { AuditViewArtist } from './../../domain/entities/artist';

export type AddVoteControllerInput = {
  vote: VoteDto;
  recaptchaTokenV2: string;
  recaptchaTokenV3: string;
};

export type AddVoteControllerOutPut = Either<MissingParamsError, VoteDto>;
export type GetResultControllerOutPut = Either<CountByIdRepositoryError | CountTotalRepositoryError, PublicViewArtist[]>; //prettier-ignore
export type GetAuditResultControllerOutPut = Either<CountByIdRepositoryError | CountTotalRepositoryError, AuditViewArtist[]>; //prettier-ignore
export type AuditVotesControllerOutPut = Either<CountByIdRepositoryError | CountTotalRepositoryError, PublicViewArtist[]>; //prettier-ignore
export interface VoteControllerInterface {
  addVote(input: AddVoteControllerInput): Promise<AddVoteControllerOutPut>;
  getResult(): Promise<GetResultControllerOutPut>;
  getAuditResult(): Promise<GetAuditResultControllerOutPut>;
  auditVotes(): Promise<AuditVotesControllerOutPut>;
}
