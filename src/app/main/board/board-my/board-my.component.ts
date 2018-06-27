import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../shared/alert/alert.service';
import { BoardService } from '../board.service';
import { Board } from '../board';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal.component';

@Component({
  selector: 'app-board-my',
  templateUrl: './board-my.component.html',
  styles: []
})
export class BoardMyComponent implements OnInit {
  boardName: string;
  boards: Board[] = [];
  modalRef: BsModalRef;

  constructor(public modalService: BsModalService, public alertService: AlertService, public boardService: BoardService) { }

  ngOnInit() {
    this.loadBoards();
  }

  loadBoards() {
    this.boardService.getBoards().subscribe(
      b => {
        this.boards = b.data as Board[];
        this.alertService.loadingStop();
      },
      e => {
        this.alertService.handleErrors(e);
        this.alertService.loadingStop();
      }
    );
  }

  add() {
    this.boardService.addBoard(this.boardName).subscribe(
      res => {
        this.alertService.showSuccess('Board added successfully');
        this.loadBoards();
        this.alertService.loadingStop();
        this.boardName = '';
      },
      e => {
        this.alertService.handleErrors(e);
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

  boardDelete(board: Board) {
    this.modalRef = this.modalService.show(ConfirmModalComponent);
    this.modalRef.content.title = 'Confirm Board Delete';
    this.modalRef.content.body = 'Are you sure you want to delete the board: ' + board.name;

    this.modalRef.content.cState.subscribe(
      status => {
        this.boardService.deleteBoard(board).subscribe(
          () => {
            this.boards = this.boards.filter(b => b != board);
            this.modalRef.hide();
            this.alertService.loadingStop();
          },
          err => {
            this.modalRef.hide();
            this.alertService.handleErrors(err);
            this.alertService.loadingStop();
          }
        );
      },
      e => {
        this.modalRef.hide();
        this.alertService.handleErrors(e);
        this.alertService.loadingStop();
      }
    );
  }
}
