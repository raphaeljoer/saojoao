import { VoteDto } from '../../../../../core/server/domain/dto/vote.dto.type';
import { fail, success } from '../../../../../core/shared/errors/either';
import { Vote } from '../../../domain/entities/vote';
import { VoteRepositoryInterface } from '../../repository/vote.repository.interface';
import {
  AddVoteUsecaseInterface,
  AddVoteUsecaseOutput
} from './add-vote-usecase.interface';

type Props = {
  voteRepositoryAuditLog01: VoteRepositoryInterface;
  voteRepositoryAuditLog02: VoteRepositoryInterface;
};
export class AddVoteUsecase implements AddVoteUsecaseInterface {
  private readonly voteRepositoryAuditLog01: VoteRepositoryInterface;
  private readonly voteRepositoryAuditLog02: VoteRepositoryInterface;

  constructor(props: Props) {
    this.voteRepositoryAuditLog01 = props.voteRepositoryAuditLog01;
    this.voteRepositoryAuditLog02 = props.voteRepositoryAuditLog02;
  }

  async execute(voteDto: VoteDto): Promise<AddVoteUsecaseOutput> {
    console.time('[AddVoteUsecase].execute');

    const voteResult = Vote.create(voteDto);

    if (voteResult.isFailure()) {
      return fail(voteResult.value);
    }

    const vote = voteResult.value.toJSON();

    const auditLogResult01 = await this.voteRepositoryAuditLog01.add(vote);

    if (auditLogResult01.isFailure()) {
      return fail(auditLogResult01.value);
    }

    const auditLogResult02 = await this.voteRepositoryAuditLog02.add(vote);

    if (auditLogResult02.isFailure()) {
      return fail(auditLogResult02.value);
    }

    console.timeEnd('[AddVoteUsecase].execute');
    return success(voteDto);
  }
}
