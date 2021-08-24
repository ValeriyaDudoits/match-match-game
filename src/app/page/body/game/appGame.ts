import { MainGame } from './mainGame';
import { ImageCategory } from '../../../models/image-category-model';
import { ComplexityFormInput, ImagesCategories } from '../../../../models';

export class Game {
  private readonly game: MainGame;

  private readonly complexity: string;

  public cardKinde: string;

  constructor(private readonly root: HTMLElement, cardKinde: string, complexity: string) {
    this.game = new MainGame();
    this.complexity = complexity;
    this.cardKinde = cardKinde;
  }

  render(): HTMLElement {
    this.root.appendChild(this.game.element);
    this.start();
    return this.game.element;
  }

  async start(): Promise<void> {
    let res: Response;
    if (this.complexity === ComplexityFormInput.Six) {
      res = await fetch('./images.json');
    }
    if (this.complexity === ComplexityFormInput.Four) {
      res = await fetch('./images6.json');
    }

    const categories: ImageCategory[] = await res.json();
    let images: string[];

    if (this.cardKinde === ImagesCategories.Cats) {
      images = categories[0].images.map((name) => `${categories[0].category}/${name}`);
    }
    if (this.cardKinde === ImagesCategories.Art) {
      images = categories[1].images.map((name) => `${categories[1].category}/${name}`);
    }
    if (this.cardKinde === ImagesCategories.Flowers) {
      images = categories[2].images.map((name) => `${categories[2].category}/${name}`);
    }
    if (this.cardKinde === ImagesCategories.Mountains) {
      images = categories[3].images.map((name) => `${categories[3].category}/${name}`);
    }
    if (this.cardKinde === ImagesCategories.Sea) {
      images = categories[4].images.map((name) => `${categories[4].category}/${name}`);
    }
    this.game.newGame(images);
  }
}
