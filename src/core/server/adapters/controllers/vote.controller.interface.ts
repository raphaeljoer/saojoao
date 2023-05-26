export interface VoteControllerInterface {
  addVote(req: any, res: any): Promise<void>;
  getResult(req: any, res: any): Promise<void>;
}
