import { ResponseErrorInterface } from '@/core/shared/errors/response.error.interface';

//prettier-ignore
export class AddRepositoryError extends Error implements ResponseErrorInterface {
  constructor(repoName: string) {
    super(`Não foi possível adicionar ao repositório ${repoName}.`);
    this.name = 'AddRepositoryError';
  }

  get error() {
    return {
      name: this.name,
      message: this.message
    };
  }
}
