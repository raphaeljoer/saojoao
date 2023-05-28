import { HttpClientInterface } from '@/core/shared/drivers/http/http-client.interface';
import {
  GoogleRecaptchaResponseV2,
  GoogleRecaptchaResponseV3
} from '../../application/service/verify-recaptcha.service.interface';
import { ExternalGatewayInterface } from './external.gateway.interface';

type Props = {
  httpClient: HttpClientInterface;
};

export class ExternalGateway implements ExternalGatewayInterface {
  private readonly httpClient: HttpClientInterface;

  constructor(props: Props) {
    this.httpClient = props.httpClient;
  }

  //prettier-ignore
  async googleRecaptchaVerifyV2(token: string): Promise<GoogleRecaptchaResponseV2> {
    const secretKey = process.env.SM_RECAPTCHA_V2_SECRET_KEY || '';
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
    return await this.httpClient.post(url);
  }
  //prettier-ignore
  async googleRecaptchaVerifyV3(token: string): Promise<GoogleRecaptchaResponseV3> {
    const secretKey = process.env.SM_RECAPTCHA_V3_SECRET_KEY || '';
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
    return await this.httpClient.post(url);
  }
}
