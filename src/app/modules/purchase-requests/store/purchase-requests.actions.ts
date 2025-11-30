import { createAction, props } from '@ngrx/store';
import { PurchaseRequest, PurchaseRequestStatus } from 'src/app/core/models/purchase-request.model';

export const loadPurchaseRequests = createAction(
  '[Purchase Requests] Load Purchase Requests'
);

export const loadPurchaseRequestsSuccess = createAction(
  '[Purchase Requests] Load Purchase Requests Success',
  props<{ requests: PurchaseRequest[] }>()
);

export const loadPurchaseRequestsFailure = createAction(
  '[Purchase Requests] Load Purchase Requests Failure',
  props<{ error: string }>()
);

export const updateStatus = createAction(
  '[Purchase Requests] Update Status',
  props<{ id: string; newStatus: PurchaseRequestStatus }>()
);

export const updateStatusSuccess = createAction(
  '[Purchase Requests] Update Status Success',
  props<{ id: string; newStatus: PurchaseRequestStatus }>()
);

export const updateStatusFailure = createAction(
  '[Purchase Requests] Update Status Failure',
  props<{ id: string; error: string; previousStatus: PurchaseRequestStatus }>()
);
