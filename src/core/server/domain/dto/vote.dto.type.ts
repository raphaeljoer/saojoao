export type VoteDto = {
  artistId: string;
  votedAt: string;
  score?: number;
  ip: string | string[] | undefined;
};
