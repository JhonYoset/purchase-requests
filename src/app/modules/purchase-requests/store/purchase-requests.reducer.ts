import { createReducer, on } from '@ngrx/store';
import { PurchaseRequestsState } from 'src/app/core/models/purchase-request.model';

import * as PurchaseRequestsActions from './purchase-requests.actions';

export const initialState: PurchaseRequestsState = {
  requests: [],
  loading: false,
  error: null,
  optimisticUpdates: new Map()
};

export const purchaseRequestsReducer = createReducer(
  initialState,
  on(PurchaseRequestsActions.loadPurchaseRequests, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(PurchaseRequestsActions.loadPurchaseRequestsSuccess, (state, { requests }) => ({
    ...state,
    requests,
    loading: false,
    error: null
  })),
  on(PurchaseRequestsActions.loadPurchaseRequestsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(PurchaseRequestsActions.updateStatus, (state, { id, newStatus }) => {
    const request = state.requests.find(r => r.id === id);
    if (!request) return state;

    const optimisticUpdates = new Map(state.optimisticUpdates);
    optimisticUpdates.set(id, { ...request });

    return {
      ...state,
      requests: state.requests.map(r =>
        r.id === id ? { ...r, status: newStatus } : r
      ),
      optimisticUpdates
    };
  }),
  on(PurchaseRequestsActions.updateStatusSuccess, (state, { id }) => {
    const optimisticUpdates = new Map(state.optimisticUpdates);
    optimisticUpdates.delete(id);

    return {
      ...state,
      optimisticUpdates
    };
  }),
  on(PurchaseRequestsActions.updateStatusFailure, (state, { id, error, previousStatus }) => {
    const optimisticUpdates = new Map(state.optimisticUpdates);
    optimisticUpdates.delete(id);

    return {
      ...state,
      requests: state.requests.map(r =>
        r.id === id ? { ...r, status: previousStatus } : r
      ),
      optimisticUpdates,
      error
    };
  })
);
