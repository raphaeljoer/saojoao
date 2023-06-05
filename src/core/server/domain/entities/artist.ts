import { Entity } from './entity';

type Props = {
  artistId: string;
  name: string;
  picture: string;
};

export type PublicViewArtist = {
  artistId: string;
  name: string;
  picture: string;
  percentage: number | null;
  position: number | null;
  progress: number | null;
  slug: string;
  share: {
    feed: string;
    stories: string;
  };
  isWinner: boolean;
};

export type AuditViewArtist = {
  artistId: string;
  name: string;
  picture: string;
  votesCount: number | null;
  percentage: number | null;
  position: number | null;
  progress: number | null;
  slug: string;
  share: {
    feed: string;
    stories: string;
  };
  isWinner: boolean;
};

export class Artist extends Entity {
  public readonly artistId: string;
  public readonly name: string;
  public readonly picture: string;

  public percentage: number = 0;
  public position: number = 0;
  public progress: number = 0;
  public votesCount: number = 0;

  constructor(props: Props) {
    super(props.artistId);
    this.artistId = props.artistId;
    this.picture = props.picture;
    this.name = props.name;
  }

  get slug() {
    return this.artistId.replace(/_/g, '-');
  }

  get isWinner() {
    return this.position === 1;
  }

  get share() {
    const path = `/assets/artists`;
    return {
      feed: `${path}/${this.slug}-feed.jpeg`,
      stories: `${path}/${this.slug}-stories.jpeg`
    };
  }

  setVotesCount(votesCount: number) {
    this.votesCount = votesCount;
  }

  setPercentage(percentage: number) {
    this.percentage = percentage;
  }

  setProgress(progress: number) {
    this.progress = progress;
  }

  setPosition(position: number) {
    this.position = position;
  }
}
