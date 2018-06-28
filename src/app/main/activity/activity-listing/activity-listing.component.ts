import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../activity.service';
import { AlertService } from '../../../shared/alert/alert.service';
import { Activity } from '../activity';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-activity-listing',
  templateUrl: './activity-listing.component.html',
  styles: []
})
export class ActivityListingComponent implements OnInit {
  activities: Activity[] = [];
  stravaActivityUrl: string = environment.stravaActivityUrl;

  constructor(public activityService: ActivityService, public alertService: AlertService) { }

  ngOnInit() {
    this.activityService.getRecent().subscribe(
      res => {
        this.activities = res.data as Activity[];
        this.alertService.loadingStop();
      },
      e => {
        this.alertService.handleErrors(e);
        this.alertService.loadingStop();
      }
    );
  }

}
