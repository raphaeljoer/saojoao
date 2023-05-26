import { ResponseErrorInterface } from '@/core/shared/errors/response.error.interface';

export class UnexpectedError extends Error implements ResponseErrorInterface {
  constructor(message?: string) {
    super(`Error inesperado${message ? `: ${message}` : ''}`);
    this.name = 'UnexpectedError';
  }

  get error() {
    return {
      name: this.name,
      message: this.message
    };
  }
}
