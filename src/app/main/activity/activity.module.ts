import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AlertModule } from '../../shared/alert/alert.module';
import { PiperModule } from '../../shared/pipes/piper.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ActivityService } from './activity.service';
import { ActivityComponent } from './activity.component';
import { ActivityListingComponent } from './activity-listing/activity-listing.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AlertModule,
    PiperModule,
    AngularFontAwesomeModule
  ],
  declarations: [ActivityComponent, ActivityListingComponent],
  providers: [ActivityService]
})
export class ActivityModule { }
