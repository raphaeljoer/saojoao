import { Either, fail, success } from '../../../shared/errors/either';
import { MissingParamsError } from '../../../shared/errors/missing-params.error';
import { ParamValidation } from '../../../shared/validations/param.validation';
import { VoteDto } from '../dto/vote.dto.type';
import { Ip } from './ip.value-object';
import { VotedAt } from './voted-at.value-object';

const { NEXT_PUBLIC_VOTING_DATE_START, NEXT_PUBLIC_VOTING_DATE_END } = process.env; //prettier-ignore
export class Vote {
  public readonly artistId: string;
  public readonly votedAt: string;
  public readonly ip: string | string[] | undefined;

  private constructor(voteDto: VoteDto) {
    this.artistId = voteDto.artistId;
    this.votedAt = voteDto.votedAt;
    this.ip = voteDto.ip;
  }

  static create(voteDto: VoteDto): Either<MissingParamsError, Vote> {
    const validade = ParamValidation.validateObject(voteDto);

    if (validade.isFailure()) {
      return fail(validade.value);
    }

    console.log('NEXT_PUBLIC_VOTING_DATE_START', NEXT_PUBLIC_VOTING_DATE_START);

    const votedAt = VotedAt.create({
      votedAt: new Date(voteDto.votedAt),
      currentDate: new Date(),
      votingStartDate: new Date(NEXT_PUBLIC_VOTING_DATE_START || ''),
      votingEndDate: new Date(NEXT_PUBLIC_VOTING_DATE_END || '')
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
      ip: ip.value
    });

    return success(vote);
  }

  toJSON(): VoteDto {
    return {
      artistId: this.artistId,
      votedAt: this.votedAt,
      ip: this.ip
    };
  }
}
