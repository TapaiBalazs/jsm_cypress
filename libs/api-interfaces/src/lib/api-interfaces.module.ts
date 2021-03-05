import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatMoneyPipe } from './format-money.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [FormatMoneyPipe],
  exports: [FormatMoneyPipe],
})
export class ApiInterfacesModule {}
