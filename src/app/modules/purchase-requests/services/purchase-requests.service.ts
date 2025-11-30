import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, of, throwError } from 'rxjs';
import { PurchaseRequest, PurchaseRequestStatus } from 'src/app/core/models/purchase-request.model';

@Injectable({
  providedIn: 'root'
})
export class PurchaseRequestsService {
  private apiUrl = '/api/purchase-requests';

  private mockData: PurchaseRequest[] = [
    {
      id: '1',
      requester: 'Juan Pérez',
      amount: 1500.50,
      status: 'PENDING',
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      requester: 'María García',
      amount: 3200.00,
      status: 'APPROVED',
      createdAt: '2024-01-14T14:20:00Z'
    },
    {
      id: '3',
      requester: 'Carlos López',
      amount: 890.75,
      status: 'PENDING',
      createdAt: '2024-01-16T09:15:00Z'
    },
    {
      id: '4',
      requester: 'Ana Martínez',
      amount: 5500.00,
      status: 'REJECTED',
      createdAt: '2024-01-13T16:45:00Z'
    },
    {
      id: '5',
      requester: 'Pedro Sánchez',
      amount: 2100.25,
      status: 'APPROVED',
      createdAt: '2024-01-17T11:00:00Z'
    },
    {
      id: '6',
      requester: 'Laura Rodríguez',
      amount: 750.00,
      status: 'PENDING',
      createdAt: '2024-01-18T08:30:00Z'
    }
  ];

  constructor(private http: HttpClient) {}

  getPurchaseRequests(): Observable<PurchaseRequest[]> {
    return of([...this.mockData]).pipe(delay(800));
  }

  updateStatus(id: string, newStatus: PurchaseRequestStatus): Observable<void> {
    const request = this.mockData.find(r => r.id === id);

    if (!request) {
      return throwError(() => new Error('Solicitud no encontrada'));
    }

    if (Math.random() > 0.85) {
      return throwError(() => new Error('Error al actualizar el estado'));
    }

    request.status = newStatus;
    return of(void 0).pipe(delay(500));
  }
}
