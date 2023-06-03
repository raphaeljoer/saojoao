import { Redis } from '@upstash/redis';
import { Pipeline } from '@upstash/redis/types/pkg/pipeline';

export type RedisConnectionProps = {
  host: string;
  token: string;
};

export class RedisConnection {
  private static instancePool: Map<string, RedisConnection> = new Map();
  private readonly redisInstance: Redis;

  private constructor(props: RedisConnectionProps) {
    console.log('[RedisConnection] Creating instance');
    this.redisInstance = new Redis({ url: props.host, token: props.token });
  }

  public static getInstance(props: RedisConnectionProps): RedisConnection {
    console.time('[RedisConnection].getInstance');
    const key = `${props.host}:${props.token}`;
    let instance = RedisConnection.instancePool.get(key);
    if (!instance) {
      instance = new RedisConnection(props);
      RedisConnection.instancePool.set(key, instance);
    }
    console.timeEnd('[RedisConnection].getInstance');
    return instance;
  }

  async incr(key: string): Promise<number> {
    return await this.redisInstance.incr(key);
  }

  async get<T>(key: string): Promise<T | null> {
    return await this.redisInstance.get<T>(key);
  }

  async rpush(key: string, value: string): Promise<number> {
    return await this.redisInstance.rpush(key, value);
  }

  async lrange<T>(key: string, start: number, stop: number): Promise<T[]> {
    return await this.redisInstance.lrange<T>(key, start, stop);
  }

  async llen(key: string): Promise<number> {
    return await this.redisInstance.llen(key);
  }

  async keys(pattern: string): Promise<string[]> {
    return await this.redisInstance.keys(pattern);
  }

  async mget<T>(...keys: string[]): Promise<T[]> {
    return await this.redisInstance.mget<T[]>(...keys);
  }

  async eval(script: string, keys: string[], args: string[]): Promise<any> {
    return await this.redisInstance.eval(script, keys, args);
  }

  multi(): Pipeline<[]> {
    return this.redisInstance.multi();
  }
}
