import { ResponseErrorInterface } from '@/core/shared/errors/response.error.interface';

export class GoogleRecaptchaRobotAlertError
  extends Error
  implements ResponseErrorInterface
{
  constructor() {
    super(
      'Google reCAPTCHA detectou comportamento suspeito, tente novamente em alguns instantes'
    );
    this.name = 'GoogleRecaptchaRobotAlertError';
  }

  get error() {
    return {
      name: this.name,
      message: this.message
    };
  }
}
