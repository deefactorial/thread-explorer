import { TestBed } from '@angular/core/testing';

import { InstanceEntityDataCollectionsService } from './instance-entity-data-collections.service';

describe('ThreadEntityDataCollectionsService', () => {
  let service: InstanceEntityDataCollectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstanceEntityDataCollectionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
