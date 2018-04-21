import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    DashboardModule,
    AngularFontAwesomeModule
  ],
  declarations: [MainComponent]
})
export class MainModule { }
