import { VoteRepositoryInterface } from '@/core/server/application/repository/vote.repository.interface';
import { VoteDto } from '@/core/server/domain/dto/vote.dto.type';
import { fail, success } from '@/core/shared/errors/either';
import {
  AddRepositoryOutput,
  CountByIdRepositoryOutput,
  CountTotalRepositoryOutput
} from '../../../application/repository/vote.repository.interface';
import { MongoDbConnection } from '../connection/mongodb-connection';
import { AddRepositoryError } from './errors/AddRepositoryError';
import { CountByIdRepositoryError } from './errors/CountByIdRepositoryError';
import { CountTotalRepositoryError } from './errors/CountTotalRepositoryError';

type Props = {
  connection: MongoDbConnection;
};
export class VoteRepositoryAuditLogMongodb implements VoteRepositoryInterface {
  private readonly connection: MongoDbConnection;
  private readonly collectionName: string;

  constructor(props: Props) {
    this.connection = props.connection;
    this.collectionName = 'votes';
  }

  async add(vote: VoteDto): Promise<AddRepositoryOutput> {
    try {
      console.time('[VoteRepositoryAuditLogMongodb].add');
      await this.connection.insertOne({
        collectionName: this.collectionName,
        document: vote
      });
      console.timeEnd('[VoteRepositoryAuditLogMongodb].add');
      return success(vote);
    } catch (error) {
      console.error(error);
      return fail(new AddRepositoryError('Vote'));
    }
  }

  async countTotal(): Promise<CountTotalRepositoryOutput> {
    try {
      console.time('[VoteRepositoryAuditLogMongodb].countTotal');
      const totalVotes = await this.connection.estimatedDocumentCount(this.collectionName); //prettier-ignore
      console.timeEnd('[VoteRepositoryAuditLogMongodb].countTotal');
      return success(totalVotes);
    } catch (error) {
      console.error(error);
      return fail(new CountTotalRepositoryError());
    }
  }

  async countById(artistId: string): Promise<CountByIdRepositoryOutput> {
    try {
      console.time('[VoteRepositoryAuditLogMongodb].countById');
      const count = await this.connection.countDocuments({
        collectionName: this.collectionName,
        key: 'artistId',
        value: artistId
      });
      console.timeEnd('[VoteRepositoryAuditLogMongodb].countById');
      return success(count);
    } catch (error) {
      console.error(error);
      return fail(new CountByIdRepositoryError());
    }
  }
}
