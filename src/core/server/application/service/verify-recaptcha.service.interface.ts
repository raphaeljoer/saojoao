import { Either } from '@/core/shared/errors/either';
import { GoogleRecaptchaInvalidActionError } from '../errors/recaptcha-invalid-action.error';
import { GoogleRecaptchaInvalidHostnameError } from '../errors/recaptcha-invalid-hostname.error';
import { GoogleRecaptchaInvalidTokenError } from '../errors/recaptcha-invalid-token.error';
import { GoogleRecaptchaRobotAlertError } from '../errors/recaptcha-robot-alert.error';

export type IsHumanInput = {
  tokenV2: string;
  tokenV3: string;
};

export type GoogleRecaptchaResponseV2 = {
  success: boolean;
  hostname: string;
  challenge_ts: string;
};

export type GoogleRecaptchaResponseV3 = {
  success: boolean;
  hostname: string;
  challenge_ts: string;
  action: string;
  score: number;
};

//prettier-ignore
export type VerifyTokenV2Output = Either<
  | GoogleRecaptchaInvalidTokenError
  | GoogleRecaptchaInvalidHostnameError,
  GoogleRecaptchaResponseV2
>;

//prettier-ignore
export type VerifyTokenV3Output = Either<
  | GoogleRecaptchaInvalidTokenError
  | GoogleRecaptchaInvalidHostnameError
  | GoogleRecaptchaInvalidActionError
  | GoogleRecaptchaRobotAlertError,
  GoogleRecaptchaResponseV3
>;

export type IsHumanOutput = Either<
  | GoogleRecaptchaInvalidTokenError
  | GoogleRecaptchaInvalidHostnameError
  | GoogleRecaptchaInvalidActionError
  | GoogleRecaptchaRobotAlertError,
  GoogleRecaptchaResponseV3
>;

export interface VerifyRecaptchaServiceInterface {
  verifyTokenV2(token: string): Promise<VerifyTokenV2Output>;
  verifyTokenV3(token: string): Promise<VerifyTokenV3Output>;
  isHuman(input: IsHumanInput): Promise<IsHumanOutput>;
}
