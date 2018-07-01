import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service'
import { User } from '../../auth/user';
import { ProfileService } from './profile.service';
import { AlertService } from '../../shared/alert/alert.service';
import { TimePipe } from '../../shared/pipes/time.pipe';
import { DistancePipe } from '../../shared/pipes/distance.pipe';

class TOP {
  count: number;
  countPrev: number;
  time: number;
  timePrev: number;
  distance: number;
  distancePrev: number;
  calories: number;
  caloriesPrev: number;

  constructor(count: number, countPrev: number, time: number, timePrev: number, distance: number, distancePrev: number, calories: number, caloriesPrev: number) { 
    this.count = count;
    this.countPrev = countPrev;
    this.time = time;
    this.timePrev = timePrev;
    this.distance = distance;
    this.distancePrev = distancePrev;
    this.calories = calories;
    this.caloriesPrev = caloriesPrev;
  }
}

class EF {
  name: string;
  type: string;

  constructor(name: string, type: string) {
    this.name = name;
    this.type = type;
  }
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId: number = null;
  user: User = null;
  isActiveUser: boolean = false;
  topData: TOP = null;
  effortTypes:Array<EF> = [
    new EF('400m', 'four-hundred'),
    new EF('1/2 Mile', 'half-mile'),
    new EF('1K', 'kilometer'),
    new EF('1 Mile', 'mile'),
    new EF('2 Mile', 'two-mile')
  ];

  monthTimeChartData:Array<any> = null;
  monthTimeChartLabels:Array<any> = [];
  monthTimeChartOptions:any = null;
  monthTimeChartColors:Array<any> = [
    {
      backgroundColor: 'rgba(68, 185, 23, 0.4)',
      borderColor: 'rgba(68, 185, 23, 1)',
      pointBackgroundColor: 'rgba(68, 185, 23, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(68, 185, 23, 0.8)'
    },
    {
      backgroundColor: 'rgba(77, 83, 96, 0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77, 83, 96, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77, 83, 96, 1)'
    },
  ];
  monthTimeChartLegend:boolean = false;
  monthTimeChartType:string = 'line';


  monthDistanceChartData:Array<any> = null;
  monthDistanceChartLabels:Array<any> = [];
  monthDistanceChartOptions:any = null;
  monthDistanceChartColors:Array<any> = [
    {
      backgroundColor: 'rgba(226, 69, 1, 0.4)',
      borderColor: 'rgba(226,69,1,1)',
      pointBackgroundColor: 'rgba(226, 69, 1, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(226, 69, 1, 0.8)'
    },
    {
      backgroundColor: 'rgba(77, 83, 96, 0.2)',
      borderColor: 'rgba(77, 83, 96, 1)',
      pointBackgroundColor: 'rgba(77, 83, 96, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77, 83, 96, 1)'
    },
  ];
  monthDistanceChartLegend:boolean = false;
  monthDistanceChartType:string = 'line';

  effortChartData:Array<any> = null;
  effortChartLabels:Array<any> = [];
  effortChartOptions:any = null;
  effortChartColors:Array<any> = [
    {
      backgroundColor: 'rgba(207, 83, 249, 0.6)',
      borderColor: 'rgba(207, 83, 249, 1)',
      pointBackgroundColor: 'rgba(207, 83, 249, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(207, 83, 249, 0.8)'
    }
  ];
  effortChartLegend:boolean = false;
  effortChartType:string = 'bar';

  today: number = 0;

  constructor(public profileService: ProfileService, public alertService: AlertService, public authService: AuthService, public router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    let now = new Date();
    this.today = now.getDate();
    this.userId = this.route.snapshot.params.id;

    if(!this.userId) {
      this.isActiveUser = true;
      this.authService.getLocalUser().subscribe(
        u => {
          this.user = u;
          this.userId = this.user.id;
          this.getTop();
        },
        e => {
          this.alertService.handleLocalErrors(e);
        }
      );
    }


    if(!this.user) {
      this.profileService.getUser(this.userId).subscribe(
        res => {
          this.user = res.data as User;
          this.alertService.loadingStop();
          this.getTop();
        },
        e => {
          this.alertService.handleErrors(e);
          this.alertService.loadingStop();
        }
      )
    }
  }

