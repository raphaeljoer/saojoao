import { RecaptchaGatewayInterface } from "@/core/server/adapters/gateways/recaptcha.gateway.interface";

export class FakeRecaptchaGateway implements RecaptchaGatewayInterface {
  async verify(token: string): Promise<{ data: { success: boolean }}> {
    if (token === "validToken") {
      return { data: { success: true }};
    } else {
      return { data: { success: false }};
    }
  }
}