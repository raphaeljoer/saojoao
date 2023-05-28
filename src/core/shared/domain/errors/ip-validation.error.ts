import { ResponseErrorInterface } from '@/core/shared/errors/response.error.interface';

export class IpValidationError extends Error implements ResponseErrorInterface {
  constructor(message: string) {
    super(message);
    this.name = 'IpValidationError';
  }

  get error() {
    return {
      name: this.name,
      message: this.message
    };
  }
}
