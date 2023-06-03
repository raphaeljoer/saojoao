import { Artist, SerializedArtist } from './artist';
import { Entity } from './entity';

type Props = {
  id?: string;
  artists: Artist[];
  totalVotesCount: number;
};

export class Result extends Entity<SerializedArtist[]> {
  private readonly artists: Artist[];
  private readonly totalVotesCount: number;

  constructor(props: Props) {
    super(props.id);
    this.artists = props.artists;
    this.totalVotesCount = props.totalVotesCount;
    this.sort();
    this.setPositions();
    this.setPercentages();
    this.setProgress();
  }

  sort(): void {
    this.artists.sort((a, b) => {
      if (
        typeof a.votesCount !== 'number' ||
        typeof b.votesCount !== 'number'
      ) {
        throw new Error('votesCount must to be a number');
      }
      return b.votesCount - a.votesCount;
    });
  }

  setPositions(): void {
    this.artists.forEach((artist, index) => {
      artist.setPosition(index + 1);
    });
  }

  setPercentages(): void {
    this.artists.forEach((artist) => {
      if (typeof artist.votesCount !== 'number') {
        throw new Error('Votes count is not defined');
      }
      artist.setPercentage((artist.votesCount / this.totalVotesCount) * 100);
    });
  }

  setProgress(): void {
    this.artists.forEach((artist) => {
      if (typeof artist.votesCount !== 'number') {
        throw new Error('Votes count is not defined');
      }
      const winnerVotesCount = this.artists[0]?.votesCount ?? 0;
      artist.setProgress((artist.votesCount * 100) / winnerVotesCount);
    });
  }

  toJSON(): SerializedArtist[] {
    return this.artists.map((artist) => artist.toJSON());
  }
}
