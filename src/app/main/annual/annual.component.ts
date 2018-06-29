import { Component, OnInit } from '@angular/core';
import { AnnualService } from './annual.service';
import { AlertService } from '../../shared/alert/alert.service';
import { DistancePipe } from '../../shared/pipes/distance.pipe';

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

  monthDistanceChartData:Array<any> = null;
  monthDistanceChartLabels:Array<any> = [];
  monthDistanceChartOptions:any = null;
  monthDistanceChartColors:Array<any> = [
    {
      backgroundColor: 'rgba(207, 83, 249, 0.4)',
      borderColor: 'rgba(207, 83, 249, 1)',
      pointBackgroundColor: 'rgba(207, 83, 249, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(207, 83, 249, 0.8)'
    }
  ];
  monthDistanceChartLegend:boolean = false;
  monthDistanceChartType:string = 'bar';

  bubbleChartData:Array<any> = null;
  bubbleChartLabels:Array<any> = [];
  bubbleChartOptions:any = null;
  bubbleChartColors:Array<any> = [
    {
      backgroundColor: 'rgba(226, 69, 1, 0.2)',
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
  bubbleChartLegend:boolean = false;
  bubbleChartType:string = 'bubble';

  constructor(public annualService: AnnualService, public alertService: AlertService) { }

  ngOnInit() {
    this.annualService.getTopStats().subscribe(
      res => {
        this.topStats = res.data as TOP;
        this.alertService.loadingStop();
        this.genMonthDistance();
      },
      e => {
        this.alertService.handleErrors(e);
        this.alertService.loadingStop();
      }
    );
  }

  genMonthDistance(): void {
    this.annualService.getDistanceData().subscribe(
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
    
        this.monthDistanceChartLabels = d.months;
    
        let md:Array<any> = [
          {data: d.distances, label: 'Distance'}
        ];
        this.monthDistanceChartData = md;

        this.alertService.loadingStop();

        this.genBubble();
      },
      e => {
        this.alertService.handleErrors(e);
        this.alertService.loadingStop();
      }
    );
  }

  genBubble(): void {
    this.annualService.getBubbleData().subscribe(
      res => {
        let dt = res.data as any;

        this.bubbleChartOptions = {
          responsive: true,
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                var label = data.datasets[tooltipItem.datasetIndex].label || '';
    
                if (label) {
                    label += ': ';
                }
                label += tooltipItem.yLabel + '/' + tooltipItem.xLabel + ' - ' + new DistancePipe().transform(dt[tooltipItem.index].d);
                
                return label;
              }
            }
          }
        };

        let bd:Array<any> = [
          {data: dt, label: ''}
        ];
        this.bubbleChartData = bd;

        this.alertService.loadingStop();
      },
      e => {
        this.alertService.handleErrors(e);
        this.alertService.loadingStop();
      }
    );
  }
}
