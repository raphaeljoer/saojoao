import { Either, fail, success } from '../../../shared/errors/either';
import { IpValidationError } from '../errors/ip-validation.error';

type IpCreateOutput = Either<IpValidationError, string>;

export class Ip {
  static regex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;

  static create(ip: string | string[] | undefined): IpCreateOutput {
    if (!ip) {
      return fail(new IpValidationError('Ip não informado'));
    }

    if (typeof ip === 'string' && process.env.NODE_ENV === 'production') {
      if (!this.regex.test(ip)) {
        return fail(new IpValidationError());
      }

      return success(ip);
    }

    if (Array.isArray(ip)) {
      const invalidIps = ip.filter((address) => {
        return !this.regex.test(address);
      });

      if (invalidIps.length > 0) {
        return fail(new IpValidationError());
      }

      return success(String(ip));
    }

    return success(ip);
  }
}
