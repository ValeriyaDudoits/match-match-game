import { Component } from '../../../../models';

export class Label implements Component {
  private label: HTMLElement;

  constructor(private readonly root: HTMLElement | null, value: string) {
    this.label = document.createElement('label');
    this.label.classList.add('cards-label');
    this.label.innerText = value;
  }

  render(): HTMLElement {
    return this.label;
  }
}
