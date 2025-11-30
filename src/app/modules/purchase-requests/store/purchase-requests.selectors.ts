import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PurchaseRequestsState, PurchaseRequestStatus } from 'src/app/core/models/purchase-request.model';


export const selectPurchaseRequestsState = createFeatureSelector<PurchaseRequestsState>('purchaseRequests');

export const selectAllRequests = createSelector(
  selectPurchaseRequestsState,
  (state) => state.requests
);

export const selectLoading = createSelector(
  selectPurchaseRequestsState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectPurchaseRequestsState,
  (state) => state.error
);

export const selectPendingRequests = createSelector(
  selectAllRequests,
  (requests) => requests.filter(r => r.status === 'PENDING')
);

export const selectRequestsByStatus = (status: PurchaseRequestStatus) => createSelector(
  selectAllRequests,
  (requests) => requests.filter(r => r.status === status)
);

export const totalAmountByStatus = (status: PurchaseRequestStatus) => createSelector(
  selectRequestsByStatus(status),
  (requests) => requests.reduce((total, request) => total + request.amount, 0)
);

export const selectAllRequestsWithStats = createSelector(
  selectAllRequests,
  (requests) => {
    const pending = requests.filter(r => r.status === 'PENDING');
    const approved = requests.filter(r => r.status === 'APPROVED');
    const rejected = requests.filter(r => r.status === 'REJECTED');

    return {
      requests,
      stats: {
        total: requests.length,
        pending: pending.length,
        approved: approved.length,
        rejected: rejected.length,
        totalAmountPending: pending.reduce((sum, r) => sum + r.amount, 0),
        totalAmountApproved: approved.reduce((sum, r) => sum + r.amount, 0),
        totalAmountRejected: rejected.reduce((sum, r) => sum + r.amount, 0)
      }
    };
  }
);
