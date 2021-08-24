import {
  MAX_LENGTH_OF_INPUT, MIN_LENGTH_OF_INPUT, TIMEOUT_DELAY, TIMEOUT_DELAY_WITH_WAITING,
} from '../../../../constants';
import { EmailInputValidationType } from '../../../../models';
import { BaseComponent } from '../../../baseComponent';
import { Database } from '../../../indexDbd';

export class Registration extends BaseComponent {
  private emailInput: HTMLElement;

  private emailLabel: HTMLElement;

  private firstNameInput: HTMLElement;

  private lastNameInput: HTMLElement;

  private firstNameLabel: HTMLElement;

  private lastNameLabel: HTMLElement;

  private submitBtn: HTMLElement;

  public IDB: Database;

  private avatar: HTMLElement;

  public base64: string | ArrayBuffer;

  constructor(private readonly root: HTMLElement | null) {
    super('div', ['registration']);
    this.emailLabel = document.getElementById('email-message');
    this.emailInput = document.getElementById('email');
    this.firstNameInput = document.getElementById('first-name');
    this.lastNameInput = document.getElementById('last-name');
    this.firstNameLabel = document.getElementById('first-name-message');
    this.lastNameLabel = document.getElementById('last-name-message');
    this.submitBtn = document.getElementById('submit-user');
  }

  render(scoreEnter: number): HTMLElement {
    this.root.appendChild(this.element);
    const link = `${window.location.pathname}#/`;
    this.element.innerHTML = `
        <form class="registration-form" id="form">
        <div class="inputs">
            <span class="about-input">First Name</span>
            <input id="first-name" class="registration-form-main-input" type="text" name="firstName"
                placeholder="Enter your first name">
            <label class ="label" id="first-name-message" for="first-name"></label>
        </div>
        <div class="inputs">
            <span class="about-input">Last Name</span>
            <input id="last-name" class="registration-form-main-input" type="text" name="lastName"
                placeholder="Enter your last name">
            <label class ="label" id="last-name-message" for="last-name"></label>
        </div>
        <div class="inputs">
            <span class="about-input">E-mail</span>
            <input id="email" class="registration-form-main-input" type="email" name="e-mail"
                placeholder="E-mail">
            <label class ="label" id="email-message" for="email"></label>
        </div>  
        <div class="inputs">
        <span class="about-input">Avatar</span>
        <input id="avatar" class="registration-form-main-input" type="file" name="upload">
    </div>          
        <div class="user-registraion">
        <div class="button" id="submit-user"><span>Add user</span></button>
        </div>
        <div class="user-registraion">
            <div class="button-cancel"><a class="button-cancel" href=${link}>Cancel</a></div>
        </div>
    </form>
        `;
    this.submitBtn = document.getElementById('submit-user');
    this.emailInput = document.getElementById('email');
    this.emailLabel = document.getElementById('email-message');
    this.firstNameInput = document.getElementById('first-name');
    this.lastNameInput = document.getElementById('last-name');
    this.firstNameLabel = document.getElementById('first-name-message');
    this.lastNameLabel = document.getElementById('last-name-message');
    this.avatar = document.getElementById('avatar');
    this.emailInput.addEventListener('blur', this.validateEmailOnBlur.bind(this));
    this.emailInput.addEventListener('focus', this.validateEmailOnFocus.bind(this));
    this.firstNameInput.addEventListener('blur', this.validateFirstNameOnBlur.bind(this));
    this.lastNameInput.addEventListener(
      'focus',
      this.validateLastNameOnFocus.bind(this, this.lastNameLabel, this.lastNameInput),
    );
    this.firstNameInput.addEventListener('focus', this.validateFirstNameOnFocus.bind(this));
    this.lastNameInput.addEventListener(
      'blur',
      this.validateLastNameOnBlur.bind(this, this.lastNameLabel, this.lastNameInput),
    );
    this.avatar.addEventListener('change', this.getAvatar.bind(this));
    this.submitBtn.addEventListener('click', () => {
      if (
        this.firstNameInput.classList.contains(EmailInputValidationType.Valid)
                && this.lastNameInput.classList.contains(EmailInputValidationType.Valid)
                && this.emailInput.classList.contains(EmailInputValidationType.Valid)
      ) {
        this.IDB = new Database();
        this.IDB.init('ValeriyaDudoits');
        const name = `${(this.firstNameInput as HTMLInputElement).value} 
        ${(this.lastNameInput as HTMLInputElement).value}`;
        const email = (this.emailInput as HTMLInputElement).value;
        const score: number = scoreEnter;
        const avatar = this.base64;
        setTimeout(() => {
          this.IDB.write(name, email, score, avatar);
        }, TIMEOUT_DELAY);
        setTimeout(() => {
          const linkScore = window.location.pathname;
          document.location.assign(`${linkScore}#score/`);
        }, TIMEOUT_DELAY_WITH_WAITING);
      }
    });
    return this.element;
  }

