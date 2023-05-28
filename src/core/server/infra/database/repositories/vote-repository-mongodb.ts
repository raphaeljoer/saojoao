import { VoteDto } from '@/core/shared/domain/dto/vote.dto.type';
import { fail, success } from '@/core/shared/errors/either';
import {
  AddVoteRepositoryOutput,
  CountByIdRepositoryInput,
  CountTotalVotesRepositoryOutput,
  CountVotesRepositoryOutput,
  VoteRepositoryInterface
} from '../../../application/repository/vote.repository.interface';
import { MongoDbConnectionInterface } from '../connection/mongodb-connection.interface';
import { AddVoteRepositoryError } from './errors/AddVoteRepositoryError';
import { CountTotalVotesRepositoryError } from './errors/CountTotalVotesRepositoryError';
import { CountVotesRepositoryError } from './errors/CountVotesRepositoryError';

type Props = {
  connection: MongoDbConnectionInterface;
};
export class VoteRepositoryMongodb implements VoteRepositoryInterface {
  private readonly connection: MongoDbConnectionInterface;
  private readonly collectionName: string;

  constructor(private readonly props: Props) {
    this.connection = this.props.connection;
    this.collectionName = 'votes';
  }

  async addVote(vote: VoteDto): Promise<AddVoteRepositoryOutput> {
    try {
      await this.connection.insertOne({
        collectionName: this.collectionName,
        document: vote
      });

      return success(vote);
    } catch (error) {
      return fail(new AddVoteRepositoryError());
    }
  }

  async countVotesTotal(): Promise<CountTotalVotesRepositoryOutput> {
    try {
      const totalVotes = await this.connection.estimatedDocumentCount(this.collectionName); //prettier-ignore
      return success(totalVotes);
    } catch (e) {
      return fail(new CountTotalVotesRepositoryError());
    }
  }

  //prettier-ignore
  async countVotes({ key, value }: CountByIdRepositoryInput): Promise<CountVotesRepositoryOutput> {
    try {
      const count = await this.connection.countDocuments({
        collectionName: this.collectionName,
        key,
        value
      });

      return success(count);
    } catch(e) {
      return fail(new CountVotesRepositoryError());
    }
  }
}
