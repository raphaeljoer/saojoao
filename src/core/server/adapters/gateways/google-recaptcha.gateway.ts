import { HttpClientInterface } from "@/core/shared/drivers/http/http-client.interface";
import { RecaptchaGatewayInterface } from "./recaptcha.gateway.interface";

type Props = {
  httpClient: HttpClientInterface;
}

export class GoogleRecaptchaGateway implements RecaptchaGatewayInterface {
  private readonly httpClient: HttpClientInterface;
  
  constructor(private readonly props: Props) {
    this.httpClient = this.props.httpClient;
  }
   
  async verify(recaptchaToken: string) {
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SM_RECAPTCHA_V2_SECRET_KEY}&response=${recaptchaToken}`;
    return this.httpClient.post(url);
  }
}