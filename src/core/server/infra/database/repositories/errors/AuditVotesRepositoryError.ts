import { ResponseErrorInterface } from '@/core/shared/errors/response.error.interface';

//prettier-ignore
export class GetAllRepositoryError extends Error implements ResponseErrorInterface {
  constructor() {
    super(`Não foi possível auditar os votos.`);
    this.name = 'AuditVotesRepositoryError';
  }

  get error() {
    return {
      name: this.name,
      message: this.message
    };
  }
}
