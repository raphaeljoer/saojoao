import { Either, fail, success } from '../../../shared/errors/either';
import { MissingParamsError } from '../../../shared/errors/missing-params.error';
import { ParamValidation } from '../../../shared/validations/param.validation';
import { VoteDto } from '../dto/vote.dto.type';
import { IpValidationError } from '../errors/ip-validation.error';
import { VotedAtExpiredError } from '../errors/voted-at-expired.error';
import { VotedAtInvalidDateError } from '../errors/voted-at-invalid-date.error';
import { VotedAtOutsidePeriodError } from '../errors/voted-at-outside-period.error';
import { Ip } from '../value-objects/ip.value-object';
import { VotedAt } from '../value-objects/voted-at.value-object';
import { Entity } from './entity';

export type SerializedVote = VoteDto & {
  id: string;
};

export type VoteCreateOutput = Either<
  | MissingParamsError
  | VotedAtInvalidDateError
  | VotedAtExpiredError
  | VotedAtOutsidePeriodError
  | IpValidationError,
  Vote
>;

export class Vote extends Entity {
  public readonly artistId: string;
  public readonly votedAt: string;
  public readonly score: number;
  public readonly ip: string | string[] | undefined;

  private constructor(voteDto: VoteDto) {
    super();
    this.artistId = voteDto.artistId;
    this.votedAt = voteDto.votedAt;
    this.score = voteDto.score || 0;
    this.ip = voteDto.ip;
    Object.freeze(this);
  }

  static create(voteDto: VoteDto): VoteCreateOutput {
    const validade = ParamValidation.validateObject(voteDto);

    if (validade.isFailure()) {
      return fail(validade.value);
    }

    const votedAt = VotedAt.create({
      votedAt: new Date(voteDto.votedAt),
      currentDate: new Date(),
      votingStartDate: new Date(process.env.VOTING_DATE_START || ''),
      votingEndDate: new Date(process.env.VOTING_DATE_END || '')
    });

    const ip = Ip.create(voteDto.ip);

    if (ip.isFailure()) {
      return fail(ip.value);
    }

    if (votedAt.isFailure()) {
      return fail(votedAt.value);
    }

    const vote = new Vote({
      artistId: voteDto.artistId,
      votedAt: votedAt.value.toISOString(),
      score: voteDto.score,
      ip: ip.value
    });

    return success(vote);
  }

  toJSON(): SerializedVote {
    return {
      id: this.id,
      artistId: this.artistId,
      votedAt: this.votedAt,
      score: this.score,
      ip: this.ip
    };
  }
}
