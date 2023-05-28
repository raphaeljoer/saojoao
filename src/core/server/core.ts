import { VoteControllerInterface } from './adapters/controllers/vote.controller.interface';

type Props = {
  voteController: VoteControllerInterface;
};

export class Core {
  public readonly vote: VoteControllerInterface;

  constructor(props: Props) {
    this.vote = props.voteController;
  }
}
