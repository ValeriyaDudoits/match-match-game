export enum ComplexityFormInput {
  Four = '4',
  Six = '6',
}

export enum ComplexityCategiries {
  Four = '4x4',
  Six = '6x6',
}

export enum EmailInputValidationType {
  Unvalid = 'unvalid',
  Valid = 'valid',
}

export enum CardState {
  Wrong = 'wrong',
  Correct = 'correct',
}

export enum NavElements {
  About = 'About Game',
  Score = 'Best Score',
  Settings = 'Game Settings',
  Game = 'Start Game',
}

export interface MyRecord {
  name: string;
  email?: string;
  score: number;
  id?: IDBValidKey;
  avatar: string | ArrayBuffer;
}

export enum ImagesCategories {
  Cats = 'cats',
  Art = 'art',
  Flowers = 'flowers',
  Mountains = 'mountains',
  Sea = 'sea',
}

export enum DatabaseIndexes {
  Name = 'name',
  Email = 'email',
  Score = 'score',
  Avatar = 'avatar',
}

export interface Component {
  render(): HTMLElement | HTMLCollectionOf<Element>;
}
