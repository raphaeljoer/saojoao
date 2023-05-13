export interface RecaptchaGatewayInterface {
  verify(recaptchaToken: string): Promise<any>;
}