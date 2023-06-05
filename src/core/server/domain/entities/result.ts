import { Artist } from './artist';
import { Entity } from './entity';

type Props = {
  id?: string;
  artists: Artist[];
  totalVotesCount: number;
};

export class Result extends Entity {
  private readonly _artists: Artist[];
  private readonly totalVotesCount: number;

  constructor(props: Props) {
    super(props.id);
    this._artists = props.artists;
    this.totalVotesCount = props.totalVotesCount;
    this.sort();
    this.setPositions();
    this.setPercentages();
    this.setProgress();
  }

  get artists(): Artist[] {
    return this._artists;
  }

  private sort(): void {
    this._artists.sort((a, b) => {
      if (
        typeof a.votesCount !== 'number' ||
        typeof b.votesCount !== 'number'
      ) {
        throw new Error('votesCount must to be a number');
      }
      return b.votesCount - a.votesCount;
    });
  }

  private setPositions(): void {
    this._artists.forEach((artist, index) => {
      artist.setPosition(index + 1);
    });
  }

  private setPercentages(): void {
    this._artists.forEach((artist) => {
      if (typeof artist.votesCount !== 'number') {
        throw new Error('Votes count is not defined');
      }
      artist.setPercentage((artist.votesCount / this.totalVotesCount) * 100);
    });
  }

  private setProgress(): void {
    this._artists.forEach((artist) => {
      if (typeof artist.votesCount !== 'number') {
        throw new Error('Votes count is not defined');
      }
      const winnerVotesCount = this._artists[0]?.votesCount ?? 0;
      artist.setProgress((artist.votesCount * 100) / winnerVotesCount);
    });
  }
}
