import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../shared/alert/alert.service';
import { BoardService } from './board.service';
import { Board } from './board';
import { BoardSearch } from './board-search';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styles: [
    `
    .add-input {
      border-color: #28a745;
    }
    .search-input {
      border-color: #ffc107;
    }
    `
  ]
})
export class BoardComponent implements OnInit {
  public showAdd: boolean = false;
  public showSearch: boolean = false;
  public keyword: string;
  public boardName: string;
  public boards: Board[] = [];
  public searchBoards: BoardSearch[] = [];

  constructor(public alertService: AlertService, public boardService: BoardService) { }

  ngOnInit() {
    this.loadBoards();
  }

  toggleAddForm() {
    this.showAdd = !this.showAdd;
    this.showSearch = false;
  }

  toggleSearchForm() {
    this.showSearch = !this.showSearch;
    this.showAdd = false;
  }

  add() {
    this.boardService.addBoard(this.boardName).subscribe(
      res => {
        this.alertService.showSuccess('Board added successfully');
        this.loadBoards();
        this.alertService.loadingStop();
      },
      e => {
        this.alertService.handleErrors(e);
        this.alertService.loadingStop();
      }
    );
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

  approve(board: number, userId: number) {
    this.boardService.joinBoardApprove(board, userId).subscribe(
      res => {
        this.loadBoards();
        this.alertService.loadingStop();
      },
      e => {
        this.alertService.handleErrors(e);
        this.alertService.loadingStop();
      }
    );
  }

  loadBoards() {
    this.boardService.getBoards().subscribe(
      b => {
        this.boards = b.data as Board[];
        this.alertService.loadingStop();
        this.boardService.sync().subscribe(
          r => {
            this.alertService.loadingStop();
          },
          e => {
            this.alertService.handleErrors(e);
          }
        );
      },
      e => {
        this.alertService.handleErrors(e);
        this.alertService.loadingStop();
      }
    );
  }

}
