import { Component, OnInit } from '@angular/core';
import { AnnualService } from './annual.service';
import { AlertService } from '../../shared/alert/alert.service';

class TOP {
  runs: number;
  distance: number;
  time: number | string;

  constructor(runs: number, distance: number, time: number | string) {
    this.runs = runs;
    this.distance = distance;
    this.time = time;
  }
}

@Component({
  selector: 'app-annual',
  templateUrl: './annual.component.html',
  styles: []
})
export class AnnualComponent implements OnInit {
  topStats: TOP = null;

  constructor(public annualService: AnnualService, public alertService: AlertService) { }

  ngOnInit() {
    this.annualService.getTopStats().subscribe(
      res => {
        this.topStats = res.data as TOP;
        this.alertService.loadingStop();
      },
      e => {
        this.alertService.handleErrors(e);
        this.alertService.loadingStop();
      }
    );
  }

}
