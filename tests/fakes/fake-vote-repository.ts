import {
  CountByIdInput,
  VoteRepositoryInterface
} from '@/core/server/application/repository/vote.repository.interface';
import { VoteDTO } from '@/core/server/domain/dto/vote.dto.type';

export class FakeVoteRepository implements VoteRepositoryInterface {
  private votes: VoteDTO[] = [];

  async addVote(vote: VoteDTO): Promise<void> {
    this.votes.push(vote);
  }

  async countVotesTotal(): Promise<number> {
    return this.votes.length;
  }

  async countVotes(input: CountByIdInput): Promise<number> {
    return this.votes.filter((vote) => vote[input.key] === input.value).length;
  }
}
