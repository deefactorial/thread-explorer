import { TestBed } from '@angular/core/testing';

import { ThreadDataCollectionsService } from './thread-data-collections.service';

describe('ThreadDataCollectionsService', () => {
  let service: ThreadDataCollectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThreadDataCollectionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
