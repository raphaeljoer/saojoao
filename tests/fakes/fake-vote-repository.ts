import {
  AddVoteRepositoryOutput,
  CountByIdRepositoryInput,
  VoteRepositoryInterface
} from './../../src/core/server/application/repository/vote.repository.interface';
import { AddVoteRepositoryError } from './../../src/core/server/infra/database/repositories/errors/AddVoteRepositoryError';
import { VoteDto } from './../../src/core/shared/domain/dto/vote.dto.type';
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

  async countVotesTotal(): Promise<number> {
    return this.votes.length;
  }

  async countVotes(input: CountByIdRepositoryInput): Promise<number> {
    return this.votes.filter((vote) => vote[input.key] === input.value).length;
  }
}
