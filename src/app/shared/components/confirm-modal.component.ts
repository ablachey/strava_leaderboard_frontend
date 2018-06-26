import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-confirm-modal',
  template: `
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{ title }}</h5>
        <button aria-label="Close" class="close" (click)="bsModalRef.hide()">
          <span aria-hidden="true">x</span>
        </button>
      </div>
      <div class="modal-body">
        {{ body }}
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" (click)="bsModalRef.hide()">Cancel</button>
        <button class="btn btn-primary" (click)="confirmed($event)">Confirm</button>
      </div>
    </div>
  `,
  styles: []
})
export class ConfirmModalComponent implements OnInit {
  title: string;
  body: string;
  cState: Subject<boolean> = new Subject<boolean>();

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  confirmed(e): void {
    this.cState.next(true);
  }
}
