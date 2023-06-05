import { fail, success } from '../../../shared/errors/either';
import { ExternalGatewayInterface } from '../../infra/gateways/external.gateway.interface';
import { GoogleRecaptchaInvalidActionError } from '../errors/recaptcha-invalid-action.error';
import { GoogleRecaptchaInvalidHostnameError } from '../errors/recaptcha-invalid-hostname.error';
import { GoogleRecaptchaInvalidTokenError } from '../errors/recaptcha-invalid-token.error';
import { GoogleRecaptchaRobotAlertError } from '../errors/recaptcha-robot-alert.error';
import {
  IsHumanInput,
  IsHumanOutput,
  VerifyRecaptchaServiceInterface,
  VerifyTokenV2Output,
  VerifyTokenV3Output
} from './verify-recaptcha.service.interface';

type Props = {
  externalGateway: ExternalGatewayInterface;
};

export class VerifyRecaptchaService implements VerifyRecaptchaServiceInterface {
  private readonly externalGateway: ExternalGatewayInterface;
  private readonly hosts: string[];

  constructor(props: Props) {
    this.externalGateway = props.externalGateway;
    this.hosts = JSON.parse(process.env.SM_HOST_NAME_LIST || '[]');
  }

  async verifyTokenV2(token: string): Promise<VerifyTokenV2Output> {
    console.time('[VerifyRecaptchaService].verifyTokenV2');
    const result = await this.externalGateway.googleRecaptchaVerifyV2(token);
    if (!result.success) {
      console.error('[VerifyRecaptchaService].verifyTokenV2 | success -> ', result.success); //prettier-ignore
      console.timeEnd('[VerifyRecaptchaService].verifyTokenV2');
      return fail(new GoogleRecaptchaInvalidTokenError());
    }
    if (!this.hosts.includes(result.hostname)) {
      console.error('[VerifyRecaptchaService].verifyTokenV2 | hostname -> ', result.hostname); //prettier-ignore
      console.timeEnd('[VerifyRecaptchaService].verifyTokenV2');
      return fail(new GoogleRecaptchaInvalidHostnameError());
    }

    console.timeEnd('[VerifyRecaptchaService].verifyTokenV2');
    return success(result);
  }

  async verifyTokenV3(token: string): Promise<VerifyTokenV3Output> {
    console.time('[VerifyRecaptchaService].verifyTokenV3');
    const result = await this.externalGateway.googleRecaptchaVerifyV3(token);
    console.log('[VerifyRecaptchaService].verifyTokenV3 | result -> ', result);

    if (!result.success) {
      console.error('[VerifyRecaptchaService].verifyTokenV3 | success -> ', result.success); //prettier-ignore
      console.timeEnd('[VerifyRecaptchaService].verifyTokenV3');
      return fail(new GoogleRecaptchaInvalidTokenError());
    }
    if (!this.hosts.includes(result.hostname)) {
      console.error('[VerifyRecaptchaService].verifyTokenV3 | hostname -> ', result.hostname); //prettier-ignore
      console.timeEnd('[VerifyRecaptchaService].verifyTokenV3');
      return fail(new GoogleRecaptchaInvalidHostnameError());
    }
    if (result.action !== 'add_vote') {
      console.error('[VerifyRecaptchaService].verifyTokenV3 | action -> ', result.action); //prettier-ignore
      console.timeEnd('[VerifyRecaptchaService].verifyTokenV3');
      return fail(new GoogleRecaptchaInvalidActionError());
    }
    const minScore = Number(process.env.SM_RECAPTCHA_V3_MIN_SCORE || 0.6);
    if (result.score <= minScore) {
      console.error('[VerifyRecaptchaService].verifyTokenV3 | score -> ', result.score); //prettier-ignore
      console.timeEnd('[VerifyRecaptchaService].verifyTokenV3');
      return fail(new GoogleRecaptchaRobotAlertError());
    }

    console.timeEnd('[VerifyRecaptchaService].verifyTokenV3');
    return success(result);
  }

  async isHuman({ tokenV2, tokenV3 }: IsHumanInput): Promise<IsHumanOutput> {
    console.time('[VerifyRecaptchaService].isHuman');
    const [resultV2, resultV3] = await Promise.all([
      this.verifyTokenV2(tokenV2),
      this.verifyTokenV3(tokenV3)
    ]);

    if (resultV2.isFailure()) {
      console.error('[VerifyRecaptchaService].verifyTokenV3 | score -> ', resultV2.value); //prettier-ignore
      return fail(resultV2.value);
    }

    if (resultV3.isFailure()) {
      console.error('[VerifyRecaptchaService].verifyTokenV3 | score -> ', resultV3.value); //prettier-ignore
      return fail(resultV3.value);
    }

    console.timeEnd('[VerifyRecaptchaService].isHuman');
    return success(resultV3.value);
  }
}
