import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../shared/alert/alert.service';
import { BoardService } from '../board.service';
import { BoardSearch } from '../board-search';

@Component({
  selector: 'app-board-join',
  templateUrl: './board-join.component.html',
  styles: []
})
export class BoardJoinComponent implements OnInit {
  keyword: string;
  searchBoards: BoardSearch[] = [];

  constructor(public alertService: AlertService, public boardService: BoardService) { }

  ngOnInit() {
  }

  srch() {
    this.boardService.searchBoards(this.keyword).subscribe(
      res => {
        this.searchBoards = res.data as BoardSearch[];
        this.alertService.loadingStop();
      },
      e => {
        this.alertService.handleErrors(e);
        this.alertService.loadingStop();
      }
    );
  }

  join(id: number) {
    this.boardService.joinBoard(id).subscribe(
      res => {
        this.alertService.showSuccess('Joined board successfully, please wait for approval from board administrators');
        this.srch();
        this.alertService.loadingStop();
      },
      err => {
        this.alertService.handleErrors(err);
        this.alertService.loadingStop();
      }
    );
  }
}
