import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseRequestsPageComponent } from './pages/purchase-requests-page/purchase-requests-page.component';

const routes: Routes = [
  {
    path: '',
    component: PurchaseRequestsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class PurchaseRequestsRoutingModule { }
