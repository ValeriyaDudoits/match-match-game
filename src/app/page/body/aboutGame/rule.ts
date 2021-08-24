import { Component } from '../../../../models';

export class Rule implements Component {
  private readonly rule: HTMLElement;

  private readonly ruleCount: string;

  private readonly countElementTag: HTMLElement;

  private readonly ruleDescriptionTag: HTMLElement;

  private readonly ruleDescription: string;

  constructor(private readonly root: HTMLElement | null, ruleCount: string, ruleDescription: string) {
    this.rule = document.createElement('div');
    this.ruleCount = ruleCount;
    this.ruleDescription = ruleDescription;
    this.countElementTag = document.createElement('div');
    this.ruleDescriptionTag = document.createElement('p');
  }

  render(): HTMLElement {
    this.root.appendChild(this.rule);
    this.rule.classList.add('rules');
    this.rule.appendChild(this.countElementTag);
    this.countElementTag.classList.add('about-game__number');
    this.countElementTag.innerHTML = `${this.ruleCount}`;
    this.countElementTag.after(this.ruleDescriptionTag);
    this.ruleDescriptionTag.innerHTML = `${this.ruleDescription}`;
    this.ruleDescriptionTag.classList.add('about-game__description');
    return this.rule;
  }
}
