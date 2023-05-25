import { RecaptchaGatewayInterface } from "@/core/server/adapters/gateways/recaptcha.gateway.interface";

export class FakeRecaptchaGateway implements RecaptchaGatewayInterface {

  constructor(private readonly action: string) {}

  async verifyTokenV2(token: string): Promise<any> {
    if (token === "validTokenV2") {
      return { success: true, hostname: 'localhost' };
    } else {
      return { success: false, hostname: 'localhost' };
    }
  }

  async verifyTokenV3(token: string): Promise<any> {
    if (token === "validTokenV3") {
      return { success: true, hostname: 'localhost', score: 0.9, action: this.action };
    } else {
      return { success: false, hostname: 'localhost', score: 0.9, action: this.action };
    }
  }
}