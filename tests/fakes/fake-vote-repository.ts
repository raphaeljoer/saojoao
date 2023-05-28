import {
  AddVoteRepositoryOutput,
  CountByIdRepositoryInput,
  CountTotalVotesRepositoryOutput,
  CountVotesRepositoryOutput,
  VoteRepositoryInterface
} from './../../src/core/server/application/repository/vote.repository.interface';
import { AddVoteRepositoryError } from './../../src/core/server/infra/database/repositories/errors/AddVoteRepositoryError';
import { CountTotalVotesRepositoryError } from './../../src/core/server/infra/database/repositories/errors/CountTotalVotesRepositoryError';
import { CountVotesRepositoryError } from './../../src/core/server/infra/database/repositories/errors/CountVotesRepositoryError';
import { VoteDto } from '../../src/core/server/domain/dto/vote.dto.type';
import { fail, success } from './../../src/core/shared/errors/either';

export class FakeVoteRepository implements VoteRepositoryInterface {
  private votes: VoteDto[] = [];

  async addVote(vote: VoteDto): Promise<AddVoteRepositoryOutput> {
    try {
      this.votes.push(vote);
      return success(vote);
    } catch (e) {
      return fail(new AddVoteRepositoryError());
    }
  }

  async countVotesTotal(): Promise<CountTotalVotesRepositoryOutput> {
    try {
      const totalVotes = this.votes.length;
      return success(totalVotes);
    } catch (e) {
      return fail(new CountTotalVotesRepositoryError());
    }
  }

  async countVotes(
    input: CountByIdRepositoryInput
  ): Promise<CountVotesRepositoryOutput> {
    try {
      const count = this.votes.filter((vote) => vote[input.key] === input.value).length; //prettier-ignore
      return success(count);
    } catch (e) {
      return fail(new CountVotesRepositoryError());
    }
  }
}
