import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'cat-cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartButtonComponent {
  sum$: Observable<number> = this.cartService.sum$;

  constructor(private cartService: CartService) {}
}
