import { ResponseErrorInterface } from '@/core/shared/errors/response.error.interface';

//prettier-ignore
export class VotedAtInvalidDateError extends Error implements ResponseErrorInterface {
  constructor() {
    super('Data de voto inválida');
    this.name = 'VotedAtInvalidDateError';
  }

  get error() {
    return {
      name: this.name,
      message: this.message
    };
  }
}
