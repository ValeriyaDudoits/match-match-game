import { ComplexityFormInput, ImagesCategories } from '../../../../models';
import { BaseComponent } from '../../../baseComponent';
import { Form } from './form';

export class GameSettings extends BaseComponent {
  private readonly selectKinde: HTMLElement;

  private readonly selectDifficulty: HTMLElement;

  private readonly gameModeText: HTMLElement;

  public selectedKind: string;

  private kindeForm: HTMLElement;

  private complexityForm: HTMLElement;

  public selectedComplexity: string;

  constructor(private readonly root: HTMLElement) {
    super('div', ['game-settings']);
    this.gameModeText = document.createElement('div');
    this.kindeForm = new Form(this.element, 'Game cards').renderKindeForm();
    this.complexityForm = new Form(this.element, 'Complexity').renderComplexityForm();
    this.element.appendChild(this.kindeForm);
    this.element.appendChild(this.complexityForm);
    this.selectedKind = this.chooseCards();
    this.selectedComplexity = this.chooseComplexity();
  }

  render(): HTMLElement {
    this.root.appendChild(this.element);
    return this.element;
  }

  chooseCards(): string {
    this.selectedKind = ImagesCategories.Cats;
    this.kindeForm.addEventListener('click', () => {
      this.selectedKind = (document.querySelector('input[name="cardKind"]:checked') as HTMLInputElement).value;
      return this.selectedKind;
    });
    return this.selectedKind;
  }

  chooseComplexity(): string {
    this.selectedComplexity = ComplexityFormInput.Six;
    this.complexityForm.addEventListener('click', () => {
      this.selectedComplexity = (
        document.querySelector('input[name="cardNumber"]:checked') as HTMLInputElement
      ).value;
      return this.selectedComplexity;
    });
    return this.selectedComplexity;
  }
}
