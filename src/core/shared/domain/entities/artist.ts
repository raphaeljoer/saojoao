type Props = {
  artistId: string;
  name: string;
  picture: string;
};

export type SerializedArtist = {
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

export class Artist {
  public readonly artistId: string;
  public readonly name: string;
  public readonly picture: string;

  public percentage!: number | null;
  public position!: number | null;
  public progress!: number | null;
  public votesCount!: number | null;

  constructor(props: Props) {
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

  toJSON(): SerializedArtist {
    return {
      artistId: this.artistId,
      name: this.name,
      picture: this.picture,
      percentage: this.percentage ?? null,
      position: this.position ?? null,
      progress: this.progress ?? null,
      slug: this.slug,
      share: this.share,
      isWinner: this.isWinner
    };
  }
}
