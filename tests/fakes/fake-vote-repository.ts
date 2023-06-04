import {
  AddRepositoryOutput,
  CountByIdRepositoryOutput,
  CountTotalRepositoryOutput,
  GetAllRepositoryOutput,
  VoteRepositoryInterface
} from '../../src/core/server/application/repository/vote.repository.interface';
import { SerializedVote } from '../../src/core/server/domain/entities/vote';
import { AddRepositoryError } from '../../src/core/server/infra/database/repositories/errors/AddRepositoryError';
import { GetAllRepositoryError } from '../../src/core/server/infra/database/repositories/errors/AuditVotesRepositoryError';
import { CountByIdRepositoryError } from '../../src/core/server/infra/database/repositories/errors/CountByIdRepositoryError';
import { CountTotalRepositoryError } from '../../src/core/server/infra/database/repositories/errors/CountTotalRepositoryError';
import { fail, success } from './../../src/core/shared/errors/either';

export class FakeVoteRepository implements VoteRepositoryInterface {
  private votes: SerializedVote[] = [];

  async add(vote: SerializedVote): Promise<AddRepositoryOutput> {
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

  async getAll(): Promise<GetAllRepositoryOutput> {
    try {
      return success(this.votes);
    } catch (e) {
      return fail(new GetAllRepositoryError());
    }
  }
}
