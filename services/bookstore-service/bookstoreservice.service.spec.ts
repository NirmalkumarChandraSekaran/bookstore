import { TestBed } from '@angular/core/testing';

import { BookstoreserviceService } from './bookstoreservice.service';

describe('BookstoreserviceService', () => {
  let service: BookstoreserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookstoreserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
