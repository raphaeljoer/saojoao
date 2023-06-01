import { Redis } from '@upstash/redis';

export type RedisConnectionProps = {
  host: string;
  token: string;
};

export class RedisConnection {
  private readonly instance: Redis;

  constructor(props: RedisConnectionProps) {
    this.instance = new Redis({ url: props.host, token: props.token });
  }

  async incr(key: string): Promise<number> {
    return await this.instance.incr(key);
  }

  async get<T>(key: string): Promise<T | null> {
    return await this.instance.get<T>(key);
  }

  async rpush(key: string, value: string): Promise<number> {
    return await this.instance.rpush(key, value);
  }

  async lrange<T>(key: string, start: number, stop: number): Promise<T[]> {
    return await this.instance.lrange<T>(key, start, stop);
  }

  async llen(key: string): Promise<number> {
    return await this.instance.llen(key);
  }

  async keys(pattern: string): Promise<string[]> {
    return await this.instance.keys(pattern);
  }

  async mget<T>(...keys: string[]): Promise<T[]> {
    return await this.instance.mget<T[]>(...keys);
  }
}
