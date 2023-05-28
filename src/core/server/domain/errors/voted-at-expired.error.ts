import { ResponseErrorInterface } from '@/core/shared/errors/response.error.interface';

//prettier-ignore
export class VotedAtExpiredError extends Error implements ResponseErrorInterface {
  constructor() {
    super('Voto expirado');
    this.name = 'VotedAtExpiredError';
  }

  get error() {
    return {
      name: this.name,
      message: this.message
    };
  }
}
