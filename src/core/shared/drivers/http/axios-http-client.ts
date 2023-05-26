import axios from 'axios';
import { HttpClientInterface } from './http-client.interface';

export class AxiosHttpClient implements HttpClientInterface {
  private readonly httpClient: typeof axios;

  constructor() {
    this.httpClient = axios;
  }

  async get<T>(url: string): Promise<T> {
    return (await this.httpClient.get(url)).data;
  }

  async post<T>(url: string, body: any): Promise<T> {
    return (await this.httpClient.post(url, body)).data;
  }
}
