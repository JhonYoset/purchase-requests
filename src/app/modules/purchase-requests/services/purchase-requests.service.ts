import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PurchaseRequest, PurchaseRequestStatus } from 'src/app/core/models/purchase-request.model';
import { environment } from 'src/app/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PurchaseRequestsService {

  private readonly URL = environment.api; 

  constructor(private http: HttpClient) { }


  getPurchaseRequests(): Observable<PurchaseRequest[]> {
    return this.http.get<{ data: PurchaseRequest[] }>(`${this.URL}/purchase-requests`).pipe(
      map(response => response.data)
    );
  }

  updateStatus(id: string, newStatus: PurchaseRequestStatus): Observable<void> {
    const body = { status: newStatus };
    return this.http.patch<void>(`${this.URL}/purchase-requests/${id}/status`, body);
  }
}