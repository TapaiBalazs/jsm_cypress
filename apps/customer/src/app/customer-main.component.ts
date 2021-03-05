import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';

@Component({
  selector: 'cat-root',
  templateUrl: './customer-main.component.html',
  styleUrls: ['./customer-main.component.css'],
})
export class CustomerMainComponent {
  constructor(private breakpointObserver: BreakpointObserver) {}

  get isDesktop(): boolean {
    return !this.breakpointObserver.isMatched(Breakpoints.Handset);
  }
}
