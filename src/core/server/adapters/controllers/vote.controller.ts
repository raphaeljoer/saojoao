import { fail, success } from '../../../../../src/core/shared/errors/either';
import { ParamValidation } from '../../../../../src/core/shared/validations/param.validation';
import { VerifyRecaptchaServiceInterface } from '../../application/service/verify-recaptcha.service.interface';
import { AddVoteUsecaseInterface } from '../../application/usecases/add-vote/add-vote-usecase.interface';
import { AuditVotesUsecaseInterface } from '../../application/usecases/audit-votes/audit-votes.usecase.interface';
import { GetResultUsecaseInterface } from '../../application/usecases/get-result/get-result-usecase.interface';
import { VoteDto } from '../../domain/dto/vote.dto.type';
import {
  AddVoteControllerInput,
  AddVoteControllerOutPut,
  AuditVotesControllerOutPut,
  GetResultControllerOutPut,
  VoteControllerInterface
} from './vote.controller.interface';

type Props = {
  addVoteUseCase: AddVoteUsecaseInterface;
  getResultUsecase: GetResultUsecaseInterface;
  auditVotesUsecase: AuditVotesUsecaseInterface;
  verifyRecaptchaService: VerifyRecaptchaServiceInterface;
};
export class VoteController implements VoteControllerInterface {
  private readonly addVoteUsecase: AddVoteUsecaseInterface;
  private readonly getResultUsecase: GetResultUsecaseInterface;
  private readonly verifyRecaptchaService: VerifyRecaptchaServiceInterface;
  private readonly auditVotesUsecase: AuditVotesUsecaseInterface;

  constructor(props: Props) {
    this.addVoteUsecase = props.addVoteUseCase;
    this.getResultUsecase = props.getResultUsecase;
    this.verifyRecaptchaService = props.verifyRecaptchaService;
    this.auditVotesUsecase = props.auditVotesUsecase;
  }

  //prettier-ignore
  async addVote(input: AddVoteControllerInput): Promise<AddVoteControllerOutPut> {
    console.time('[VoteController].addVote');
    console.log('[VoteDTO].artistId', input.vote.artistId);
    console.log('[VoteDTO].ip', input.vote.ip);
    const validation = ParamValidation.validateObject(input);

    if (validation.isFailure()) {
      console.error(validation.value);
      console.timeEnd('[VoteController].addVote');
      return fail(validation.value);
    }

    const isHuman = await this.verifyRecaptchaService.isHuman({
      tokenV2: input.recaptchaTokenV2,
      tokenV3: input.recaptchaTokenV3
    });

    if (isHuman.isFailure()) {
      console.error(isHuman.value);
      console.timeEnd('[VoteController].addVote');
      return fail(isHuman.value);
    }

    const voteDto: VoteDto = { ...input.vote, score: isHuman.value.score };

    const response = await this.addVoteUsecase.execute(voteDto);

    if (response.isFailure()) {
      console.error(response.value);
      console.timeEnd('[VoteController].addVote');
      return fail(response.value);
    }
    
    console.timeEnd('[VoteController].addVote');
    return success(response.value);
  }

  async getResult(): Promise<GetResultControllerOutPut> {
    console.time('[VoteController].getResult');
    const response = await this.getResultUsecase.execute();

    if (response.isFailure()) {
      console.error(response.value);
      console.timeEnd('[VoteController].getResult');
      return fail(response.value);
    }

    console.timeEnd('[VoteController].getResult');
    return success(response.value);
  }

  async auditVotes(): Promise<AuditVotesControllerOutPut> {
    console.time('[VoteController].auditVotes');
    const response = await this.auditVotesUsecase.execute();

    if (response.isFailure()) {
      console.error(response.value);
      console.timeEnd('[VoteController].auditVotes');
      return fail(response.value);
    }

    console.timeEnd('[VoteController].auditVotes');
    return success(response.value);
  }
}
