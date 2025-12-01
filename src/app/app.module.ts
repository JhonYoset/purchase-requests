import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { purchaseRequestsReducer } from './modules/purchase-requests/store/purchase-requests.reducer';
import { PurchaseRequestsEffects } from './modules/purchase-requests/store/purchase-requests.effects';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppComponent,
    StoreModule.forRoot({
      purchaseRequests: purchaseRequestsReducer
    }),
    EffectsModule.forRoot([PurchaseRequestsEffects]),
    StoreDevtoolsModule.instrument({ 
      maxAge: 25, 
      logOnly: !isDevMode() 
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }