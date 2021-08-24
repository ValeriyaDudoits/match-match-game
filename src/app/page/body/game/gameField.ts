import {
  FLIP_DELAY_MAIN, FORMULA_CARDS_ITEM, FORMULA_TIME_ITEM, SECONDS_IN_MINUTE,
} from '../../../../constants';
import { BaseComponent } from '../../../baseComponent';
import { Card } from './card';
import { Timer } from './timer';

export class GameField extends BaseComponent {
  private cards: Card[] = [];

  private timer: Timer;

  public score: number;

  constructor() {
    super('div', ['game-field']);
    this.timer = new Timer();
    this.score = 0;
  }

  clear(): void {
    this.cards = [];
    this.element.innerHTML = '';
  }

  addCards(cards: Card[]): void {
    this.element.appendChild(this.timer.render());
    this.cards = cards;
    this.cards.forEach((card) => this.element.appendChild(card.element));
    setTimeout(() => {
      this.cards.forEach((card) => card.flipToBack());
    }, FLIP_DELAY_MAIN);
  }

  getScore(numberOfComparisons: number, numberOfErrComparisons: number): number {
    const sectime = this.timer.sec;
    const minutetime = this.timer.min;
    this.score = (numberOfComparisons - numberOfErrComparisons) * FORMULA_CARDS_ITEM
      - (minutetime * SECONDS_IN_MINUTE + sectime) * FORMULA_TIME_ITEM;
    if (this.score < 0) {
      this.score = 0;
    }
    this.timer.stopTimer();
    return this.score;
  }

  get36Cards(): void {
    this.element.classList.remove('cards16');
  }

  get16Cards(): void {
    this.element.classList.add('cards16');
  }
}
