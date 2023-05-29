import { VoteDto } from '@/core/server/domain/dto/vote.dto.type';
import { fail, success } from '../../../../../core/shared/errors/either';
import { Vote } from '../../../domain/value-objects/vote.value-object';
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

  constructor(props: Props) {
    this.voteRepository = props.voteRepository;
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
