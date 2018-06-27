import { Component, OnInit } from '@angular/core';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styles: [
    `
    .loading-screen {
      position: absolute;
      width: 200px;
      left: -webkit-calc(50% - 100px);
      left: -moz-calc(50% - 100px);
      left: calc(50% - 100px);
      z-index: 1000;
    }
    
    .loading-text {
      position: relative;
      font-size: 30px;
      color: rgba(252, 76, 2, 0.65);
    }
    
    .loading-content {
      position: relative;
      margin-top: 100px;
    }
    `
  ]
})
export class AlertComponent implements OnInit {

  constructor(public alertService: AlertService) { }

  ngOnInit() {
  }

}
