import { TestBed } from '@angular/core/testing';

import { PurchaseRequestsService } from './purchase-requests.service';

describe('PurchaseRequestsService', () => {
  let service: PurchaseRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
