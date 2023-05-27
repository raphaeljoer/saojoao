import { Either, fail, success } from '../../errors/either';
import { MissingParamsError } from '../../errors/missing-params.error';
import { VoteDto } from '../dto/vote.dto.type';

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
    const validade = this.validate(voteDto);
    if (validade.isFailure()) return fail(validade.value);

    const vote = new Vote({
      artistId: voteDto.artistId,
      votedAt: voteDto.votedAt,
      ip: voteDto.ip
    });

    return success(vote);
  }

  static validate(voteDto: VoteDto): Either<MissingParamsError, true> {
    if (!voteDto.artistId) return fail(new MissingParamsError('artistId'));
    if (!voteDto.votedAt) return fail(new MissingParamsError('votedAt'));
    if (!voteDto.ip) return fail(new MissingParamsError('ip'));
    return success(true);
  }

  toJSON(): VoteDto {
    return {
      artistId: this.artistId,
      votedAt: this.votedAt,
      ip: this.ip
    };
  }
}
