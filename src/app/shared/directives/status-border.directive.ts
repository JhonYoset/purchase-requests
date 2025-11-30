import { Directive, ElementRef, Input, OnChanges, SimpleChanges, Renderer2 } from '@angular/core';
import { PurchaseRequestStatus } from 'src/app/core/models/purchase-request.model';

@Directive({
  selector: '[appStatusBorder]',
  standalone: true
})
export class StatusBorderDirective implements OnChanges {
  @Input() appStatusBorder: PurchaseRequestStatus = 'PENDING';

  private readonly statusColors: Record<PurchaseRequestStatus, string> = {
    APPROVED: '#198754',
    REJECTED: '#dc3545',
    PENDING: '#ffc107'
  };

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appStatusBorder']) {
      this.updateBorder();
    }
  }

  private updateBorder(): void {
    const color = this.statusColors[this.appStatusBorder];
    this.renderer.setStyle(this.el.nativeElement, 'border-left', `5px solid ${color}`);
    this.renderer.setStyle(this.el.nativeElement, 'border-left-width', '5px');
  }
}
