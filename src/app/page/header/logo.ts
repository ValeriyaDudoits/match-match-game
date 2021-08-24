import { Component } from '../../../models';

export class Logo implements Component {
  private readonly logo: HTMLElement;

  constructor(private readonly root: HTMLElement | null) {
    this.logo = document.createElement('li');
  }

  render(): HTMLElement {
    this.root.appendChild(this.logo);
    this.logo.innerHTML = 'Match match';
    this.logo.classList.add('logo');
    return this.logo;
  }
}
