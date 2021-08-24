import {
  CONGRATULATION_DELAY, CRITERION_COMPLEXITY, FLIP_DELAY, TIMEOUT_DELAY,
} from '../../../../constants';
import { CardState } from '../../../../models';
import { delay } from '../../../../shared/delay';
import { BaseComponent } from '../../../baseComponent';
import { Registration } from '../registration/registration';
import { Card } from './card';
import { GameField } from './gameField';

export class MainGame extends BaseComponent {
  private readonly cardsField: GameField;

  private activeCard?: Card;

  private isAnimation = false;

  public numberOfErrComparisons: number;

  public numberOfComparisons: number;

  constructor() {
    super('div', ['gameM']);
    this.cardsField = new GameField();
    this.element.appendChild(this.cardsField.element);
    this.numberOfErrComparisons = 0;
    this.numberOfComparisons = 0;
  }

  newGame(images: string[]): void {
    this.cardsField.clear();
    const cards = images
      .concat(images) // удваиваем элементы
      .map((url) => new Card(url))
      .sort(() => Math.random() - 0.5);
    if (cards.length > CRITERION_COMPLEXITY) this.cardsField.get36Cards();
    if (cards.length < CRITERION_COMPLEXITY) this.cardsField.get16Cards();
    cards.forEach((card) => {
      card.element.addEventListener('click', () => this.cardHandler(card));
    });
    cards.forEach((card) => {
      card.element.addEventListener('click', () => this.getCondratulations(cards));
    });
    this.cardsField.addCards(cards);
  }

  private async cardHandler(card: Card) {
    if (this.isAnimation) return;
    if (!card.isFlipped) return;
    this.isAnimation = true;

    await card.flipToFront();

    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }

    if (this.activeCard.image !== card.image) {
      this.activeCard.element.classList.add(CardState.Wrong);
      card.element.classList.add(CardState.Wrong);
      const active = this.activeCard.element;
      setTimeout(() => {
        active.classList.remove(CardState.Wrong);
        card.element.classList.remove(CardState.Wrong);
        this.numberOfErrComparisons++;
        this.numberOfComparisons++;
      }, TIMEOUT_DELAY);
      await delay(FLIP_DELAY);
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
    } else {
      this.activeCard.element.classList.add(CardState.Correct);
      card.element.classList.add(CardState.Correct);
      this.numberOfComparisons++;
    }

    this.activeCard = undefined;
    this.isAnimation = false;
  }

  getCondratulations(cards: Card[]): void {
    setTimeout((): void => {
      const congratulationBox: HTMLElement = document.createElement('div');
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].element.classList.contains('flipped')) {
          return;
        }
      }
      const score = this.cardsField.getScore(this.numberOfComparisons, this.numberOfErrComparisons);
      this.element.appendChild(congratulationBox);
      congratulationBox.classList.add('congratulation-box');
      congratulationBox.innerHTML = `
      <div class ="congratulation-container">
      <h2 class = "congratulation-text">You won!</h2>
      <p class = "congratulation-score">Your score - ${score} </p>
      <div class="button-new-game" id="registration-btn"><p class="new-game">Registration</p></div>
      </div>
      `;
      const registrationBtn = document.getElementById('registration-btn');
      registrationBtn.addEventListener('click', () => {
        const bodyBlock: HTMLElement = document.getElementById('body');
        new Registration(bodyBlock).render(score);
      });
    }, CONGRATULATION_DELAY);
  }
}
