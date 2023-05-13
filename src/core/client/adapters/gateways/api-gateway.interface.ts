import { SerializedArtist } from "@/core/shared/domain/entities/artist";
import { VoteInputType } from "../types/api-gateway.type";

export interface ApiGatewayInterface {
  addVote(input: VoteInputType): Promise<void>;
  getResult(): Promise<SerializedArtist[]>;
}