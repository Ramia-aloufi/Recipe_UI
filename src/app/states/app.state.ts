export interface IState<T> {
    loading: boolean;
    data: T | null;
    error: string | {} | null;
  }

