import { GoogleRecaptchaInvalidActionError } from '../errors/recaptcha-invalid-action.error';
import { GoogleRecaptchaInvalidHostnameError } from '../errors/recaptcha-invalid-hostname.error';
import { GoogleRecaptchaRobotAlertError } from '../errors/recaptcha-robot-alert.error';
import { ExternalGatewayInterface } from '../../infra/gateways/external.gateway.interface';
import { fail, success } from '../../../shared/errors/either';
import { GoogleRecaptchaInvalidTokenError } from '../errors/recaptcha-invalid-token.error';
import {
  IsHumanInput,
  IsHumanOutput,
  VerifyRecaptchaServiceInterface
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

  async verifyTokenV2(token: string): Promise<any> {
    const result = await this.externalGateway.googleRecaptchaVerifyV2(token);
    if (!result.success) {
      return fail(new GoogleRecaptchaInvalidTokenError());
    }
    if (!this.hosts.includes(result.hostname)) {
      return fail(new GoogleRecaptchaInvalidHostnameError());
    }

    return success(result);
  }

  async verifyTokenV3(token: string): Promise<any> {
    const result = await this.externalGateway.googleRecaptchaVerifyV3(token);
    if (!result.success) {
      return fail(new GoogleRecaptchaInvalidTokenError());
    }
    if (!this.hosts.includes(result.hostname)) {
      return fail(new GoogleRecaptchaInvalidHostnameError());
    }
    if (result.action !== 'add_vote') {
      return fail(new GoogleRecaptchaInvalidActionError());
    }
    const minScore = Number(process.env.SM_RECAPTCHA_V3_MIN_SCORE || 0.6);
    if (result.score <= minScore) {
      return fail(new GoogleRecaptchaRobotAlertError());
    }

    return success(result);
  }

  async isHuman({ tokenV2, tokenV3 }: IsHumanInput): Promise<IsHumanOutput> {
    const resultV2 = await this.verifyTokenV2(tokenV2);
    if (resultV2.isFailure()) {
      return fail(resultV2.value);
    }
    const resultV3 = await this.verifyTokenV3(tokenV3);
    if (resultV3.isFailure()) {
      return fail(resultV3.value);
    }

    return success(resultV3.value);
  }
}
