import { ResponseErrorInterface } from '@/core/shared/errors/response.error.interface';

export class GoogleRecaptchaInvalidHostnameError
  extends Error
  implements ResponseErrorInterface
{
  constructor() {
    super('Hostname inválido');
    this.name = 'GoogleRecaptchaInvalidHostnameError';
  }

  get error() {
    return {
      name: this.name,
      message: this.message
    };
  }
}
