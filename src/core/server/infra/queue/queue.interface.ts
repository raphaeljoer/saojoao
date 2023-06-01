export type SubInput = {
  callback: Function;
};

export type PubInput = {
  message: string;
};

export interface QueueInterface<PubOutput> {
  pub: (input: PubInput) => Promise<PubOutput>;
  // sub: (input: SubInput) => Promise<SubOutput>;
}
