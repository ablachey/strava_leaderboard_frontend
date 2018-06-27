import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardJoinComponent } from './board-join.component';

describe('BoardJoinComponent', () => {
  let component: BoardJoinComponent;
  let fixture: ComponentFixture<BoardJoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardJoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
