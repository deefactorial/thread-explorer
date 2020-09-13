import { TestBed } from '@angular/core/testing';

import { CollectionDataCollectionsService } from './collection-data-collections.service';

describe('CollectionDataCollectionsService', () => {
  let service: CollectionDataCollectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectionDataCollectionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
