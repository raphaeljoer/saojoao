import { VoteDto } from '../../../../../core/server/domain/dto/vote.dto.type';
import { fail, success } from '../../../../../core/shared/errors/either';
import { Vote } from '../../../domain/value-objects/vote.value-object';
import { VoteRepositoryInterface } from '../../repository/vote.repository.interface';
import { VoteQueueInterface } from './../../../infra/queue/vote.queue';
import {
  AddVoteUsecaseInterface,
  AddVoteUsecaseOutput
} from './add-vote-usecase.interface';

type Props = {
  voteRepositoryCounter: VoteRepositoryInterface;
  voteRepositoryAuditLog: VoteRepositoryInterface;
  voteQueue: VoteQueueInterface;
};
export class AddVoteUsecase implements AddVoteUsecaseInterface {
  private readonly voteRepositoryAuditLog: VoteRepositoryInterface;
  private readonly voteRepositoryCounter: VoteRepositoryInterface;
  private readonly voteQueue: VoteQueueInterface;

  constructor(props: Props) {
    this.voteRepositoryCounter = props.voteRepositoryCounter;
    this.voteRepositoryAuditLog = props.voteRepositoryAuditLog;
    this.voteQueue = props.voteQueue;
  }

  async execute(voteDto: VoteDto): Promise<AddVoteUsecaseOutput> {
    console.time('[AddVoteUsecase].execute');

    const voteResult = Vote.create(voteDto);

    if (voteResult.isFailure()) {
      return fail(voteResult.value);
    }

    const vote = voteResult.value.toJSON();

    const counterResult = await this.voteRepositoryCounter.add(vote);

    if (counterResult.isFailure()) {
      return fail(counterResult.value);
    }

    const auditLogResult = await this.voteRepositoryAuditLog.add(vote);

    if (auditLogResult.isFailure()) {
      return fail(auditLogResult.value);
    }

    const queueResult = await this.voteQueue.pub({
      message: JSON.stringify(vote)
    });

    if (queueResult.isFailure()) {
      return fail(queueResult.value);
    }

    console.timeEnd('[AddVoteUsecase].execute');
    return success(voteDto);
  }
}
