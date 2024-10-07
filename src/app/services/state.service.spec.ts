import { TestBed } from '@angular/core/testing';
import { StateService } from './state.service';
import { Category } from '../models/category.model';


describe('StateService', () => {
  let service: StateService<Category>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
