import { ArtistPresenter } from '@/core/server/adapters/presenter/artist/artist.presenter';
import { artistProps } from '@/core/shared/data/artists';
import {
  Artist,
  AuditViewArtist,
  PublicViewArtist
} from '../../../server/domain/entities/artist';
import { ApiGatewayInterface } from '../gateways/api-gateway.interface';
import { VoteInputType } from '../types/api-gateway.type';
import { ApiControllerInterface } from './api-controller.interface';

export class ApiController implements ApiControllerInterface {
  private readonly presenter: ArtistPresenter;

  constructor(private readonly apiGateway: ApiGatewayInterface) {
    this.presenter = new ArtistPresenter();
  }

  async getArtists(): Promise<PublicViewArtist[]> {
    return artistProps.map((props) => {
      const artist = new Artist(props);
      return this.presenter.toPublicView(artist);
    });
  }

  async getArtist(artistId: string): Promise<PublicViewArtist> {
    const props = artistProps.find((props) => props.artistId === artistId);
    if (!props) throw new Error('ARTIST_NOT_FOUND');
    const artist = new Artist(props);
    return this.presenter.toPublicView(artist);
  }

  async addVote(input: VoteInputType): Promise<void> {
    return await this.apiGateway.addVote(input);
  }

  async getResult(): Promise<PublicViewArtist[]> {
    return await this.apiGateway.getResult();
  }

  async getAuditResult(): Promise<AuditViewArtist[]> {
    return await this.apiGateway.getAuditResult();
  }
}
