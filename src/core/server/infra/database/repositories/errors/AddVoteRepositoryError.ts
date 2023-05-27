import { ResponseErrorInterface } from '@/core/shared/errors/response.error.interface';

//prettier-ignore
export class AddVoteRepositoryError extends Error implements ResponseErrorInterface {
  constructor() {
    super('Não foi possível adicionar o voto.');
    this.name = 'AddVoteRepositoryError';
  }

  get error() {
    return {
      name: this.name,
      message: this.message
    };
  }
}
