import { VoteDto } from '../../../../../core/server/domain/dto/vote.dto.type';
import { fail, success } from '../../../../../core/shared/errors/either';
import { Vote } from '../../../domain/value-objects/vote.value-object';
import { VoteRepositoryInterface } from '../../repository/vote.repository.interface';
import {
  AddVoteUsecaseInterface,
  AddVoteUsecaseOutput
} from './add-vote-usecase.interface';

type Props = {
  voteRepositoryCounter: VoteRepositoryInterface;
  voteRepositoryAuditLog: VoteRepositoryInterface;
};
export class AddVoteUsecase implements AddVoteUsecaseInterface {
  private readonly voteRepositoryAuditLog: VoteRepositoryInterface;
  private readonly voteRepositoryCounter: VoteRepositoryInterface;

  constructor(props: Props) {
    this.voteRepositoryCounter = props.voteRepositoryCounter;
    this.voteRepositoryAuditLog = props.voteRepositoryAuditLog;
  }

  async execute(voteDto: VoteDto): Promise<AddVoteUsecaseOutput> {
    console.time('[AddVoteUsecase].execute');

    const voteResult = Vote.create(voteDto);

    if (voteResult.isFailure()) {
      return fail(voteResult.value);
    }

    const vote = voteResult.value.toJSON();

    const auditLogResult = await this.voteRepositoryAuditLog.add(vote);

    if (auditLogResult.isFailure()) {
      return fail(auditLogResult.value);
    }

    const counterResult = await this.voteRepositoryCounter.add(vote);

    if (counterResult.isFailure()) {
      return fail(counterResult.value);
    }

    console.timeEnd('[AddVoteUsecase].execute');
    return success(voteDto);
  }
}
