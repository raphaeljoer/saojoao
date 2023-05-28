import { ResponseErrorInterface } from '@/core/shared/errors/response.error.interface';

//prettier-ignore
export class CountTotalVotesRepositoryError extends Error implements ResponseErrorInterface {
  constructor() {
    super('Não foi possível contar o total de votos.');
    this.name = 'CountTotalVotesRepositoryError';
  }

  get error() {
    return {
      name: this.name,
      message: this.message
    };
  }
}
