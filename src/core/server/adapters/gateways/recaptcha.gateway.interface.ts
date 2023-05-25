export interface RecaptchaGatewayInterface {
  verifyTokenV2(recaptchaTokenV2: string): Promise<any>;
  verifyTokenV3(recaptchaTokenV3: string): Promise<any>;
}