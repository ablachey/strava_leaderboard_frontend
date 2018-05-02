import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth/auth.service';
import { RootRoutingModule } from './/root-routing.module';
import { AuthenticateComponent } from './auth/authenticate/authenticate.component';
import { AuthorizeComponent } from './auth/authorize/authorize.component';
import { AlertModule } from './shared/alert/alert.module';
import { HttpClientModule } from '@angular/common/http';
import { MainModule } from './main/main.module';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/token-interceptor';
import { ActivityService } from './shared/services/activity.service';
import { ConfirmModalComponent } from './shared/components/confirm-modal.component';
import { ModalModule } from 'ngx-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AuthenticateComponent,
    AuthorizeComponent,
    ConfirmModalComponent,
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    RootRoutingModule,
    AlertModule,
    HttpClientModule,
    MainModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    ActivityService,
    BsModalService
  ],
  entryComponents: [ConfirmModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
