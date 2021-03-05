import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApiInterfacesModule } from '@cat/api-interfaces';
import { MaterialImportModule } from '../material/material-import.module';
import { AppShellRoutingModule } from './app-shell-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainComponent } from './components/main/main.component';
import { OrdersComponent } from './components/orders/orders.component';
import { SumPipe } from './pipes/sum.pipe';

@NgModule({
  declarations: [MainComponent, DashboardComponent, OrdersComponent, SumPipe],
  imports: [
    CommonModule,
    AppShellRoutingModule,
    MaterialImportModule,
    ApiInterfacesModule,
  ],
})
export class AppShellModule {}
