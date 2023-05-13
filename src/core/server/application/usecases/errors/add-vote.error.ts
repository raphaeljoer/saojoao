import { UsecaseErrorInterface } from "../usecase.error.interface";

export class AddVoteError extends Error implements UsecaseErrorInterface {
  constructor () {
    super('Não foi possível adicionar o voto')
    this.name = 'AddVoteError'
  }

  get code(): string {
    return 'ADD_VOTE_ERROR'
  }

  get path(): string {
    return require?.main?.filename ?? '';
  }
}
