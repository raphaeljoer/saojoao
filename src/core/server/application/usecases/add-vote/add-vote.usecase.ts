import { fail, success } from "@/core/shared/errors/either";
import { RecaptchaGatewayInterface } from "../../../adapters/gateways/recaptcha.gateway.interface";
import { VoteRepositoryInterface } from "../../repository/vote.repository.interface";
import { AddVoteError } from "../errors/add-vote.error";
import { GoogleRecaptchaError } from "../errors/recaptcha.error";
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
    const recaptchaResult = await this.recaptchaGateway.verify(token)
    
    if (!recaptchaResult.data.success) {
      return fail(new GoogleRecaptchaError());
    }
    
    try {
      const result = await this.voteRepository.addVote(vote);
      return success(result);
    } catch (e) {
      return fail(new AddVoteError());
    }
  }
}