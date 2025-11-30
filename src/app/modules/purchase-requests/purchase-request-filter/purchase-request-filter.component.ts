import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { debounceTime, startWith } from 'rxjs/operators';
import { PurchaseRequestStatus } from 'src/app/core/models/purchase-request.model';

export interface FilterCriteria {
  searchText: string;
  status: PurchaseRequestStatus | 'ALL';
}

@Component({
  selector: 'app-purchase-request-filter',
  templateUrl: './purchase-request-filter.component.html',
  styleUrls: ['./purchase-request-filter.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class PurchaseRequestFilterComponent implements OnInit {
  searchControl = new FormControl('', { nonNullable: true });
  statusControl = new FormControl<PurchaseRequestStatus | 'ALL'>('ALL', { nonNullable: true });

  filter$!: Observable<FilterCriteria>;

  ngOnInit() {
    const searchText$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      startWith('')
    );

    const status$ = this.statusControl.valueChanges.pipe(
      startWith('ALL' as PurchaseRequestStatus | 'ALL')
    );

    this.filter$ = new Observable<FilterCriteria>(observer => {
      let latestSearchText = '';
      let latestStatus: PurchaseRequestStatus | 'ALL' = 'ALL';

      searchText$.subscribe(searchText => {
        latestSearchText = searchText;
        observer.next({
          searchText: latestSearchText,
          status: latestStatus
        });
      });

      status$.subscribe(status => {
        latestStatus = status;
        observer.next({
          searchText: latestSearchText,
          status: latestStatus
        });
      });
    });
  }
}
