import {PaginationMeta} from '../models/api.model'

export interface IState<T> {
    loading: boolean;
    data: T | null;
    error: string | {} | null;
    meta?: PaginationMeta | undefined;
  }

