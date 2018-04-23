import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../shared/alert/alert.service';
import { CardService } from './card.service';
import { ActivatedRoute } from '@angular/router';
import { FastCard } from './fast-card';
import { BoardService } from '../board/board.service';
import { Board } from '../board/board';
import { User } from '../../auth/user';

class LD {
  athlete: User;
  count: number = 0;

  constructor(athlete?: User, count?: number) {
    this.athlete = athlete;
    this.count = count;
  }
}

class FC {
  name: string;
  type: string;
  entries: FastCard[];

  constructor(name?: string, type?: string, entries?: FastCard[]) {
    this.name = name;
    this.type = type;
    this.entries = entries;
  }
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styles: []
})

export class CardComponent implements OnInit {
  fastCards: FC[] = [];
  selectedDays: number | string = 7;
  selectedBoard: Board;
  boardName: string = '';
  leaders: LD[] = [];
  leader: LD = new LD(new User(), 0);
  days: number[] = [7, 15, 30];
  

  constructor(public alertService: AlertService, public cardService: CardService, public route: ActivatedRoute, public boardService: BoardService) { }

  ngOnInit() {
    let selectedBoardId = this.route.snapshot.params.id;
    this.cardService.baseUrl = this.cardService.baseUrl + selectedBoardId;

    this.boardService.getBoard(selectedBoardId).subscribe(
      res => {
        this.selectedBoard = res.data as Board;
        this.boardName = this.selectedBoard.name;
        this.alertService.loadingStop();
      },
      e => {
        this.alertService.handleErrors(e);
        this.alertService.loadingStop();
      }
    );

    this.loadFastCards();
  }

  changeDays(days: number | string) {
    if(days != this.selectedDays) {
      this.resetLeader();
      this.selectedDays = days;
      this.loadFastCards();
    }
  }

  initFastCards(): void {
    this.fastCards = [];
    this.fastCards.push(new FC('Fastest 400 Meters', 'four-hundred', []));
    this.fastCards.push(new FC('Fastest 1/2 Miles', 'half-mile', []));
    this.fastCards.push(new FC('Fastest 1 Kilometer', 'kilometer', []));
    this.fastCards.push(new FC('Fastest 1 Mile', 'mile', []));
    this.fastCards.push(new FC('Fastest 2 Miles', 'two-mile', []));
    this.fastCards.push(new FC('Fastest 5K', 'five-kilometer', []));
    this.fastCards.push(new FC('Fastest 10K', 'ten-kilometer', []));
  }

  loadFastCards(): void {
    this.initFastCards();

    for(let fc of this.fastCards) {
      this.cardService.getFastCards(fc.type, this.selectedDays).subscribe(
        res => {
          fc.entries = res.data as FastCard[];
          if(fc.entries.length > 0) {
            this.processLeader(fc.entries[0].user);
          }
          this.alertService.loadingStop();
        },
        e => {
          this.alertService.handleErrors(e);
          this.alertService.loadingStop();
        }
      );
    }
  }

  processLeader(athlete: User): void {
    let isIn: boolean = false;
    for(let leader of this.leaders) {
      if(leader.athlete.id == athlete.id) {
        isIn = true;
        leader.count = leader.count + 1;
      }
    }

    if(!isIn) {
      let ld = new LD(athlete, 1);
      this.leaders.push(ld);
    }

    let currentLeader = new LD(new User(), 0);

    for(let l of this.leaders) {
      if(l.count >= currentLeader.count) {
        currentLeader = l;
      }
    }
    
    this.leader = currentLeader;
  }

  resetLeader(): void {
    this.leaders = [];
    this.leader = new LD(new User, 0);
  }
}
