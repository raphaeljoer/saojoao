import { ResponseErrorInterface } from '@/core/shared/errors/response.error.interface';

//prettier-ignore
export class CountTotalRepositoryError extends Error implements ResponseErrorInterface {
  constructor() {
    super('Não foi possível contar o total.');
    this.name = 'CountTotalVotesRepositoryError';
  }

  get error() {
    return {
      name: this.name,
      message: this.message
    };
  }
}
