import { fail, success } from "@/core/shared/errors/either";
import { RecaptchaGatewayInterface } from "../../../adapters/gateways/recaptcha.gateway.interface";
import { GoogleRecaptchaInvalidHostnameError } from "../../errors/recaptcha-invalid-hostname.error";
import { GoogleRecaptchaInvalidTokenError } from "../../errors/recaptcha-invalid-token.error";
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

  async execute({ vote, token }: AddVoteUseCaseInput): Promise<AddVoteUsecaseOutput> {
    const recaptchaResult = await this.recaptchaGateway.verify(token);
    
    if (!recaptchaResult.data.success) {
      return fail(new GoogleRecaptchaInvalidTokenError());
    }

    const hosts: string[] = JSON.parse(process.env.SM_HOST_NAME_LIST || '[]');
    if (!hosts.includes(recaptchaResult.data.hostname)) {
      return fail(new GoogleRecaptchaInvalidHostnameError());
    }
    
    try {
      const result = await this.voteRepository.addVote(vote);
      return success(result);
    } catch (e) {
      return fail(new UnexpectedError());
    }
  }
}