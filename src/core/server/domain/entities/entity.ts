import crypto from 'crypto';

export abstract class Entity {
  public readonly id: string;

  protected constructor(id?: string) {
    this.id = id || crypto.randomUUID();
  }
}