  getTop() {
    this.profileService.getAccumulated(this.userId).subscribe(
      res => {
        this.topData = res.data as TOP;
        this.alertService.loadingStop();
        this.getMonthTime();
      },
      e => {
        this.alertService.handleErrors(e);
        this.alertService.loadingStop();
      }
    );
  }

  getMonthTime() {
    this.profileService.getMonth(this.userId, 'time').subscribe(
      res => {
        let d = res.data as any;

        this.monthTimeChartOptions = {
          responsive: true,
          scales: {
            yAxes: [{
              ticks: {
                callback: function(value, index, values) {
                  return new TimePipe().transform(value);
                },
                beginAtZero: true
              }
            }],
            xAxes: [{
              gridLines: {
                drawOnChartArea: false
              }
            }]
          },
          tooltips: {
            mode: 'index',
					  intersect: false,
            callbacks: {
              label: function(tooltipItem, data) {
                var label = data.datasets[tooltipItem.datasetIndex].label || '';
                
                if (label) {
                    label += ': ';
                }

                label += new TimePipe().transform(tooltipItem.yLabel);

                return label;
              }
            }
          }
        };

        this.monthTimeChartLabels = d.last_month.days;
        
        let points = this.generatePoints(d.last_month.days);

        let md:Array<any> = [
          {data: d.this_month.values, label: 'This Month', pointRadius: points},
          {data: d.last_month.values, label: 'Last Month', pointRadius: points}
        ];
        this.monthTimeChartData = md;
        
        this.alertService.loadingStop();
        this.getMonthDistance();
      },
      e => {
        this.alertService.handleErrors(e);
        this.alertService.loadingStop();
      }
    );
  }

  getMonthDistance() {
    this.profileService.getMonth(this.userId, 'distance').subscribe(
      res => {
        let d = res.data as any;
        this.monthDistanceChartOptions = {
          responsive: true,
          scales: {
            yAxes: [{
              ticks: {
                callback: function(value, index, values) {
                  return new DistancePipe().transform(value);
                },
                beginAtZero: true
              }
            }],
            xAxes: [{
              gridLines: {
                drawOnChartArea: false
              }
            }]
          },
          tooltips: {
            mode: 'index',
					  intersect: false,
            callbacks: {
              label: function(tooltipItem, data) {
                var label = data.datasets[tooltipItem.datasetIndex].label || '';
  
                if (label) {
                    label += ': ';
                }
                label += new DistancePipe().transform(tooltipItem.yLabel);
                return label;
              }
            }
          }
        };

        this.monthDistanceChartLabels = d.last_month.days;

        let points = this.generatePoints(d.last_month.days);

        let md:Array<any> = [
          {data: d.this_month.values, label: 'This Month', pointRadius: points},
          {data: d.last_month.values, label: 'Last Month', pointRadius: points}
        ];
        this.monthDistanceChartData = md;
        
        this.alertService.loadingStop();
        this.getEfforts(this.effortTypes[0]);
      },
      e => {
        this.alertService.handleErrors(e);
        this.alertService.loadingStop();
      }
    );
  }

  getEfforts(t: EF) {
    this.profileService.getEfforts(this.userId, t.type).subscribe(
      res => {
        let d = res.data as any;
        this.effortChartLabels = [];
        this.effortChartData = [];
        

        this.effortChartOptions = {
          responsive: true,
          scales: {
            yAxes: [{
              ticks: {
                callback: function(value, index, values) {
                  return new TimePipe().transform(value);
                },
                beginAtZero: true
              }
            }],
            xAxes: [{
              gridLines: {
                drawOnChartArea: false
              }
            }]
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                var label = data.datasets[tooltipItem.datasetIndex].label || '';
  
                if (label) {
                    label += ': ';
                }
                label += new TimePipe().transform(tooltipItem.yLabel);
                return label;
              }
            }
          }
        };
        
        this.effortChartLabels = d.days;

        let md:Array<any> = [
          {data: d.values, label: t.name}
        ];
        this.effortChartData = md;
        
        this.alertService.loadingStop();
      },
      e => {
        this.alertService.handleErrors(e);
        this.alertService.loadingStop();
      }
    );
  }

  effortChanged(i: number) {
    this.getEfforts(this.effortTypes[i]);
  }

  generatePoints(days: Array<any>): Array<number> {
    let points: Array<number> = [];
    
    for(let dy of days) {
      let p = 0;
      if(dy === this.today) {
        p = 6;
      }

      points.push(p);
    }

    return points;
  }
}