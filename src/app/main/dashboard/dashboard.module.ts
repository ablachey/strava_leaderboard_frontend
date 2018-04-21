import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AngularFontAwesomeModule,
    FormsModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
