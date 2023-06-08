import { AuditViewArtist } from '../../../domain/entities/artist';
import { Result } from '../../../domain/entities/result';
import { ResultPresenterInterface } from './result.presenter.interface';

export class GetAuditResultPresenter implements ResultPresenterInterface {
  present(result: Result): AuditViewArtist[] {
    return result.artists.map((artist) => ({
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
    }));
  }
}
