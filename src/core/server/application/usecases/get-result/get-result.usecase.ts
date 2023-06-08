import { VoteRepositoryAuditLogInterface } from '@/core/server/infra/database/repositories/vote-repository-audit-log-redis';
import { artistProps } from '../../../../../core/shared/data/artists';
import { fail, success } from '../../../../../core/shared/errors/either';
import { Artist } from '../../../domain/entities/artist';
import { Result } from '../../../domain/entities/result';
import {
  GetResultUsecaseInput,
  GetResultUsecaseInterface,
  GetResultUsecaseOutput
} from './get-result-usecase.interface';

type Props = {
  voteRepositoryAuditLog: VoteRepositoryAuditLogInterface;
};

type Input = GetResultUsecaseInput;
type Output = GetResultUsecaseOutput;

export class GetResultUsecase implements GetResultUsecaseInterface {
  private readonly voteRepositoryAuditLog: VoteRepositoryAuditLogInterface;

  constructor(props: Props) {
    this.voteRepositoryAuditLog = props.voteRepositoryAuditLog;
  }

  async execute({ presenter }: Input): Promise<Output> {
    console.time('[GetResultUsecase].execute');
    const artists = artistProps.map((props) => new Artist(props));
    const partialResult = await this.voteRepositoryAuditLog.partialResult();

    if (partialResult.isFailure()) {
      return fail(partialResult.value);
    }

    const { total, ...artistCounts } = partialResult.value;

    for (const artist of artists) {
      const count = artistCounts[artist.artistId] || 0;
      artist.setVotesCount(count);
    }

    const result = new Result({ artists, totalVotesCount: total });

    console.timeEnd('[GetResultUsecase].execute');
    return success(presenter.present(result));
  }
}
