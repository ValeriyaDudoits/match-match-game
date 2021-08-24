import { INTERVAL_DELAY, SECONDS_IN_MINUTE } from '../../../../constants';

export class Timer {
  private readonly timer: HTMLElement;

  private readonly timerInput: HTMLElement;

  private time: NodeJS.Timeout | null;

  private readonly stopButton: HTMLElement;

  private readonly continueButton: HTMLElement;

  private readonly plug: HTMLElement;

  public sec: number;

  public min: number;

  constructor() {
    this.timer = document.createElement('div');
    this.timerInput = document.createElement('input');
    this.timerInput.classList.add('time-input');
    this.time = null;
    this.stopButton = document.createElement('div');
    this.stopButton.classList.add('stop-button');
    this.stopButton.innerHTML = 'Stop Game';
    this.timer.appendChild(this.stopButton);
    this.continueButton = document.createElement('div');
    this.continueButton.classList.add('continue-btn');
    this.continueButton.innerHTML = 'Continue';
    this.timer.appendChild(this.continueButton);
    this.plug = document.createElement('div');
    this.plug.classList.add('plug');
    this.stopButton.addEventListener('click', () => {
      this.stopGame(this.plug);
    });
    this.continueButton.addEventListener('click', () => {
      this.continueGame(this.plug);
    });
    this.sec = 0;
    this.min = 0;
  }

  render(): HTMLElement {
    this.timer.classList.add('timer');
    this.timer.appendChild(this.timerInput);
    this.startTimer();
    return this.timer;
  }

  startTimer(): void {
    this.time = setInterval(() => {
      this.sec++;
      if (this.sec < SECONDS_IN_MINUTE) {
        (this.timerInput as HTMLInputElement).value = `${this.min}:${this.sec}`;
      }
      if (this.sec === SECONDS_IN_MINUTE) {
        this.sec = 0;
        this.min++;
        (this.timerInput as HTMLInputElement).value = `${this.min}:${this.sec}`;
      }
    }, INTERVAL_DELAY);
  }

  stopTimer(): void {
    clearInterval(this.time);
  }

  stopGame(plug: HTMLElement): void {
    document.body.appendChild(plug);
    this.stopTimer();
  }

  continueGame(plug: HTMLElement): void {
    plug.remove();
    this.startTimer();
  }
}
