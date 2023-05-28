import { ResponseErrorInterface } from '@/core/shared/errors/response.error.interface';

const { NEXT_PUBLIC_VOTING_DATE_START, NEXT_PUBLIC_VOTING_DATE_END } = process.env; //prettier-ignore

type Props = {
  votingStartDate: Date;
  votingEndDate: Date;
};

//prettier-ignore
export class VotedAtOutsidePeriodError extends Error implements ResponseErrorInterface {
  constructor({votingStartDate, votingEndDate}: Props) {
    super(`O período de votação vai de ${votingStartDate.toLocaleString()} a ${votingEndDate.toLocaleString()}.`); //prettier-ignore
    this.name = 'VotedAtOutsidePeriodError';
  }

  get error() {
    return {
      name: this.name,
      message: this.message
    };
  }
}
