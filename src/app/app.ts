import { AboutGame } from './page/body/aboutGame/aboutGame';
import { Body } from './page/body/body';
import { Game } from './page/body/game/appGame';
import { GameSettings } from './page/body/gameSettings/gameSettings';
import { Score } from './page/body/score/score';
import { Header } from './page/header/header';

export class App {
  private readonly page: HTMLElement;

  private readonly body: HTMLElement;

  private readonly aboutGame: AboutGame;

  private readonly settings: GameSettings;

  constructor(private readonly root: HTMLElement) {
    this.page = document.createElement('div');
    this.page.classList.add('page');
    this.body = new Body(this.page).render();
    this.aboutGame = new AboutGame(this.body);
    this.settings = new GameSettings(this.body);
  }

  render(): HTMLElement {
    this.root.appendChild(this.page);
    this.page.appendChild(new Header(this.page).render());
    this.page.appendChild(this.body);
    return this.page;
  }

  router(): void {
    const aboutGameMark: HTMLElement = document.getElementById('about-game-mark');
    const gameMark: HTMLElement = document.getElementById('game-mark');
    const scoreMark: HTMLElement = document.getElementById('score-mark');
    const settimgsMark: HTMLElement = document.getElementById('settings-mark');
    const currentUrl: string = window.location.hash.slice(1);

    const appRoutes: {
      [key: string]: string;
    } = {
      '/': 'aboutGame',
      'game/': 'game',
      'score/': 'score',
      'settings/': 'game-settings',
    };
    const page = appRoutes[currentUrl];

    if (page === 'aboutGame') {
      this.body.innerHTML = '';
      this.aboutGame.render();
      aboutGameMark.classList.add('mark');
    } else {
      aboutGameMark.classList.remove('mark');
    }
    if (page === 'score') {
      this.body.innerHTML = '';
      new Score(this.body).render();
      scoreMark.classList.add('mark');
    } else {
      scoreMark.classList.remove('mark');
    }
    if (page === 'game') {
      this.body.innerHTML = '';
      new Game(this.body, this.settings.selectedKind, this.settings.selectedComplexity).render();
      gameMark.classList.add('mark');
    } else {
      gameMark.classList.remove('mark');
    }

    if (page === 'game-settings') {
      this.body.innerHTML = '';
      this.settings.render();
      settimgsMark.classList.add('mark');
    } else {
      settimgsMark.classList.remove('mark');
    }
  }
}
