import { VoteDto } from '../../../../../core/server/domain/dto/vote.dto.type';
import { fail, success } from '../../../../../core/shared/errors/either';
import {
  AddRepositoryOutput,
  CountByIdRepositoryOutput,
  CountTotalRepositoryOutput,
  VoteRepositoryInterface
} from '../../../application/repository/vote.repository.interface';
import { RedisConnection } from '../connection/redis-connection';
import { AddRepositoryError } from './errors/AddRepositoryError';
import { CountByIdRepositoryError } from './errors/CountByIdRepositoryError';
import { CountTotalRepositoryError } from './errors/CountTotalRepositoryError';

type Props = {
  connection: RedisConnection;
};

export class VoteRepositoryCounterRedis implements VoteRepositoryInterface {
  private readonly connection: RedisConnection;

  constructor(props: Props) {
    this.connection = props.connection;
  }

  async add(input: VoteDto): Promise<AddRepositoryOutput> {
    try {
      await this.connection.incr(input.artistId);
      return success(input);
    } catch (error) {
      console.error(error);
      return fail(new AddRepositoryError('VoteRepositoryCounterRedis'));
    }
  }

  async countTotal(): Promise<CountTotalRepositoryOutput> {
    try {
      const keys = await this.connection.keys('*');
      const count = await this.connection.mget<number>(...keys);
      const total = count.reduce((acc, curr) => acc + (curr || 0), 0);
      return success(total);
    } catch (error) {
      console.error(error);
      return fail(new CountTotalRepositoryError());
    }
  }

  async countById(artistId: string): Promise<CountByIdRepositoryOutput> {
    try {
      const count = await this.connection.get<number>(artistId);
      return success(count || 0);
    } catch (error) {
      console.error(error);
      return fail(new CountByIdRepositoryError());
    }
  }
}
