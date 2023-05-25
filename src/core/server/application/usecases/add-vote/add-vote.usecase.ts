import { fail, success } from "../../../../../core/shared/errors/either";
import { RecaptchaGatewayInterface } from "../../../adapters/gateways/recaptcha.gateway.interface";
import { GoogleRecaptchaInvalidActionError } from "../../errors/recaptcha-invalid-action.error";
import { GoogleRecaptchaInvalidHostnameError } from "../../errors/recaptcha-invalid-hostname.error";
import { GoogleRecaptchaInvalidTokenError } from "../../errors/recaptcha-invalid-token.error";
import { GoogleRecaptchaRobotAlertError } from "../../errors/recaptcha-robot-alert.error";
import { UnexpectedError } from "../../errors/unexpected-error";
import { VoteRepositoryInterface } from "../../repository/vote.repository.interface";
import { AddVoteUseCaseInput, AddVoteUsecaseInterface, AddVoteUsecaseOutput } from "./add-vote-usecase.interface";

type Props = {
  voteRepository: VoteRepositoryInterface
  recaptchaGateway: RecaptchaGatewayInterface;
};
export class AddVoteUsecase implements AddVoteUsecaseInterface {
  private readonly voteRepository: VoteRepositoryInterface;
  private readonly recaptchaGateway: RecaptchaGatewayInterface;

  constructor(private readonly props: Props) {
    this.voteRepository = this.props.voteRepository;
    this.recaptchaGateway = this.props.recaptchaGateway;
  }

  async execute({ vote, recaptchaTokenV2, recaptchaTokenV3 }: AddVoteUseCaseInput): Promise<AddVoteUsecaseOutput> {
    const recaptchaV2Result = await this.recaptchaGateway.verifyTokenV2(recaptchaTokenV2);
    const hosts: string[] = JSON.parse(process.env.SM_HOST_NAME_LIST || '[]');
    
    if (!recaptchaV2Result.data.success) {
      return fail(new GoogleRecaptchaInvalidTokenError());
    }

    if (!hosts.includes(recaptchaV2Result.data.hostname)) {
      return fail(new GoogleRecaptchaInvalidHostnameError());
    }

    const recaptchaV3Result = await this.recaptchaGateway.verifyTokenV3(recaptchaTokenV3);

    if (!recaptchaV3Result.data.success) {
      return fail(new GoogleRecaptchaInvalidTokenError());
    }

    if (!hosts.includes(recaptchaV3Result.data.hostname)) {
      return fail(new GoogleRecaptchaInvalidHostnameError());
    }

    if (recaptchaV3Result.data.action !== 'add_vote') {
      return fail(new GoogleRecaptchaInvalidActionError());
    }

    console.log('recaptchaV3.score', recaptchaV3Result.data.score, 'user_ip', vote.ip, 'artist_voted', vote.artistId);

    if(recaptchaV3Result.data.score <= Number(process.env.SM_RECAPTCHA_V3_MIN_SCORE || 0.8)) {
      return fail(new GoogleRecaptchaRobotAlertError());
    }
    
    try {
      const result = await this.voteRepository.addVote(vote);
      return success(result);
    } catch (e) {
      return fail(new UnexpectedError());
    }
  }
}