import { VoteDto } from '../../../../../core/server/domain/dto/vote.dto.type';
import {
  Either,
  fail,
  success
} from '../../../../../core/shared/errors/either';
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
import { PartialResultError } from './errors/PartialResultError';

type Props = {
  connection: RedisConnection;
};

type PartialResult = {
  total: number;
  [key: string]: number;
};

export type PartialResultOutput = Either<PartialResultError, PartialResult>;
//prettier-ignore
export interface VoteRepositoryAuditLogInterface extends VoteRepositoryInterface {
  partialResult(): Promise<PartialResultOutput>;
}

//prettier-ignore
export class VoteRepositoryAuditLogRedis implements VoteRepositoryAuditLogInterface {
  private readonly connection: RedisConnection;

  constructor(props: Props) {
    this.connection = props.connection;
  }

  async add(input: VoteDto): Promise<AddRepositoryOutput> {
    try {
      console.time('[VoteRepositoryAuditLogRedis].add');
      const transaction = this.connection.multi();
      transaction.rpush('@audit-log', JSON.stringify(input));
      transaction.incr('@total');
      transaction.incr(`artist:${input.artistId}`);
      await transaction.exec();
      console.timeEnd('[VoteRepositoryAuditLogRedis].add');
      return success(input);
    } catch (error) {
      console.error(error);
      console.timeEnd('[VoteRepositoryAuditLogRedis].add');
      return fail(new AddRepositoryError('VoteRepositoryAuditLogRedis'));
    }
  }

  async countTotal(): Promise<CountTotalRepositoryOutput> {
    try {
      console.time('[VoteRepositoryAuditLogRedis].countTotal');
      const total = await this.connection.get<number>(`@total`);
      console.timeEnd('[VoteRepositoryAuditLogRedis].countTotal');
      return success(total || 0);
    } catch (error) {
      console.error(error);
      console.timeEnd('[VoteRepositoryAuditLogRedis].countTotal');
      return fail(new CountTotalRepositoryError());
    }
  }

  async countById(artistId: string): Promise<CountByIdRepositoryOutput> {
    try {
      console.time('[VoteRepositoryAuditLogRedis].countById');
      const key = `artist:${artistId}`;
      const count = await this.connection.get<number>(key);
      console.timeEnd('[VoteRepositoryAuditLogRedis].countById');
      return success(count || 0);
    } catch (error) {
      console.error(error);
      console.timeEnd('[VoteRepositoryAuditLogRedis].countById');
      return fail(new CountByIdRepositoryError());
    }
  }

  async partialResult(): Promise<PartialResultOutput> {
    try {
      console.time('[VoteRepositoryAuditLogRedis].partialResult');
      const script = `
        local total = tonumber(redis.call('get', KEYS[1])) or 0
        local artists = redis.call('keys', 'artist:*')
        local result = {}
        for _, artistId in ipairs(artists) do
          local count = tonumber(redis.call('get', artistId)) or 0
          local artistName = artistId:gsub('artist:', '')
          result[artistName] = count
        end
        result.total = total
        return cjson.encode(result)
      `;
      const keys = ['@total'];
      const result = await this.connection.eval(script, keys, []);

      console.timeEnd('[VoteRepositoryAuditLogRedis].partialResult');
      return success(result);
    } catch (error) {
      console.timeEnd('[VoteRepositoryAuditLogRedis].partialResult');
      console.error(error);
      return fail(new PartialResultError());
    }
  }
}
