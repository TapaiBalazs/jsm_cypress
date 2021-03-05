import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { OrderErrorComponent } from './components/order-error/order-error.component';
import { OrderSucccessComponent } from './components/order-succcess/order-succcess.component';
import { PizzaListComponent } from './components/pizza-list/pizza-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'pizza', pathMatch: 'full' },
  { path: 'pizza', component: PizzaListComponent },
  { path: 'cart', component: CartComponent },
  { path: 'error', component: OrderErrorComponent },
  { path: 'success', component: OrderSucccessComponent },
  { path: '**', redirectTo: 'pizza' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class CustomerMainRoutingModule {}
