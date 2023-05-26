import { HttpClientInterface } from '@/core/shared/drivers/http/http-client.interface';
import { RecaptchaGatewayInterface } from './recaptcha.gateway.interface';

type Props = {
  httpClient: HttpClientInterface;
};

export class GoogleRecaptchaGateway implements RecaptchaGatewayInterface {
  private readonly httpClient: HttpClientInterface;

  constructor(private readonly props: Props) {
    this.httpClient = this.props.httpClient;
  }

  async verifyTokenV2(recaptchaTokenV2: string) {
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SM_RECAPTCHA_V2_SECRET_KEY}&response=${recaptchaTokenV2}`;
    return await this.httpClient.post(url);
  }

  async verifyTokenV3(recaptchaTokenV3: string) {
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SM_RECAPTCHA_V3_SECRET_KEY}&response=${recaptchaTokenV3}`;
    return await this.httpClient.post(url);
  }
}
