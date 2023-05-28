import { Either, fail, success } from '../../errors/either';
import { IpValidationError } from '../errors/ip-validation.error';

type IpCreateOutput = Either<IpValidationError, string>;

export class Ip {
  static regex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;

  static create(ip: string | string[] | undefined): IpCreateOutput {
    if (!ip) {
      return fail(new IpValidationError('Ip não informado'));
    }

    if (typeof ip === 'string') {
      if (!this.regex.test(ip)) {
        return fail(new IpValidationError('Ip com formato inválido'));
      }

      return success(ip);
    }

    if (Array.isArray(ip)) {
      const invalidIps = ip.filter((address) => {
        return !this.regex.test(address);
      });

      if (invalidIps.length > 0) {
        return fail(new IpValidationError('Ip com formato inválido'));
      }

      return success(String(ip));
    }

    return success(ip);
  }
}
