import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationModule } from './authentication/authentication.module';
import { BackofficeMainComponent } from './backoffice-main.component';
import { BackofficeRoutingModule } from './backoffice-routing.module';

@NgModule({
  declarations: [BackofficeMainComponent],
  imports: [
    BrowserAnimationsModule,
    AuthenticationModule.forRoot(),
    HttpClientModule,
    BrowserModule,
    BackofficeRoutingModule,
  ],
  providers: [],
  bootstrap: [BackofficeMainComponent],
})
export class BackofficeMainModule {}
