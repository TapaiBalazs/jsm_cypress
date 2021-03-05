import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatMoney',
})
export class FormatMoneyPipe implements PipeTransform {
  transform(amount: number): string {
    const options = {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    };

    if (amount % 100 === 0) {
      options.minimumFractionDigits = 0;
    }

    const formatter = new Intl.NumberFormat('en-us', options);

    return formatter.format(amount / 100);
  }
}
