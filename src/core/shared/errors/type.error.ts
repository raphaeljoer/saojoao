import { ResponseErrorInterface } from '@/core/shared/errors/response.error.interface';

export class TypeError extends Error implements ResponseErrorInterface {
  constructor(param: string, type: string) {
    super(`${param} is not a ${type}`);
    this.name = 'TypeError';
  }

  get error() {
    return {
      name: this.name,
      message: this.message
    };
  }
}
