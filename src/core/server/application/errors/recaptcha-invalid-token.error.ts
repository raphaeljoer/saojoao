import { ResponseErrorInterface } from '@/core/shared/errors/response.error.interface';

export class GoogleRecaptchaInvalidTokenError
  extends Error
  implements ResponseErrorInterface
{
  constructor() {
    super('Token inválido');
    this.name = 'GoogleRecaptchaInvalidTokenError';
  }

  get error() {
    return {
      name: this.name,
      message: this.message
    };
  }
}
