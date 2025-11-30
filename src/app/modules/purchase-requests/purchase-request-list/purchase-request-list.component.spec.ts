import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseRequestListComponent } from './purchase-request-list.component';

describe('PurchaseRequestListComponent', () => {
  let component: PurchaseRequestListComponent;
  let fixture: ComponentFixture<PurchaseRequestListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchaseRequestListComponent]
    });
    fixture = TestBed.createComponent(PurchaseRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
