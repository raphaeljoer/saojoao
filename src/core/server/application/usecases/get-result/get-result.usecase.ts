import { artistProps } from '../../../../../core/shared/data/artists';
import { Artist } from '../../../../../core/shared/domain/entities/artist';
import { Result } from '../../../../../core/shared/domain/entities/result';
import { fail, success } from '../../../../../core/shared/errors/either';
import { VoteRepositoryInterface } from '../../repository/vote.repository.interface';
import {
  GetResultUsecaseInterface,
  GetResultUsecaseOutput
} from './get-result-usecase.interface';

type Props = {
  voteRepository: VoteRepositoryInterface;
};

export class GetResultUsecase implements GetResultUsecaseInterface {
  private readonly voteRepository: VoteRepositoryInterface;

  constructor(props: Props) {
    this.voteRepository = props.voteRepository;
  }

  async execute(): Promise<GetResultUsecaseOutput> {
    const artists = artistProps.map((props) => new Artist(props));

    const totalVotesCount = await this.voteRepository.countVotesTotal();

    if (totalVotesCount.isFailure()) {
      return fail(totalVotesCount.value);
    }

    for (const artist of artists) {
      const countByIdResult = await this.voteRepository.countVotes({
        key: 'artistId',
        value: artist.artistId
      });

      if (countByIdResult.isFailure()) {
        return fail(countByIdResult.value);
      }

      artist.setVotesCount(countByIdResult.value);
    }

    const result = new Result({
      artists,
      totalVotesCount: totalVotesCount.value
    });

    return success(result.toJSON());
  }
}
