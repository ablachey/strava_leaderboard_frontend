import { Component, OnInit } from '@angular/core';
import { ConnectionService } from './connection.service';
import { AlertService } from '../../shared/alert/alert.service';
import { User } from '../../auth/user';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styles: []
})
export class ConnectionComponent implements OnInit {
  connections: User[] = [];

  constructor(public connectionService: ConnectionService, public alertService: AlertService) { }

  ngOnInit() {
    this.connectionService.getConnections().subscribe(
      res => {
        this.connections = res.data as User[];
        this.alertService.loadingStop();
      },
      e => {
        this.alertService.handleErrors(e);
        this.alertService.loadingStop();
      }
    );
  }

}
