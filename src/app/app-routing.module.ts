import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'purchase-requests',
    loadChildren: () => import('./modules/purchase-requests/purchase-requests.module').then(m => m.PurchaseRequestsModule)
  },
  {
    path: '',
    redirectTo: 'purchase-requests',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'purchase-requests'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
