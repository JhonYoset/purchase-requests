import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as PurchaseRequestsActions from '../../store/purchase-requests.actions';
import { PurchaseRequestListComponent, StatusChangeEvent } from "../../purchase-request-list/purchase-request-list.component";
import { FilterCriteria, PurchaseRequestFilterComponent } from "../../purchase-request-filter/purchase-request-filter.component";
import { PurchaseRequest } from 'src/app/core/models/purchase-request.model';
import { selectAllRequests, selectError, selectLoading } from '../../store/purchase-requests.selectors';

@Component({
  selector: 'app-purchase-requests-page',
  templateUrl: './purchase-requests-page.component.html',
  styleUrls: ['./purchase-requests-page.component.css'],
  standalone: true,
  imports: [CommonModule, PurchaseRequestFilterComponent, PurchaseRequestListComponent]
})
export class PurchaseRequestsPageComponent implements OnInit {
  @ViewChild(PurchaseRequestFilterComponent) filterComponent!: PurchaseRequestFilterComponent;
  
  allRequests$: Observable<PurchaseRequest[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  filteredRequests$!: Observable<PurchaseRequest[]>;

  constructor(private store: Store) {
    this.allRequests$ = this.store.select(selectAllRequests);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit(): void {
    console.log('🚀 Component initialized - Loading requests...');
    this.loadRequests();
    
    // Debug: Subscribirse para ver los datos
    this.allRequests$.subscribe(requests => {
      console.log('📦 All requests from store:', requests);
      console.log('📊 Total requests:', requests.length);
    });

    this.loading$.subscribe(loading => {
      console.log('⏳ Loading state:', loading);
    });

    this.error$.subscribe(error => {
      console.log('❌ Error state:', error);
    });

    setTimeout(() => {
      if (this.filterComponent?.filter$) {
        this.filteredRequests$ = combineLatest([
          this.allRequests$,
          this.filterComponent.filter$
        ]).pipe(
          map(([requests, filter]) => {
            const filtered = this.filterRequests(requests, filter);
            console.log('🔍 Filtered requests:', filtered);
            return filtered;
          })
        );
      } else {
        console.log('⚠️ No filter component, using all requests');
        this.filteredRequests$ = this.allRequests$;
      }
    });
  }

  loadRequests(): void {
    console.log('📡 Dispatching loadPurchaseRequests action...');
    this.store.dispatch(PurchaseRequestsActions.loadPurchaseRequests());
  }

  onStatusChange(event: StatusChangeEvent): void {
    console.log('🔄 Status change requested:', event);
    this.store.dispatch(
      PurchaseRequestsActions.updateStatus({
        id: event.id,
        newStatus: event.newStatus
      })
    );
  }

  private filterRequests(requests: PurchaseRequest[], filter: FilterCriteria): PurchaseRequest[] {
    return requests.filter(request => {
      const matchesSearch = filter.searchText === '' ||
        request.requester.toLowerCase().includes(filter.searchText.toLowerCase());
      const matchesStatus = filter.status === 'ALL' || request.status === filter.status;
      return matchesSearch && matchesStatus;
    });
  }

  getPendingCount(requests: PurchaseRequest[]): number {
    return requests.filter(r => r.status === 'PENDING').length;
  }

  getApprovedCount(requests: PurchaseRequest[]): number {
    return requests.filter(r => r.status === 'APPROVED').length;
  }

  getRejectedCount(requests: PurchaseRequest[]): number {
    return requests.filter(r => r.status === 'REJECTED').length;
  }
}