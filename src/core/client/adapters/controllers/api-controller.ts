import { artistProps } from '@/core/shared/data/artists';
import {
  Artist,
  SerializedArtist
} from '../../../server/domain/entities/artist';
import { ApiGatewayInterface } from '../gateways/api-gateway.interface';
import { VoteInputType } from '../types/api-gateway.type';
import { ApiControllerInterface } from './api-controller.interface';

export class ApiController implements ApiControllerInterface {
  constructor(private readonly apiGateway: ApiGatewayInterface) {}

  async getArtists(): Promise<SerializedArtist[]> {
    return artistProps.map((props) => {
      return new Artist(props).toJSON();
    });
  }

  async getArtist(artistId: string): Promise<SerializedArtist> {
    const props = artistProps.find((props) => props.artistId === artistId);
    if (!props) throw new Error('ARTIST_NOT_FOUND');
    return new Artist(props).toJSON();
  }

  async addVote(input: VoteInputType): Promise<void> {
    return await this.apiGateway.addVote(input);
  }

  async getResult(): Promise<SerializedArtist[]> {
    return await this.apiGateway.getResult();
  }
}