  validateEmailOnBlur(): void {
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const address: string = (this.emailInput as HTMLInputElement).value;

    if (address === '') {
      this.emailLabel.innerText = 'Enter email';
      this.emailInput.classList.add(EmailInputValidationType.Unvalid);
      return;
    }
    if (!reg.test(address) || address.length > 30) {
      this.emailLabel.innerText = 'Invalid email';
      this.emailInput.classList.add(EmailInputValidationType.Unvalid);
      return;
    }
    this.emailInput.classList.remove(EmailInputValidationType.Unvalid);
    this.emailInput.classList.add(EmailInputValidationType.Valid);
  }

  validateEmailOnFocus(): void {
    (this.emailInput as HTMLInputElement).value = '';
    this.emailLabel.innerText = '';
  }

  validateFirstNameOnBlur(): void {
    const reg = /^(([a-zA-Z' -]{2,30})|([а-яА-ЯЁёІіЇїҐґЄє' -]{2,30}))$/u;
    const name: string = (this.firstNameInput as HTMLInputElement).value;
    if (name === '') {
      this.firstNameLabel.innerText = 'Enter name';
      this.firstNameInput.classList.add(EmailInputValidationType.Unvalid);
      return;
    }
    if (name.length < MIN_LENGTH_OF_INPUT) {
      this.firstNameLabel.innerText = 'Name is too short';
      this.firstNameInput.classList.add(EmailInputValidationType.Unvalid);
      return;
    }
    if (!reg.test(name) || name.length > MAX_LENGTH_OF_INPUT) {
      this.firstNameLabel.innerText = 'Invalid name';
      this.firstNameInput.classList.add(EmailInputValidationType.Unvalid);
      return;
    }
    this.firstNameInput.classList.remove(EmailInputValidationType.Unvalid);
    this.firstNameInput.classList.add(EmailInputValidationType.Valid);
  }

  validateFirstNameOnFocus(): void {
    (this.firstNameInput as HTMLInputElement).value = '';
    this.firstNameLabel.innerText = '';
  }

  validateLastNameOnBlur(): void {
    const reg = /^(([a-zA-Z' -]{2,30})|([а-яА-ЯЁёІіЇїҐґЄє' -]{2,30}))$/u;
    const name: string = (this.lastNameInput as HTMLInputElement).value;
    if (name === '') {
      this.lastNameLabel.innerText = 'Enter name';
      this.lastNameInput.classList.add(EmailInputValidationType.Unvalid);
      return;
    }
    if (name.length < MIN_LENGTH_OF_INPUT) {
      this.lastNameLabel.innerText = 'Name is too short';
      this.lastNameInput.classList.add(EmailInputValidationType.Unvalid);
      return;
    }
    if (!reg.test(name) || name.length > MAX_LENGTH_OF_INPUT) {
      this.lastNameLabel.innerText = 'Invalid name';
      this.lastNameInput.classList.add(EmailInputValidationType.Unvalid);
      return;
    }
    this.lastNameInput.classList.remove(EmailInputValidationType.Unvalid);
    this.lastNameInput.classList.add(EmailInputValidationType.Valid);
  }

  validateLastNameOnFocus(): void {
    (this.lastNameInput as HTMLInputElement).value = '';
    this.lastNameLabel.innerText = '';
  }

  getAvatar(): void {
    const file = (this.avatar as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.base64 = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
