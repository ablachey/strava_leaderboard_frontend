import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../shared/alert/alert.service';
import { CardService } from './card.service';
import { ActivatedRoute } from '@angular/router';
import { FastCard } from './fast-card';
import { BoardService } from '../board/board.service';
import { Board } from '../board/board';
import { User } from '../../auth/user';
import { Activity } from './activity';
import { OverallCard } from './overall-card';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../../environments/environment';

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

class HC {
  name: string;
  type: string;
  entries: Activity[];

  constructor(name?: string, type?: string, entries?: Activity[]) {
    this.name = name;
    this.type = type;
    this.entries = entries;
  }
}

class OC {
  name: string;
  type: string;
  entries: OverallCard[];

  constructor(name?: string, type?: string, entries?: OverallCard[]) {
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
  highCards: HC[] = [];
  overallCards: OC[] = [];
  selectedDays: number | string = 7;
  selectedBoard: Board;
  boardName: string = '';
  leaders: LD[] = [];
  leader: LD = new LD(new User(), 0);
  days: number[] = [7, 15, 30];
  fastSubject: BehaviorSubject<FC[]> = new BehaviorSubject(null);
  highSubject: BehaviorSubject<HC[]> = new BehaviorSubject(null);
  overallSubject: BehaviorSubject<OC[]> = new BehaviorSubject(null);
  stravaActivityUrl: string = environment.stravaActivityUrl;
  

  constructor(public alertService: AlertService, public cardService: CardService, public route: ActivatedRoute, public boardService: BoardService) { }

  ngOnInit() {
    let selectedBoardId = this.route.snapshot.params.id;

    this.boardService.getBoard(selectedBoardId).subscribe(
      res => {
        this.selectedBoard = res.data as Board;
        this.boardName = this.selectedBoard.name;
        this.alertService.loadingStop();

        this.boardService.syncBoard(this.selectedBoard).subscribe(
          () => {
            this.loadFastCards();
            this.loadHighCards();
            this.loadOverallCards();
          },
          e => {
            this.alertService.handleErrors(e);
            this.alertService.loadingStop();
          }
        );
      },
      e => {
        this.alertService.handleErrors(e);
        this.alertService.loadingStop();
      }
    );
  }

  changeDays(days: number | string) {
    if(days != this.selectedDays) {
      this.resetLeader();
      this.selectedDays = days;
      this.loadFastCards();
      this.loadHighCards();
      this.loadOverallCards();
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

  initHighCards(): void {
    this.highCards = [];
    this.highCards.push(new HC('Longest Run', 'longest-run', []));
    this.highCards.push(new HC('Furthest Run', 'furthest-run', []));
    this.highCards.push(new HC('Maximum Calories Burnt', 'max-calories', []));
  }

  initOverallCards(): void {
    this.overallCards = [];
    this.overallCards.push(new OC('Overall Distance', 'overall-distance', []));
    this.overallCards.push(new OC('Overall Time', 'overall-time', []));
  }

  loadFastCards(): void {
    this.initFastCards();
    this.lfc(0);
  }

  loadHighCards(): void {
    this.initHighCards();
    this.lhc(0);
  }


  loadOverallCards(): void {
    this.initOverallCards();
    this.loc(0);
  }

  lfc(i: number) {
    let totalCalls = this.fastCards.length;
    if(i < totalCalls) {
      this.cardService.getFastCards(this.selectedBoard.id, this.fastCards[i].type, this.selectedDays).subscribe(
        res => {
          this.fastCards[i].entries = res.data as FastCard[];
          if(this.fastCards[i].entries.length > 0) {
            this.processLeader(this.fastCards[i].entries[0].activity.athlete);
          }
          this.alertService.loadingStop();
          this.fastSubject.next(this.fastCards);
          this.lfc(i + 1);
        },
        e => {
          this.alertService.handleErrors(e);
          this.alertService.loadingStop();
        }
      );
    }
  }

  lhc(i: number) {
    let totalCalls = this.highCards.length;
    if(i < totalCalls) {
      this.cardService.getHighCards(this.selectedBoard.id, this.highCards[i].type, this.selectedDays).subscribe(
        res => {
          this.highCards[i].entries = res.data as Activity[];
          if(this.highCards[i].entries.length > 0) {
            this.processLeader(this.highCards[i].entries[0].athlete);
          }
          this.alertService.loadingStop();
          this.highSubject.next(this.highCards);
          this.lhc(i + 1);
        },
        e => {
          this.alertService.handleErrors(e);
          this.alertService.loadingStop();
        }
      );
    }
  }

  loc(i: number) {
    let totalCalls = this.overallCards.length;

    if(i < totalCalls) {
      this.cardService.getOverallCards(this.selectedBoard.id, this.overallCards[i].type, this.selectedDays).subscribe(
        res => {
          this.overallCards[i].entries = res.data as OverallCard[];
          if(this.overallCards[i].entries.length > 0) {
            this.processLeader(this.overallCards[i].entries[0].athlete);
          }
          this.alertService.loadingStop();
          this.overallSubject.next(this.overallCards);
          this.loc(i + 1);
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
