import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'cat-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup;

  isInvalidCredentials = false;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.isInvalidCredentials = false;

    if (this.form.valid) {
      this.authenticationService
        .login(this.form.getRawValue())
        .subscribe((isSuccessfulLogin: boolean) => {
          this.isInvalidCredentials = !isSuccessfulLogin;
        });
    }
  }
}
