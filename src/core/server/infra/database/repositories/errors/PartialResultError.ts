import { ResponseErrorInterface } from '../../../../../shared/errors/response.error.interface';

//prettier-ignore
export class PartialResultError extends Error implements ResponseErrorInterface {
  constructor() {
    super('Não foi possível obter o resultado parcial da votação');
    this.name = 'PartialResultError';
  }

  get error() {
    return {
      name: this.name,
      message: this.message
    };
  }
}
