import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../shared/alert/alert.service';
import { BoardService } from './board.service';
import { Board } from './board';
import { BoardSearch } from './board-search';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal.component';

@Component({
  selector: 'app-board',
  template: '<router-outlet></router-outlet>',
  styles: []
})
export class BoardComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
}
