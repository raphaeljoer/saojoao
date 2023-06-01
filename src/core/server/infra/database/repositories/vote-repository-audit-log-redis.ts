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

export class VoteRepositoryAuditLogRedis implements VoteRepositoryInterface {
  private readonly connection: RedisConnection;

  constructor(props: Props) {
    this.connection = props.connection;
  }

  async add(input: VoteDto): Promise<AddRepositoryOutput> {
    try {
      await this.connection.rpush('audit-log', JSON.stringify(input));
      return success(input);
    } catch (error) {
      console.error(error);
      return fail(new AddRepositoryError('VoteRepositoryAuditLogRedis'));
    }
  }

  async countTotal(): Promise<CountTotalRepositoryOutput> {
    try {
      const total = await this.connection.llen('audit-log');
      return success(total);
    } catch (error) {
      console.error(error);
      return fail(new CountTotalRepositoryError());
    }
  }

  async countById(artistId: string): Promise<CountByIdRepositoryOutput> {
    try {
      const auditLog = await this.connection.lrange<string>('audit-log', 0, -1);
      const count = auditLog.filter((item) => {
        const vote = JSON.parse(item);
        return vote.artistId === artistId;
      }).length;
      return success(count || 0);
    } catch (error) {
      console.error(error);
      return fail(new CountByIdRepositoryError());
    }
  }
}
