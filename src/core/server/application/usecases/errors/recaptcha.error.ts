import { UsecaseErrorInterface } from "../usecase.error.interface"

export class GoogleRecaptchaError extends Error implements UsecaseErrorInterface {
  constructor () {
    super('Token inválido')
    this.name = 'GoogleRecaptchaError'
  }

  get code (): string {
    return 'GOOGLE_RECAPTCHA_ERROR'
  }

  get path (): string {
    return require.main?.filename ?? ''
  }
}
