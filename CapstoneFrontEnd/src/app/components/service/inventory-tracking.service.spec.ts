import { TestBed } from '@angular/core/testing';

import { InventoryTrackingService } from './inventory-tracking.service';

describe('InventoryTrackingService', () => {
  let service: InventoryTrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryTrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
