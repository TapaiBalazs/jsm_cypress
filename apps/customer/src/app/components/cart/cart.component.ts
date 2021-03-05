import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'cat-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  readonly cart$ = this.cartService.cart$;
  readonly form = this.formBuilder.group({
    city: ['', Validators.required],
    street: ['', Validators.required],
    paymentType: ['CASH', Validators.required],
  });

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  sendOrder(): void {
    const value = this.form.getRawValue();
    this.cartService
      .placeOrder({
        address: `${value.city}, ${value.street}`,
        paymentType: value.paymentType,
      })
      .subscribe({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        next: (_) => this.router.navigateByUrl('/success'),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        error: (_) => this.router.navigateByUrl('/error'),
      });
  }
}
