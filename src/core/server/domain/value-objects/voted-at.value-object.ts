import { Either, fail, success } from '../../../shared/errors/either';
import { ParamValidation } from '../../../shared/validations/param.validation';
import { VotedAtExpiredError } from '../errors/voted-at-expired.error';
import { VotedAtInvalidDateError } from '../errors/voted-at-invalid-date.error';
import { VotedAtOutsidePeriodError } from '../errors/voted-at-outside-period.error';

type Props = {
  votedAt: Date;
  currentDate: Date;
  votingStartDate: Date;
  votingEndDate: Date;
};

type VotedAtCreateOutput = Either<
  VotedAtInvalidDateError | VotedAtExpiredError | VotedAtOutsidePeriodError,
  Date
>;

type VotedAtValidateOutput = Either<
  VotedAtInvalidDateError | VotedAtExpiredError | VotedAtOutsidePeriodError,
  true
>;

export class VotedAt {
  static value: Date;

  static create(input: Props): VotedAtCreateOutput {
    const validationResult = ParamValidation.validateObject(input);

    if (validationResult.isFailure()) {
      return fail(validationResult.value);
    }

    this.value = input.votedAt;
    const validation = this.validate(input);

    if (validation.isFailure()) {
      return fail(validation.value);
    }

    return success(input.votedAt);
  }

  private static validate(input: Props): VotedAtValidateOutput {
    if (isNaN(new Date(input?.votedAt)?.getTime())) {
      return fail(new VotedAtInvalidDateError());
    }

    const expirationTime = new Date(
      input.currentDate.getTime() - 2 * 60 * 1000
    ); // 2 minutes ago

    if (input.votedAt.getTime() < expirationTime.getTime()) {
      return fail(new VotedAtExpiredError());
    }

    if (process.env.VOTING_DATE_VERIFY_ACTIVE === 'true') {
      if (
        input.votedAt.getTime() < input.votingStartDate.getTime() ||
        input.votedAt.getTime() > input.votingEndDate.getTime()
      ) {
        return fail(
          new VotedAtOutsidePeriodError({
            votingStartDate: input.votingStartDate,
            votingEndDate: input.votingEndDate
          })
        );
      }
    }

    return success(true);
  }
}
