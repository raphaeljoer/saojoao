import { ResponseErrorInterface } from '@/core/shared/errors/response.error.interface';
//prettier-ignore
export class MissingParamsError extends Error implements ResponseErrorInterface {
  constructor(missingParams: string) {
    super(`Missing params: ${missingParams} is required`);
    this.name = 'MissingParamError';
  }

  get error() {
    return {
      name: this.name,
      message: this.message
    };
  }
}
