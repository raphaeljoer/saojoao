import { HttpStatusCode } from "@/core/shared/enum/http-status-code.enum";
import { NextApiRequest, NextApiResponse } from "next";
import { AddVoteUsecaseInterface } from "../../application/usecases/add-vote/add-vote-usecase.interface";
import { GetResultUsecaseInterface } from "../../application/usecases/get-result/get-result-usecase.interface";
import { VoteDTO } from "../../domain/dto/vote.dto.type";
import { VoteControllerInterface } from "./vote.controller.interface";

type Props = {
  addVoteUseCase: AddVoteUsecaseInterface;
  getResultUsecase: GetResultUsecaseInterface;
};
export class VoteController implements VoteControllerInterface {
  private readonly addVoteUsecase: AddVoteUsecaseInterface;
  private readonly getResultUsecase: GetResultUsecaseInterface;

  constructor(private readonly props: Props) {
    this.addVoteUsecase = this.props.addVoteUseCase;
    this.getResultUsecase = this.props.getResultUsecase;
  }

  async addVote(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if(!req.body?.artistId) {
      res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'artistId is required' });
      throw new Error('artistId is required');
    };
    if(!req.body?.recaptchaToken) {
      res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'recaptchaToken is required' });
      throw new Error('recaptchaToken is required');
    };

    const token = req.body?.recaptchaToken;
    const vote: VoteDTO = {
      artistId: req.body?.artistId,
      votedAt: new Date().toISOString(),
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress || ''
    };
    
    const response = await this.addVoteUsecase.execute({ vote, token });
    
    if(response.isFailure()) {
      res.status(HttpStatusCode.BAD_REQUEST).json(response.value.error);
      throw new Error(response.value.name);
    };
    
    res.status(HttpStatusCode.CREATED).json({ message: 'Vote added' });
  }
    
  async getResult(_: NextApiRequest, res: NextApiResponse): Promise<void> {
    const response = await this.getResultUsecase.execute();

    if(response.isFailure()) {
      res.status(HttpStatusCode.BAD_REQUEST).json(response.value.error);
      throw new Error(response.value.name);
    }

    res.status(HttpStatusCode.OK).json({ result: response.value });
  }
};