import { SerializedArtist } from "../../../shared/domain/entities/artist";
import { VoteInputType } from "../types/api-gateway.type";

export interface ApiControllerInterface {
  addVote(input: VoteInputType): Promise<void>;
  getArtists(): Promise<SerializedArtist[]>;
  getArtist(artistId: string): Promise<SerializedArtist>;
  getResult(): Promise<SerializedArtist[]>;
}