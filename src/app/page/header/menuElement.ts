import { Component } from '../../../models';

export class MenuElement implements Component {
  private readonly menuElement: HTMLElement;

  private readonly name: string;

  private readonly link: string;

  private readonly classItem: string;

  constructor(private readonly root: HTMLElement | null, name: string, link: string, classItem: string) {
    this.menuElement = document.createElement('li');
    this.name = name;
    this.link = window.location.pathname + link;
    this.classItem = classItem;
  }

  render(): HTMLElement {
    this.root.appendChild(this.menuElement);
    this.menuElement.classList.add('menu-element');
    this.menuElement.innerHTML = `<a class="menu-link" id="${this.classItem}" href=${this.link}>${this.name}</a>`;
    return this.menuElement;
  }
}
