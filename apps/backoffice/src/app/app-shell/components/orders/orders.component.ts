import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Order } from '@cat/api-interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'cat-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
  orders$: Observable<Order[]> = this.http.get<Order[]>('/api/orders');

  constructor(private http: HttpClient) {}
}
