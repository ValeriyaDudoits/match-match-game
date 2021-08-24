import { Component } from '../../../models';
import { Navigation } from './nav';

export class Header implements Component {
  readonly header: HTMLElement;

  constructor(private readonly root: HTMLElement | null) {
    this.header = document.createElement('div');
  }

  render(): HTMLElement {
    this.root.appendChild(this.header);
    this.header.classList.add('header');
    this.header.appendChild(new Navigation(this.header).render());
    return this.header;
  }
}
