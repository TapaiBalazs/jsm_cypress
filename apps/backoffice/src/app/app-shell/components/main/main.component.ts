import { Component } from '@angular/core';
import { AuthenticationService } from '../../../authentication/services/authentication.service';

@Component({
  selector: 'cat-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  constructor(private authenticationService: AuthenticationService) {}

  logout(): void {
    this.authenticationService.logout();
  }
}
