import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Pizza } from '@cat/api-interfaces';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'cat-pizza-display',
  templateUrl: './pizza-display.component.html',
  styleUrls: ['./pizza-display.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PizzaDisplayComponent {
  @Input() pizza: Pizza = null;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cartService: CartService
  ) {}

  get isDesktop(): boolean {
    return !this.breakpointObserver.isMatched(Breakpoints.Handset);
  }

  addToCart(): void {
    this.cartService.addToCart(this.pizza);
  }
}
