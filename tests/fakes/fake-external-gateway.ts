import { ExternalGatewayInterface } from './../../src/core/server/infra/gateways/external.gateway.interface';
import {
  GoogleRecaptchaResponseV2,
  GoogleRecaptchaResponseV3
} from '../../src/core/server/application/service/verify-recaptcha.service.interface';

type RecaptchaProps = {
  action: string;
  score: number;
  hostname: string;
};

type Props = {
  recaptchaProps?: RecaptchaProps;
};
export class FakeExternalGateway implements ExternalGatewayInterface {
  private readonly recaptchaProps: RecaptchaProps | undefined;

  constructor(props: Props) {
    this.recaptchaProps = props?.recaptchaProps;
  }

  //prettier-ignore
  async googleRecaptchaVerifyV2(token: string): Promise<GoogleRecaptchaResponseV2> {
    if (token !== 'validTokenV2') {
      return {
        success: false,
        challenge_ts: new Date().toISOString(),
        hostname: this.recaptchaProps?.hostname || ''
      };
    }

    return {
      success: true,
      challenge_ts: new Date().toISOString(),
      hostname: this.recaptchaProps?.hostname || ''
    };
  }

  //prettier-ignore
  async googleRecaptchaVerifyV3(token: string): Promise<GoogleRecaptchaResponseV3> {
    if (token !== 'validTokenV3') {
      return {
        success: false,
        hostname: this.recaptchaProps?.hostname || '', 
        challenge_ts: new Date().toISOString(),
        action: this.recaptchaProps?.action || '',
        score: this.recaptchaProps?.score || 0.9
      };
    }

    return {
      success: true,
      hostname: this.recaptchaProps?.hostname || '',
      challenge_ts: new Date().toISOString(),
      action: this.recaptchaProps?.action || '',
      score: this.recaptchaProps?.score || 0.9
    };
  }
}
