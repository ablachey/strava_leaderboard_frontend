import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardMyComponent } from './board-my.component';

describe('BoardMyComponent', () => {
  let component: BoardMyComponent;
  let fixture: ComponentFixture<BoardMyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardMyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardMyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
