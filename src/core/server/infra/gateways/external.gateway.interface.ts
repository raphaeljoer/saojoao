import {
  GoogleRecaptchaResponseV2,
  GoogleRecaptchaResponseV3
} from '../../application/service/verify-recaptcha.service.interface';

export interface ExternalGatewayInterface {
  googleRecaptchaVerifyV2(token: string): Promise<GoogleRecaptchaResponseV2>;
  googleRecaptchaVerifyV3(token: string): Promise<GoogleRecaptchaResponseV3>;
}
