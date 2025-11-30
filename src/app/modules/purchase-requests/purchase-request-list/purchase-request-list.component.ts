import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseRequest, PurchaseRequestStatus } from 'src/app/core/models/purchase-request.model';
import { StatusBorderDirective } from 'src/app/shared/directives/status-border.directive';

export interface StatusChangeEvent {
  id: string;
  newStatus: PurchaseRequestStatus;
}

@Component({
  selector: 'app-purchase-request-list',
  templateUrl: './purchase-request-list.component.html',
  styleUrls: ['./purchase-request-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, StatusBorderDirective]
})
export class PurchaseRequestListComponent {
  @Input() requests: PurchaseRequest[] = [];
  @Output() statusChange = new EventEmitter<StatusChangeEvent>();

  trackByRequestId(index: number, request: PurchaseRequest): string {
    return request.id;
  }

  onStatusChange(id: string, newStatus: PurchaseRequestStatus): void {
    this.statusChange.emit({ id, newStatus });
  }

  getStatusLabel(status: PurchaseRequestStatus): string {
    const labels: Record<PurchaseRequestStatus, string> = {
      PENDING: 'Pendiente',
      APPROVED: 'Aprobada',
      REJECTED: 'Rechazada'
    };
    return labels[status];
  }
}
