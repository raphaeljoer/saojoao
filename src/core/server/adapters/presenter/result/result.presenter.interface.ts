import { Result } from '@/core/server/domain/entities/result';

export interface ResultPresenterInterface {
  present(result: Result): any;
}
