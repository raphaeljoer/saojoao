import { ResponseErrorInterface } from '../../../../core/shared/errors/response.error.interface';
import { formatDateTime } from '../../../../core/shared/utils/formatDateTime';

const { NEXT_PUBLIC_VOTING_DATE_START, NEXT_PUBLIC_VOTING_DATE_END } = process.env; //prettier-ignore

type Props = {
  votingStartDate: Date;
  votingEndDate: Date;
};

//prettier-ignore
export class VotedAtOutsidePeriodError extends Error implements ResponseErrorInterface {
  constructor({ votingStartDate, votingEndDate }: Props) {
    super(`O período de votação começa no dia ${formatDateTime(votingStartDate)} e vai até dia ${formatDateTime(votingEndDate)}.`);
    this.name = 'VotedAtOutsidePeriodError';
  }

  get error() {
    return {
      name: this.name,
      message: this.message
    };
  }
}
