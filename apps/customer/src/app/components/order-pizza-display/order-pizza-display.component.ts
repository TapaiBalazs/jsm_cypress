import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Pizza } from '@cat/api-interfaces';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'cat-order-pizza-display',
  templateUrl: './order-pizza-display.component.html',
  styleUrls: ['./order-pizza-display.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderPizzaDisplayComponent {
  @Input() pizza: Pizza = null;

  constructor(private cartService: CartService) {}

  removeFromCart(): void {
    this.cartService.removeFromCart(this.pizza);
  }
}
