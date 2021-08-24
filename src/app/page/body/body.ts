import { Component } from '../../../models';

export class Body implements Component {
  private readonly body: HTMLElement;

  constructor(private readonly root: HTMLElement | null) {
    this.body = document.createElement('div');
  }

  render(): HTMLElement {
    this.root.appendChild(this.body);
    this.body.id = 'body';
    return this.body;
  }
}
