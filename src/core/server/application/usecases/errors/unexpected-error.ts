import { UsecaseErrorInterface } from "../usecase.error.interface";

export class UnexpectedError extends Error implements UsecaseErrorInterface {
  constructor () {
    super('Error inesperado')
    this.name = 'UnexpectedError';
  }

  get code(): string {
    return 'UNEXPECTED_ERROR';
  }

  get path(): string {
    return require?.main?.filename ?? '';
  }
}
