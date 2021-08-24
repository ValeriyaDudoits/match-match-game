import { BaseComponent } from '../../../baseComponent';

export class Card extends BaseComponent {
  public isFlipped: boolean;

  constructor(readonly image: string) {
    super('div', ['card-container']);
    this.element.innerHTML = `
     <div class="card">
      <div class="card-front" style="background-image: url('./images/${this.image}')"></div>
      <div class="card-back"></div>
    </div>
    `;
    this.isFlipped = false;
  }

  flipToBack(): Promise<void> {
    this.isFlipped = true;
    return this.flip(true);
  }

  flipToFront(): Promise<void> {
    this.isFlipped = false;
    return this.flip(false);
  }

  private flip(isFront = false): Promise<void> {
    return new Promise((resolve) => {
      this.element.classList.toggle('flipped', isFront);
      this.element.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
    });
  }
}
