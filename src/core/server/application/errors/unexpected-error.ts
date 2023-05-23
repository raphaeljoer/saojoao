import { ResponseErrorInterface } from "@/core/shared/errors/response.error.interface";

export class UnexpectedError extends Error implements ResponseErrorInterface {
  constructor () {
    super('Error inesperado')
    this.name = 'UnexpectedError';
  }

  get error () {
    return {
      name: this.name,
      message: this.message
    }
  }
}
