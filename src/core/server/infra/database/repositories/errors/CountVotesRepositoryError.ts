import { ResponseErrorInterface } from '@/core/shared/errors/response.error.interface';

//prettier-ignore
export class CountVotesRepositoryError extends Error implements ResponseErrorInterface {
  constructor() {
    super('Não foi possível contar os votos.');
    this.name = 'CountVotesRepositoryError';
  }

  get error() {
    return {
      name: this.name,
      message: this.message
    };
  }
}
