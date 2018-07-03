import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectionService } from './connection.service';
import { ConnectionComponent } from './connection.component';
import { AlertModule } from '../../shared/alert/alert.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    AlertModule,
    AngularFontAwesomeModule,
    RouterModule
  ],
  declarations: [ConnectionComponent],
  providers: [ConnectionService]
})
export class ConnectionModule { }
