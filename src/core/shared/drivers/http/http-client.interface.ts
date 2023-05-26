export interface HttpClientInterface {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, body?: any): Promise<T>;
}
