import { ResponseErrorInterface } from '../../../../core/shared/errors/response.error.interface';

type Props = {
  votingStartDate: Date;
  votingEndDate: Date;
};

//prettier-ignore
export class VotedAtOutsidePeriodError extends Error implements ResponseErrorInterface {

  
  constructor({ votingStartDate, votingEndDate }: Props) {
    const startDate = votingStartDate.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    const startTime = votingStartDate.toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    const endDate = votingEndDate.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    const endTime = votingEndDate.toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo' });

    super(`O período de votação começa no dia ${startDate} às ${startTime} e vai até dia ${endDate} às ${endTime}.`);
    this.name = 'VotedAtOutsidePeriodError';
  }

  get error() {
    return {
      name: this.name,
      message: this.message
    };
  }
}
