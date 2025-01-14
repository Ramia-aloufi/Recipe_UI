import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IState } from '../states/app.state';
import { PaginationMeta } from '../models/api.model';

@Injectable({
  providedIn: 'root'
})
export class StateService<T> {
  private state$: BehaviorSubject<IState<T | null>>;

  constructor() { 
    this.state$ = new BehaviorSubject<IState<T | null>>({
      loading: false,
      data: null,
      error: null,
      meta:undefined
    });
  }
   // Getter to expose the current state as an observable
   getState(): Observable<IState<T | null>> {
    return this.state$.asObservable();
  }

  // Update the state with new data
  private setState(newState: Partial<IState<T>>) {
    const currentState = this.state$.value;
    this.state$.next({
      ...currentState,
      ...newState,
    });
  }

  // For loading indication
  setLoading(loading: boolean) {
    this.setState({ loading });
  }

  // For data updates
  setData(data: T | null) {
    this.setState({ data, loading: false, error: null });
  }
  setMeta(meta: PaginationMeta | undefined) {
    this.setState({ meta, loading: false, error: null });
  }
  // For error handling
  setError(error: string | {}) {
    this.setState({ error, loading: false });
  }
}
