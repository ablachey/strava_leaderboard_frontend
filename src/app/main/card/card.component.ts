import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../shared/alert/alert.service';
import { CardService } from './card.service';
import { ActivatedRoute } from '@angular/router';
import { FastCard } from './fast-card';

class FCS {
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
  fastCards: FCS[] = [];
  days: number = 7;

  constructor(public alertService: AlertService, public cardService: CardService, public route: ActivatedRoute) { }

  ngOnInit() {
    let selectedBoard = this.route.snapshot.params.id;
    this.cardService.baseUrl = this.cardService.baseUrl + selectedBoard;

    this.initCards();
    this.loadFastCards();
  }

  initCards(): void {
    this.fastCards.push(new FCS('Fastest 400 Meters', 'four-hundred', []));
    this.fastCards.push(new FCS('Fastest 1/2 Miles', 'half-mile', []));
    this.fastCards.push(new FCS('Fastest 1 Kilometer', 'kilometer', []));
    this.fastCards.push(new FCS('Fastest 1 Mile', 'mile', []));
    this.fastCards.push(new FCS('Fastest 2 Miles', 'two-mile', []));
    this.fastCards.push(new FCS('Fastest 5K', 'five-kilometer', []));
    this.fastCards.push(new FCS('Fastest 10K', 'ten-kilometer', []));
  }

  loadFastCards(): void {
    for(let fc of this.fastCards) {
      this.cardService.getFastCards(fc.type, this.days).subscribe(
        res => {
          fc.entries = res.data as FastCard[];
          this.alertService.loadingStop();
        },
        e => {
          this.alertService.handleErrors(e);
          this.alertService.loadingStop();
        }
      );
    }
    console.log(this.fastCards);
  }

}
