import {
  AuditViewArtist,
  PublicViewArtist
} from '../../../server/domain/entities/artist';
import { VoteInputType } from '../types/api-gateway.type';

export interface ApiControllerInterface {
  addVote(input: VoteInputType): Promise<void>;
  getArtists(): Promise<PublicViewArtist[]>;
  getArtist(artistId: string): Promise<PublicViewArtist>;
  getResult(): Promise<PublicViewArtist[]>;
  getAuditResult(): Promise<AuditViewArtist[]>;
}
