import { Either, fail, success } from '../errors/either';
import { MissingParamsError } from '../errors/missing-params.error';
import { TypeError } from '../errors/type.error';

type ValidateInput = unknown;
type ValidateOutput = Either<MissingParamsError, ValidateInput>;

export class ParamValidation {
  static check(param: unknown): boolean {
    if (param === null || param === undefined) return false;
    if (typeof param === 'string') return param.trim().length > 0;
    if (Array.isArray(param)) return param.length > 0;
    if (typeof param === 'object') {
      if (param instanceof Date) return !isNaN(param.getTime());
      return Object.keys(param).length > 0;
    }
    return true;
  }

  static validate(paramName: string, param: ValidateInput): ValidateOutput {
    if (!this.check(param)) {
      return fail(new MissingParamsError(paramName));
    }

    return success(param);
  }

  static validateObject(object: object): ValidateOutput {
    if (typeof object !== 'object') {
      return fail(new TypeError('the param provided', 'object'));
    }

    const missingParams: string[] = [];

    this.checkObject(object, '', missingParams);

    if (missingParams.length > 0) {
      return fail(new MissingParamsError(`[${missingParams.join(', ')}]`));
    }

    return success(object);
  }

  private static checkObject(
    object: any,
    parentKey: string,
    missingParams: string[]
  ): void {
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        const value = object[key];
        const currentKey = parentKey ? `${parentKey}.${key}` : key;

        if (!this.check(value)) {
          missingParams.push(currentKey);
        }

        if (typeof value === 'object' && value !== null) {
          this.checkObject(value, currentKey, missingParams);
        }
      }
    }
  }
}
