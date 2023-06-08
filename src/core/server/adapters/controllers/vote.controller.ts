import { fail, success } from '../../../../../src/core/shared/errors/either';
import { ParamValidation } from '../../../../../src/core/shared/validations/param.validation';
import { VerifyRecaptchaServiceInterface } from '../../application/service/verify-recaptcha.service.interface';
import { AddVoteUsecaseInterface } from '../../application/usecases/add-vote/add-vote-usecase.interface';
import { AuditVotesUsecaseInterface } from '../../application/usecases/audit-votes/audit-votes.usecase.interface';
import { GetAuditResultUsecaseInterface } from '../../application/usecases/get-audit-result/get-audit-result-usecase.interface';
import { GetResultUsecaseInterface } from '../../application/usecases/get-result/get-result-usecase.interface';
import { VoteDto } from '../../domain/dto/vote.dto.type';
import { GetAuditResultPresenter } from '../presenter/result/get-audit-result.presenter';
import { GetPublicResultPresenter } from '../presenter/result/get-public-result.presenter';

import {
  AddVoteControllerInput,
  AddVoteControllerOutPut,
  AuditVotesControllerOutPut,
  GetAuditResultControllerOutPut,
  GetResultControllerOutPut,
  VoteControllerInterface
} from './vote.controller.interface';

type Props = {
  addVoteUseCase: AddVoteUsecaseInterface;
  getResultUsecase: GetResultUsecaseInterface;
  getAuditResultUsecase: GetAuditResultUsecaseInterface;
  auditVotesUsecase: AuditVotesUsecaseInterface;
  verifyRecaptchaService: VerifyRecaptchaServiceInterface;
};
export class VoteController implements VoteControllerInterface {
  private readonly addVoteUsecase: AddVoteUsecaseInterface;
  private readonly getResultUsecase: GetResultUsecaseInterface;
  private readonly getAuditResultUsecase: GetAuditResultUsecaseInterface;
  private readonly verifyRecaptchaService: VerifyRecaptchaServiceInterface;
  private readonly auditVotesUsecase: AuditVotesUsecaseInterface;

  constructor(props: Props) {
    this.addVoteUsecase = props.addVoteUseCase;
    this.getResultUsecase = props.getResultUsecase;
    this.getAuditResultUsecase = props.getAuditResultUsecase;
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

    const presenter = new GetPublicResultPresenter();
    const response = await this.getResultUsecase.execute({ presenter });

    if (response.isFailure()) {
      console.error(response.value);
      console.timeEnd('[VoteController].getResult');
      return fail(response.value);
    }

    console.timeEnd('[VoteController].getResult');
    return success(response.value);
  }

  async getAuditResult(): Promise<GetAuditResultControllerOutPut> {
    console.time('[VoteController].getAuditResult');

    const presenter = new GetAuditResultPresenter();
    const response = await this.getAuditResultUsecase.execute({ presenter });

    if (response.isFailure()) {
      console.error(response.value);
      console.timeEnd('[VoteController].getAuditResult');
      return fail(response.value);
    }

    console.timeEnd('[VoteController].getAuditResult');
    return success(response.value);
  }

  async auditVotes(): Promise<AuditVotesControllerOutPut> {
    console.time('[VoteController].auditVotes');

    const presenter = new GetAuditResultPresenter();
    const response = await this.auditVotesUsecase.execute({ presenter });

    if (response.isFailure()) {
      console.error(response.value);
      console.timeEnd('[VoteController].auditVotes');
      return fail(response.value);
    }

    console.timeEnd('[VoteController].auditVotes');
    return success(response.value);
  }
}
