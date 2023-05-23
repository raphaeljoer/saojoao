import { VoteDTO } from "../../domain/dto/vote.dto.type";

export type CountByIdInput = {
  key: keyof VoteDTO;
  value: string;
};
export interface VoteRepositoryInterface {
  addVote: (input: VoteDTO) => Promise<void>;
  countVotesTotal: () => Promise<number>;
  countVotes: (input: CountByIdInput) => Promise<number>;
}