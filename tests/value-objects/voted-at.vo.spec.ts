import { config } from 'dotenv';
import { describe, expect, test } from 'vitest';
import { VotedAtOutsidePeriodError } from '../../src/core/shared/domain/errors/voted-at-outside-period.error';
import { MissingParamsError } from '../../src/core/shared/errors/missing-params.error';
import { VotedAtExpiredError } from './../../src/core/shared/domain/errors/voted-at-expired.error';
import { VotedAtInvalidDateError } from './../../src/core/shared/domain/errors/voted-at-invalid-date.error';
import { VotedAt } from './../../src/core/shared/domain/value-objects/voted-at.value-object';

config({ path: '.env.test' });

describe('[value-object] VotedAt', () => {
  test('Should create VotedAt instance with valid date', () => {
    const votedAt = new Date();
    const currentDate = new Date();
    const votingStartDate = new Date(process.env.NEXT_PUBLIC_VOTING_DATE_START || ''); //prettier-ignore
    const votingEndDate = new Date(process.env.NEXT_PUBLIC_VOTING_DATE_END || ''); //prettier-ignore

    const result = VotedAt.create({
      votedAt,
      currentDate,
      votingStartDate,
      votingEndDate
    });

    expect(result.isSuccess()).toBe(true);
    expect(result.value).toBeInstanceOf(Date);
    expect(result.value.toString()).toBe(votedAt.toString());
  });

  test('Should return failure for invalid date', () => {
    const dateString = 'Invalid Date';

    const votedAt = 'Invalid Date' as any;
    const currentDate = new Date();
    const votingStartDate = new Date(process.env.NEXT_PUBLIC_VOTING_DATE_START || ''); //prettier-ignore
    const votingEndDate = new Date(process.env.NEXT_PUBLIC_VOTING_DATE_END || ''); //prettier-ignore

    const result = VotedAt.create({
      votedAt,
      currentDate,
      votingStartDate,
      votingEndDate
    });

    expect(result.isFailure()).toBe(true);
    expect(result.value).toBeInstanceOf(VotedAtInvalidDateError);
  });

  test('Should return failure for expired date', () => {
    const expiredDate = '2023-05-01T00:00:00';

    const votedAt = new Date(expiredDate);
    const currentDate = new Date();
    const votingStartDate = new Date(process.env.NEXT_PUBLIC_VOTING_DATE_START || ''); //prettier-ignore
    const votingEndDate = new Date(process.env.NEXT_PUBLIC_VOTING_DATE_END || ''); //prettier-ignore

    const result = VotedAt.create({
      votedAt,
      currentDate,
      votingStartDate,
      votingEndDate
    });

    expect(result.isFailure()).toBe(true);
    expect(result.value).toBeInstanceOf(VotedAtExpiredError);
  });

  test('Should return failure for date outside voting period', () => {
    const dateOutsideVotingPeriodDate = new Date(
      new Date().getTime() + 1000 * 100 * 60 * 60 * 24
    );

    const votedAt = dateOutsideVotingPeriodDate;
    const currentDate = new Date();
    const votingStartDate = new Date(process.env.NEXT_PUBLIC_VOTING_DATE_START || ''); //prettier-ignore
    const votingEndDate = new Date(process.env.NEXT_PUBLIC_VOTING_DATE_END || ''); //prettier-ignore

    const result = VotedAt.create({
      votedAt,
      currentDate,
      votingStartDate,
      votingEndDate
    });

    expect(result.isFailure()).toBe(true);
    expect(result.value).toBeInstanceOf(VotedAtOutsidePeriodError);

    if (result.isSuccess()) {
      throw new Error('Should not be success');
    }

    expect(result.value.error).toEqual({
      name: 'VotedAtOutsidePeriodError',
      message: `O período de votação vai de ${votingStartDate.toLocaleString()} a ${votingEndDate.toLocaleString()}.`
    });
  });

  test('Should return failure for missing params', () => {
    const votedAt = '' as any;
    const currentDate = new Date();
    const votingStartDate = new Date(process.env.NEXT_PUBLIC_VOTING_DATE_START || ''); //prettier-ignore
    const votingEndDate = new Date(process.env.NEXT_PUBLIC_VOTING_DATE_END || ''); //prettier-ignore

    const result = VotedAt.create({
      votedAt,
      currentDate,
      votingStartDate,
      votingEndDate
    });

    expect(result.isFailure()).toBe(true);
    expect(result.value).toBeInstanceOf(MissingParamsError);
  });
});
