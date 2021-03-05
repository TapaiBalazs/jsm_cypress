import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Pizza } from '@cat/api-interfaces';
import { of } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { PizzaService } from '../../services/pizza.service';

@Component({
  selector: 'cat-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PizzaListComponent {
  readonly pizzaList$ = this.pizzaService.getPizzaList().pipe(
    shareReplay(1),
    catchError((e) => {
      console.error(e);
      return of(null);
    })
  );

  constructor(private pizzaService: PizzaService) {}

  trackBy(index: number, item: Pizza) {
    return item?.id;
  }
}
