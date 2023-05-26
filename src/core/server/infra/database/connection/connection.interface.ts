export interface ConnectionInterface<T> {
  connect(): Promise<T>;
  disconnect(): Promise<void>;
}
