import { Pipe, PipeTransform } from '@angular/core';
import { Pizza } from '@cat/api-interfaces';

@Pipe({
  name: 'sum',
})
export class SumPipe implements PipeTransform {
  transform(pizzas: Pizza[]): number {
    return pizzas.reduce(
      (accumulator: number, current: Pizza) => accumulator + current.price,
      0
    );
  }
}
