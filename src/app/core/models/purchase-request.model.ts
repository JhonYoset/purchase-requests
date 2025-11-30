export type PurchaseRequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface PurchaseRequest {
  id: string;
  requester: string;
  amount: number;
  status: PurchaseRequestStatus;
  createdAt: string;
}

export interface PurchaseRequestsState {
  requests: PurchaseRequest[];
  loading: boolean;
  error: string | null;
  optimisticUpdates: Map<string, PurchaseRequest>;
}
