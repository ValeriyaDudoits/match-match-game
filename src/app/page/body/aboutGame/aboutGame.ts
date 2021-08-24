import { Component } from '../../../../models';
import { Rule } from './rule';

export class AboutGame implements Component {
  private readonly aboutGame: HTMLElement;

  private readonly title: HTMLElement;

  constructor(private readonly root: HTMLElement) {
    this.aboutGame = document.createElement('div');
    this.aboutGame.classList.add('about-game');
    this.title = document.createElement('h2');
    this.title.innerHTML = 'How to play?';
    this.title.classList.add('about-game__title');
    this.aboutGame.appendChild(this.title);
    this.aboutGame.appendChild(new Rule(this.aboutGame, '1', 'Configure your game settings.').render());
    this.aboutGame.appendChild(
      new Rule(
        this.aboutGame,
        '2',
        'Start you new game! Remember card positions and match it before times up.',
      ).render(),
    );
    this.aboutGame.appendChild(
      new Rule(this.aboutGame, '3', 'Register player to put your score in table score.').render(),
    );
  }

  render(): HTMLElement {
    this.root.appendChild(this.aboutGame);
    return this.aboutGame;
  }
}
