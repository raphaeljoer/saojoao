import {
  AuditViewArtist,
  PublicViewArtist
} from '@/core/server/domain/entities/artist';
import { VoteInputType } from '../types/api-gateway.type';

export interface ApiGatewayInterface {
  addVote(input: VoteInputType): Promise<void>;
  getResult(): Promise<PublicViewArtist[]>;
  getAuditResult(): Promise<AuditViewArtist[]>;
}
