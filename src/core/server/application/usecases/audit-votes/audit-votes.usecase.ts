import { artistProps } from '../../../../../core/shared/data/artists';
import { fail, success } from '../../../../../core/shared/errors/either';
import { Artist } from '../../../domain/entities/artist';
import { Result } from '../../../domain/entities/result';
import { VoteRepositoryInterface } from '../../repository/vote.repository.interface';
import {
  AuditVotesUsecaseInput,
  AuditVotesUsecaseInterface,
  AuditVotesUsecaseOutput
} from './audit-votes.usecase.interface';

type Props = {
  voteRepositoryAuditLog: VoteRepositoryInterface;
};

type Input = AuditVotesUsecaseInput;
type Output = AuditVotesUsecaseOutput;
export class AuditVotesUsecase implements AuditVotesUsecaseInterface {
  private readonly voteRepositoryAuditLog: VoteRepositoryInterface;

  constructor(props: Props) {
    this.voteRepositoryAuditLog = props.voteRepositoryAuditLog;
  }

  async execute({ presenter }: Input): Promise<Output> {
    console.time('[AuditVotesUsecase].execute');

    const artists = artistProps.map((props) => new Artist(props));
    const totalVotesCount = await this.voteRepositoryAuditLog.countTotal();

    if (totalVotesCount.isFailure()) {
      return fail(totalVotesCount.value);
    }

    for (const artist of artists) {
      const votesCount = await this.voteRepositoryAuditLog.countById(artist.artistId); //prettier-ignore

      if (votesCount.isFailure()) {
        return fail(votesCount.value);
      }

      artist.setVotesCount(votesCount.value);
    }

    const result = new Result({
      artists,
      totalVotesCount: totalVotesCount.value
    });

    console.timeEnd('[AuditVotesUsecase].execute');
    return success(presenter.present(result));
  }
}
