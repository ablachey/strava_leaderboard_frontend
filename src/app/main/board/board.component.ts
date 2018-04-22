import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../shared/alert/alert.service';
import { BoardService } from './board.service';
import { Board } from './board';

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
    console.log(this.boardName);
  }

  srch() {
    console.log(this.keyword);
  }

  loadBoards() {
    this.boardService.boards().subscribe(
      b => {
        this.boards = b.data as Board[];
        console.log(this.boards);
      },
      e => {
        this.alertService.handleErrors(e);
      }
    );
  }
}
