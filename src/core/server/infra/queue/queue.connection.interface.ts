export type SubInput = {
  topic: string;
  fromBeginning: boolean;
};

export type PubInput = {
  topic: string;
  message: string;
};

export interface QueueConnectionInterface<PubOutput, SubOutput> {
  pub: (input: PubInput) => Promise<PubOutput>;
  sub: (input: SubInput) => Promise<SubOutput>;
}
