import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiInterfacesModule } from '@cat/api-interfaces';
import { CartButtonComponent } from './components/cart-button/cart-button.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderErrorComponent } from './components/order-error/order-error.component';
import { OrderPizzaDisplayComponent } from './components/order-pizza-display/order-pizza-display.component';
import { OrderSucccessComponent } from './components/order-succcess/order-succcess.component';
import { PizzaDisplayComponent } from './components/pizza-display/pizza-display.component';
import { PizzaListComponent } from './components/pizza-list/pizza-list.component';
import { CustomerMainRoutingModule } from './customer-main-routing.module';

import { CustomerMainComponent } from './customer-main.component';

@NgModule({
  declarations: [
    CartButtonComponent,
    CartComponent,
    CustomerMainComponent,
    OrderErrorComponent,
    OrderPizzaDisplayComponent,
    OrderSucccessComponent,
    PizzaDisplayComponent,
    PizzaListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomerMainRoutingModule,
    HttpClientModule,
    ApiInterfacesModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [CustomerMainComponent],
})
export class CustomerMainModule {}
