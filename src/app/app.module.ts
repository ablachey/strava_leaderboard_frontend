import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { RootRoutingModule } from './/root-routing.module';
import { InnerComponent } from './login/inner.component';
import { AuthorizeComponent } from './login/authorize.component';
import { AlertModule } from './shared/alert/alert.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InnerComponent,
    AuthorizeComponent
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    RootRoutingModule,
    AlertModule,
    HttpClientModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
