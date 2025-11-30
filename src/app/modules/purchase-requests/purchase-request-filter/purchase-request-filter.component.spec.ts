import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseRequestFilterComponent } from './purchase-request-filter.component';

describe('PurchaseRequestFilterComponent', () => {
  let component: PurchaseRequestFilterComponent;
  let fixture: ComponentFixture<PurchaseRequestFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchaseRequestFilterComponent]
    });
    fixture = TestBed.createComponent(PurchaseRequestFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
