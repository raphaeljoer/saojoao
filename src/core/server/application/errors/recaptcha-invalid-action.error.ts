import { ResponseErrorInterface } from '@/core/shared/errors/response.error.interface';

export class GoogleRecaptchaInvalidActionError
  extends Error
  implements ResponseErrorInterface
{
  constructor() {
    super('Action inválida');
    this.name = 'GoogleRecaptchaInvalidActionError';
  }

  get error() {
    return {
      name: this.name,
      message: this.message
    };
  }
}
