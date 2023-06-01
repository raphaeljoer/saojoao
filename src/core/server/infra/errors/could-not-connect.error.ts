import { ResponseErrorInterface } from '@/core/shared/errors/response.error.interface';

//prettier-ignore
export class CouldNotConnectError extends Error implements ResponseErrorInterface {
  constructor(message: string) {
    super(message);
    this.name = 'CouldNotConnectError';
  }

  get error() {
    return {
      name: this.name,
      message: this.message
    };
  }
}
