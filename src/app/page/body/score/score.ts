import { LENGTH_OF_PLAYERS, TIMEOUT_DELAY_FOR_INDEXDB } from '../../../../constants';
import { Component, MyRecord } from '../../../../models';
import { Database } from '../../../indexDbd';

export class Score implements Component {
  private readonly scorePage: HTMLElement;

  private readonly title: HTMLElement;

  private readonly playerPosition: HTMLElement;

  private readonly player: HTMLElement;

  public IDB: Database;

  constructor(private readonly root: HTMLElement) {
    this.scorePage = document.createElement('div');
    this.title = document.createElement('h2');
    this.playerPosition = document.createElement('div');
    this.player = document.createElement('div');
    this.IDB = new Database();
    this.IDB.init('ValeriyaDudoits');
    this.scorePage.classList.add('score');
    this.title.innerHTML = 'Best players';
    this.title.classList.add('score__title');
    this.scorePage.appendChild(this.title);
    this.scorePage.appendChild(this.playerPosition);
    this.playerPosition.classList.add('score-body');
    setTimeout(() => {
      const players: Array<MyRecord> = this.IDB.readFiltered();
      setTimeout(() => {
        this.addPlayers(LENGTH_OF_PLAYERS, players);
      }, TIMEOUT_DELAY_FOR_INDEXDB);
    }, TIMEOUT_DELAY_FOR_INDEXDB);
  }

  render(): HTMLElement {
    this.root.appendChild(this.scorePage);
    return this.scorePage;
  }

  addPlayers(count: number, players: Array<MyRecord>): void {
    let countPlayers;
    if (count > players.length) {
      countPlayers = players.length;
    } else countPlayers = count;
    for (let i = 0; i < countPlayers; i++) {
      const player = document.createElement('div');
      player.classList.add('player');
      player.innerHTML = `Score: ${players[i].score}</br> 
      Name: ${players[i].name}</br>
      Email: ${players[i].email}`;
      const avatar = document.createElement('div');
      avatar.classList.add('avatar__img');
      const srcImg = 'image.jpg';
      if (players[i].avatar === undefined) {
        avatar.innerHTML = `<img class="avatar" src="${srcImg}" alt="image" />`;
      } else avatar.innerHTML = `<img class="avatar" src="${players[i].avatar}" alt="image" />`;
      this.playerPosition.appendChild(avatar);
      this.playerPosition.appendChild(player);
    }
  }
}
