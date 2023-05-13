import { SerializedArtist } from "@/core/shared/domain/entities/artist";
import { HttpClientInterface } from "@/core/shared/drivers/http/http-client.interface";
import { VoteInputType } from "../types/api-gateway.type";
import { ApiGatewayInterface } from "./api-gateway.interface";

export class ApiGateway implements ApiGatewayInterface {
  
  constructor(private readonly httpClient: HttpClientInterface) {}
  
  async addVote(input: VoteInputType): Promise<void> {
    return await this.httpClient.post<void>('/api/vote', input);
  }

  async getResult(): Promise<SerializedArtist[]> {
    return await this.httpClient.get('/api/result');
  }
}