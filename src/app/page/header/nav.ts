import { Component, NavElements } from '../../../models';
import { Logo } from './logo';
import { MenuElement } from './menuElement';

export class Navigation implements Component {
  private readonly navigation: HTMLElement;

  constructor(private readonly root: HTMLElement | null) {
    this.navigation = document.createElement('ul');
  }

  render(): HTMLElement {
    this.root.appendChild(this.navigation);
    this.navigation.classList.add('navigation');
    this.navigation.appendChild(new Logo(this.navigation).render());
    this.navigation.appendChild(new MenuElement(this.navigation, NavElements.About, '#/', 'about-game-mark').render());
    this.navigation.appendChild(new MenuElement(this.navigation, NavElements.Score, '#score/', 'score-mark').render());
    this.navigation.appendChild(
      new MenuElement(this.navigation, NavElements.Settings, '#settings/', 'settings-mark').render(),
    );
    this.navigation.appendChild(new MenuElement(this.navigation, NavElements.Game, '#game/', 'game-mark').render());
    return this.navigation;
  }
}
