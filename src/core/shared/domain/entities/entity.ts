import crypto from 'crypto';

export abstract class Entity<JSONOutput> {
  public readonly id: string;

  constructor(id?: string) {
    this.id = id || crypto.randomUUID();
  }

  abstract toJSON(): JSONOutput;
}
