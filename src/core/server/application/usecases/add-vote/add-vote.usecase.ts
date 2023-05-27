import { VoteDto } from '@/core/shared/domain/dto/vote.dto.type';
import { Vote } from '../../../../../../src/core/shared/domain/value-objects/vote.value-object';
import { fail, success } from '../../../../../core/shared/errors/either';
import { VoteRepositoryInterface } from '../../repository/vote.repository.interface';
import {
  AddVoteUsecaseInterface,
  AddVoteUsecaseOutput
} from './add-vote-usecase.interface';

type Props = {
  voteRepository: VoteRepositoryInterface;
};
export class AddVoteUsecase implements AddVoteUsecaseInterface {
  private readonly voteRepository: VoteRepositoryInterface;

  constructor(private readonly props: Props) {
    this.voteRepository = this.props.voteRepository;
  }

  async execute(voteDto: VoteDto): Promise<AddVoteUsecaseOutput> {
    const vote = Vote.create(voteDto);
    if (vote.isFailure()) {
      return fail(vote.value);
    }
    const result = await this.voteRepository.addVote(vote.value.toJSON());
    if (result.isFailure()) {
      return fail(result.value);
    }

    return success(voteDto);
  }
}
