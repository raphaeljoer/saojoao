import { ResponseErrorInterface } from "@/core/shared/errors/response.error.interface"

export class GoogleRecaptchaRobotAlertError extends Error implements ResponseErrorInterface {
  constructor () {
    super('Google Recaptcha detectou que você é um robô')
    this.name = 'GoogleRecaptchaRobotAlertError'
  }

  get error () {
    return {
      name: this.name,
      message: this.message
    }
  }
}
