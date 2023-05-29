import { fail, success } from '../../../../../src/core/shared/errors/either';
import { ParamValidation } from '../../../../../src/core/shared/validations/param.validation';
import { VerifyRecaptchaServiceInterface } from '../../application/service/verify-recaptcha.service.interface';
import { AddVoteUsecaseInterface } from '../../application/usecases/add-vote/add-vote-usecase.interface';
import { GetResultUsecaseInterface } from '../../application/usecases/get-result/get-result-usecase.interface';
import {
  AddVoteControllerInput,
  AddVoteControllerOutPut,
  GetResultControllerOutPut,
  VoteControllerInterface
} from './vote.controller.interface';

type Props = {
  addVoteUseCase: AddVoteUsecaseInterface;
  getResultUsecase: GetResultUsecaseInterface;
  verifyRecaptchaService: VerifyRecaptchaServiceInterface;
};
export class VoteController implements VoteControllerInterface {
  private readonly addVoteUsecase: AddVoteUsecaseInterface;
  private readonly getResultUsecase: GetResultUsecaseInterface;
  private readonly verifyRecaptchaService: VerifyRecaptchaServiceInterface;

  constructor(props: Props) {
    this.addVoteUsecase = props.addVoteUseCase;
    this.getResultUsecase = props.getResultUsecase;
    this.verifyRecaptchaService = props.verifyRecaptchaService;
  }

  //prettier-ignore
  async addVote(input: AddVoteControllerInput): Promise<AddVoteControllerOutPut> {
    const validation = ParamValidation.validateObject(input);

    if (validation.isFailure()) {
      return fail(validation.value);
    }
    
    const isHuman = await this.verifyRecaptchaService.isHuman({
      tokenV2: input.recaptchaTokenV2,
      tokenV3: input.recaptchaTokenV3
    });

    if (isHuman.isFailure()) {
      return fail(isHuman.value);
    }

    const response = await this.addVoteUsecase.execute(input.vote); 
    
    if (response.isFailure()) {
      return fail(response.value);
    }

    return success(response.value);
  }

  async getResult(): Promise<GetResultControllerOutPut> {
    const response = await this.getResultUsecase.execute();

    if (response.isFailure()) {
      return fail(response.value);
    }

    return success(response.value);
  }
}
