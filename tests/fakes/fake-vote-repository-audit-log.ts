import {
  AddRepositoryOutput,
  CountByIdRepositoryOutput,
  CountTotalRepositoryOutput
} from '../../src/core/server/application/repository/vote.repository.interface';
import { VoteDto } from '../../src/core/server/domain/dto/vote.dto.type';
import { AddRepositoryError } from '../../src/core/server/infra/database/repositories/errors/AddRepositoryError';
import { CountByIdRepositoryError } from '../../src/core/server/infra/database/repositories/errors/CountByIdRepositoryError';
import { CountTotalRepositoryError } from '../../src/core/server/infra/database/repositories/errors/CountTotalRepositoryError';
import { PartialResultError } from '../../src/core/server/infra/database/repositories/errors/PartialResultError';
import {
  PartialResultOutput,
  VoteRepositoryAuditLogInterface
} from '../../src/core/server/infra/database/repositories/vote-repository-audit-log-redis';
import { fail, success } from '../../src/core/shared/errors/either';

//prettier-ignore
export class FakeVoteRepositoryAuditLog implements VoteRepositoryAuditLogInterface {
  private votes: VoteDto[] = [];

  async add(vote: VoteDto): Promise<AddRepositoryOutput> {
    try {
      this.votes.push(vote);
      return success(vote);
    } catch (e) {
      return fail(new AddRepositoryError('FakeVoteRepository'));
    }
  }

  async countTotal(): Promise<CountTotalRepositoryOutput> {
    try {
      const totalVotes = this.votes.length;
      return success(totalVotes);
    } catch (e) {
      return fail(new CountTotalRepositoryError());
    }
  }

  async countById(artistId: string): Promise<CountByIdRepositoryOutput> {
    try {
      const count = this.votes.filter((vote) => vote.artistId === artistId).length; //prettier-ignore
      return success(count);
    } catch (e) {
      return fail(new CountByIdRepositoryError());
    }
  }

  async partialResult(): Promise<PartialResultOutput> {
    try {
      const artists: Record<string, number> = {};

      for (const vote of this.votes) {
        const { artistId } = vote;
        if (!artists[artistId]) artists[artistId] = 0;
        artists[artistId] += 1;
      }

      const result = { ...artists, total: this.votes.length };
      return success(result);
    } catch (e) {
      return fail(new PartialResultError());
    }
  }
}
