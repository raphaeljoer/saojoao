import { artistProps } from '../../../../../core/shared/data/artists';
import { fail, success } from '../../../../../core/shared/errors/either';
import { Artist } from '../../../domain/entities/artist';
import { Result } from '../../../domain/entities/result';
import { VoteRepositoryInterface } from '../../repository/vote.repository.interface';
import {
  GetResultUsecaseInterface,
  GetResultUsecaseOutput
} from './get-result-usecase.interface';

type Props = {
  voteRepositoryCounter: VoteRepositoryInterface;
};

export class GetResultUsecase implements GetResultUsecaseInterface {
  private readonly voteRepositoryCounter: VoteRepositoryInterface;

  constructor(props: Props) {
    this.voteRepositoryCounter = props.voteRepositoryCounter;
  }

  async execute(): Promise<GetResultUsecaseOutput> {
    console.time('[GetResultUsecase].execute');
    const artists = artistProps.map((props) => new Artist(props));

    const totalVotesCount = await this.voteRepositoryCounter.countTotal();

    if (totalVotesCount.isFailure()) {
      return fail(totalVotesCount.value);
    }

    for (const artist of artists) {
      const countByIdResult = await this.voteRepositoryCounter.countById(artist.artistId); //prettier-ignore

      if (countByIdResult.isFailure()) {
        return fail(countByIdResult.value);
      }

      artist.setVotesCount(countByIdResult.value);
    }

    const result = new Result({
      artists,
      totalVotesCount: totalVotesCount.value
    });

    console.timeEnd('[GetResultUsecase].execute');
    return success(result.toJSON());
  }
}
