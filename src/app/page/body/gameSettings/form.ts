import { ComplexityCategiries, ComplexityFormInput, ImagesCategories } from '../../../../models';
import { Input } from './input';
import { Label } from './label';

export class Form {
  private form: HTMLElement;

  private readonly cardKindText: HTMLElement;

  constructor(private readonly root: HTMLElement, text: string) {
    this.form = document.createElement('form');
    this.cardKindText = document.createElement('div');
    this.cardKindText.classList.add('game-mode-text');
    this.cardKindText.innerHTML = text;
  }

  renderKindeForm(): HTMLElement {
    this.root.appendChild(this.form);
    this.form.appendChild(this.cardKindText);
    this.form.appendChild(new Input(this.form, ImagesCategories.Cats, true, 'cardKind').render());
    this.form.appendChild(new Label(this.form, ImagesCategories.Cats).render());
    this.form.appendChild(new Input(this.form, ImagesCategories.Sea, false, 'cardKind').render());
    this.form.appendChild(new Label(this.form, ImagesCategories.Sea).render());
    this.form.appendChild(new Input(this.form, ImagesCategories.Art, false, 'cardKind').render());
    this.form.appendChild(new Label(this.form, ImagesCategories.Art).render());
    this.form.appendChild(new Input(this.form, ImagesCategories.Mountains, false, 'cardKind').render());
    this.form.appendChild(new Label(this.form, ImagesCategories.Mountains).render());
    this.form.appendChild(new Input(this.form, ImagesCategories.Flowers, false, 'cardKind').render());
    this.form.appendChild(new Label(this.form, ImagesCategories.Flowers).render());
    return this.form;
  }

  renderComplexityForm(): HTMLElement {
    this.root.appendChild(this.form);
    this.form.appendChild(this.cardKindText);
    this.form.appendChild(new Input(this.form, ComplexityFormInput.Four, false, 'cardNumber').render());
    this.form.appendChild(new Label(this.form, ComplexityCategiries.Four).render());
    this.form.appendChild(new Input(this.form, ComplexityFormInput.Six, true, 'cardNumber').render());
    this.form.appendChild(new Label(this.form, ComplexityCategiries.Six).render());
    return this.form;
  }
}
