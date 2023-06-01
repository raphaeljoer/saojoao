import { ResponseErrorInterface } from '@/core/shared/errors/response.error.interface';

//prettier-ignore
export class CountByIdRepositoryError extends Error implements ResponseErrorInterface {
  constructor() {
    super('Não foi possível contar pelo id.');
    this.name = 'CountByIdRepositoryError';
  }

  get error() {
    return {
      name: this.name,
      message: this.message
    };
  }
}
