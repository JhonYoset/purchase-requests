import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PurchaseRequest, PurchaseRequestStatus } from 'src/app/core/models/purchase-request.model';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseRequestsService {
  private readonly URL = `${environment.api}/purchase-requests`;

  constructor(private http: HttpClient) { }

  getPurchaseRequests(): Observable<PurchaseRequest[]> {
  return this.http.get<{data: PurchaseRequest[]}>(this.URL).pipe(
    map(response => response.data)
  );
}

  updateStatus(id: string, newStatus: PurchaseRequestStatus): Observable<PurchaseRequest> {
    const body = { status: newStatus };
    return this.http.patch<PurchaseRequest>(`${this.URL}/${id}/status`, body);
  }
}