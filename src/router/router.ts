// eslint-disable-next-line import/no-cycle
import render from './render';
import { routes } from '../common/constans';

export const goToPath = (path: string): void => {
  window.history.pushState({ path }, path, path);

  render(new URL(window.location.href));
};

export const updateUrl = (startUrl: string, params: { [key: string]: string }): void => {
  const currentUrlParams = new URL(window.location.href).searchParams;
  const [key] = Object.keys(params);

  if (params[key] === '') {
    currentUrlParams.delete(key);
  } else if (currentUrlParams.has(key)) {
    currentUrlParams.delete(key);
    currentUrlParams.append(key, params[key]);
  } else {
    currentUrlParams.append(key, params[key]);
  }

  const searchStr = currentUrlParams.toString();
  const path = searchStr === '' ? routes.main : `${startUrl}?${searchStr}`;

  window.history.pushState({ path }, path, path);
};

const initRouter = (): void => {
  window.addEventListener('popstate', () => {
    render(new URL(window.location.href));
  });
  document.querySelectorAll('.js-rout').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      const path = target?.dataset.rout;
      if (path) { goToPath(path); }
    });
  });
  render(new URL(window.location.href));
};

export default initRouter;
