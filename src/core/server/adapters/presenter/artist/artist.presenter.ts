import {
  Artist,
  AuditViewArtist,
  PublicViewArtist
} from '../../../domain/entities/artist';

export class ArtistPresenter {
  get JSON() {
    return {
      toPublicView: this.toPublicView,
      toAuditView: this.toAuditView
    };
  }

  toPublicView(artist: Artist): PublicViewArtist {
    return {
      artistId: artist.artistId,
      name: artist.name,
      picture: artist.picture,
      position: artist.position,
      percentage: artist.percentage,
      progress: artist.progress,
      slug: artist.slug,
      share: artist.share,
      isWinner: artist.isWinner
    };
  }

  toAuditView(artist: Artist): AuditViewArtist {
    return {
      artistId: artist.artistId,
      name: artist.name,
      picture: artist.picture,
      votesCount: artist.votesCount,
      position: artist.position,
      percentage: artist.percentage,
      progress: artist.progress,
      slug: artist.slug,
      share: artist.share,
      isWinner: artist.isWinner
    };
  }
}
