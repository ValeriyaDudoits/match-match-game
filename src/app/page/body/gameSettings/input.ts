import { Component } from '../../../../models';

export class Input implements Component {
  private input: HTMLElement;

  constructor(private readonly root: HTMLElement | null, value: string, checked: boolean, name: string) {
    this.input = document.createElement('input');
    this.input.classList.add('cards-input');
    (this.input as HTMLInputElement).type = 'radio';
    (this.input as HTMLInputElement).name = name;
    (this.input as HTMLInputElement).value = value;
    (this.input as HTMLInputElement).checked = checked;
  }

  render(): HTMLElement {
    return this.input;
  }
}
