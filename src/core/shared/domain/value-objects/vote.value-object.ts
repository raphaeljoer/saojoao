import { Either, fail, success } from '../../errors/either';
import { MissingParamError } from '../../errors/missing-params.error';

type Props = {
  artistId: string;
  votedAt: string;
  ip: string | string[] | undefined;
};

export class Vote {
  private readonly _artistId: string;
  private readonly _votedAt: string;
  private readonly _ip: string | string[] | undefined;

  private constructor(props: Props) {
    this._artistId = props.artistId;
    this._votedAt = props.votedAt;
    this._ip = props.ip;
    Object.freeze(this);
  }

  static create(props: Props): Either<MissingParamError, Vote> {
    const validade = this.validate(props);
    if (validade.isFailure()) return fail(validade.value);

    const vote = new Vote({
      artistId: props.artistId,
      votedAt: props.votedAt,
      ip: props.ip
    });

    return success(vote);
  }

  static validate(props: Props): Either<MissingParamError, true> {
    if (!props.artistId) return fail(new MissingParamError('artistId'));
    if (!props.votedAt) return fail(new MissingParamError('votedAt'));
    if (!props.ip) return fail(new MissingParamError('ip'));
    return success(true);
  }

  get artistId(): string {
    return this._artistId;
  }

  get votedAt(): string {
    return this._votedAt;
  }

  get ip(): string | string[] | undefined {
    return this._ip;
  }
}
