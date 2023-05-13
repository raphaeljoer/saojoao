import { artistProps } from "../../../../../core/shared/data/artists";
import { Artist } from "../../../../../core/shared/domain/entities/artist";
import { Result } from "../../../../../core/shared/domain/entities/result";
import { fail, success } from "../../../../../core/shared/errors/either";
import { VoteRepositoryInterface } from "../../repository/vote.repository.interface";
import { UnexpectedError } from "../errors/unexpected-error";
import { GetResultUsecaseInterface, GetResultUsecaseOutput } from "./get-result-usecase.interface";

type Props = {
  voteRepository: VoteRepositoryInterface
};

export class GetResultUsecase implements GetResultUsecaseInterface {
  private readonly voteRepository: VoteRepositoryInterface;

  constructor(private readonly props: Props) {
    this.voteRepository = this.props.voteRepository;
  }

  async execute(): Promise<GetResultUsecaseOutput> {
    const artists = artistProps.map((props) => new Artist(props));
    const totalVotesCount = await this.voteRepository.countVotesTotal();

    if(!totalVotesCount) return fail(new UnexpectedError());

    for(const artist of artists) {
      const countByIdResult = await this.voteRepository.countVotes({ 
        key: 'artistId', 
        value: artist.artistId 
      });
      artist.setVotesCount(countByIdResult);
    };

    const result = new Result({ artists, totalVotesCount });
    
    return success(result.generateResult());
  }
}