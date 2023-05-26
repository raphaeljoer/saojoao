import { ResponseErrorInterface } from '@/core/shared/errors/response.error.interface';

export class AddVoteError extends Error implements ResponseErrorInterface {
  constructor() {
    super('Não foi possível adicionar o voto');
    this.name = 'AddVoteError';
  }

  get error() {
    return {
      name: this.name,
      message: this.message
    };
  }
}
