import './style/main.scss';
import { App } from './app/app';

const rootNode: HTMLElement = document.querySelector('#app');
const app = new App(rootNode);
window.onload = () => {
  const linkHome = window.location.pathname;
  document.location.assign(`${linkHome}#/`);
  app.render();
  app.router();
};
window.onhashchange = () => {
  app.router();
};
