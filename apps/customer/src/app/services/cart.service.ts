import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentType, Pizza } from '@cat/api-interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartContent = new BehaviorSubject<Pizza[]>(
    JSON.parse(localStorage.getItem('cart')) || []
  );

  readonly cart$ = this.cartContent
    .asObservable()
    .pipe(
      tap((content) => localStorage.setItem('cart', JSON.stringify(content)))
    );
  readonly sum$ = this.cart$.pipe(
    map((cartContent: Pizza[]) =>
      cartContent.reduce(
        (accumulator: number, current: Pizza) => accumulator + current.price,
        0
      )
    )
  );

  constructor(private http: HttpClient) {}

  addToCart(pizza: Pizza): void {
    const cart = [...this.cartContent.getValue()];
    cart.push(pizza);
    this.cartContent.next(cart);
  }

  removeFromCart(pizza: Pizza): void {
    const filteredCart = this.cartContent
      .getValue()
      .filter((p: Pizza) => p.id !== pizza.id);
    this.cartContent.next(filteredCart);
  }

  placeOrder(paymentData: {
    address: string;
    paymentType: PaymentType;
  }): Observable<number> {
    return this.cart$.pipe(
      take(1),
      switchMap((pizzas: Pizza[]) =>
        this.http.post<number>('/api/order', {
          address: paymentData.address,
          paymentType: paymentData.paymentType,
          pizzas: pizzas.map((p) => p.id),
        })
      ),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      tap((_) => this.clearCart())
    );
  }

  private clearCart(): void {
    localStorage.clear();
    this.cartContent.next([]);
  }
}
