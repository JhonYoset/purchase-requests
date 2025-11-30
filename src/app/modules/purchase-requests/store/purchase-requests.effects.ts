import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, EMPTY } from 'rxjs';
import {
  map,
  catchError,
  switchMap,
  mergeMap,
  tap,
  withLatestFrom,
  finalize
} from 'rxjs/operators';
import * as PurchaseRequestsActions from './purchase-requests.actions';
import { PurchaseRequestsService } from '../services/purchase-requests.service';
import { selectAllRequests } from './purchase-requests.selectors';

@Injectable()
export class PurchaseRequestsEffects {

  loadPurchaseRequests$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PurchaseRequestsActions.loadPurchaseRequests),
      switchMap(() =>
        this.purchaseRequestsService.getPurchaseRequests().pipe(
          map(requests => PurchaseRequestsActions.loadPurchaseRequestsSuccess({ requests })),
          catchError(error => {
            console.error('Error al cargar solicitudes:', error);
            return of(PurchaseRequestsActions.loadPurchaseRequestsFailure({
              error: error.message || 'Error desconocido al cargar solicitudes'
            }));
          })
        )
      )
    )
  );

  updateStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PurchaseRequestsActions.updateStatus),
      withLatestFrom(this.store.select(selectAllRequests)),
      mergeMap(([action, requests]) => {
        const previousRequest = requests.find(r => r.id === action.id);
        const previousStatus = previousRequest?.status || 'PENDING';

        return this.purchaseRequestsService.updateStatus(action.id, action.newStatus).pipe(
          map(() => PurchaseRequestsActions.updateStatusSuccess({
            id: action.id,
            newStatus: action.newStatus
          })),
          tap(() => {
            console.log(`Estado actualizado exitosamente para solicitud ${action.id}`);
          }),
          catchError(error => {
            console.error('Error al actualizar estado:', error);
            this.showErrorNotification(error.message || 'Error al actualizar el estado');
            return of(PurchaseRequestsActions.updateStatusFailure({
              id: action.id,
              error: error.message || 'Error desconocido',
              previousStatus
            }));
          }),
          finalize(() => {
            console.log(`Operación finalizada para solicitud ${action.id}`);
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private purchaseRequestsService: PurchaseRequestsService
  ) {}

  private showErrorNotification(message: string): void {
    alert(`Error: ${message}`);
  }
}
