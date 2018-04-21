import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
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
export class DashboardComponent implements OnInit {
  public showAdd: boolean = false;
  public showSearch: boolean = false;
  public keyword: string;
  public boardName: string;

  constructor() { }

  ngOnInit() {
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
}
