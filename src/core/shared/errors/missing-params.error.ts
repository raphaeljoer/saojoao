import { ResponseErrorInterface } from '@/core/shared/errors/response.error.interface';

export class MissingParamError extends Error implements ResponseErrorInterface {
  constructor(missingParam: string) {
    super(`Missing param | ${missingParam} is required`);
    this.name = 'MissingParamError';
  }

  get error() {
    return {
      name: this.name,
      message: this.message
    };
  }
}
