import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseRequestsPageComponent } from './purchase-requests-page.component';

describe('PurchaseRequestsPageComponent', () => {
  let component: PurchaseRequestsPageComponent;
  let fixture: ComponentFixture<PurchaseRequestsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchaseRequestsPageComponent]
    });
    fixture = TestBed.createComponent(PurchaseRequestsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
