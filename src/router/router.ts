import render from './render';
import { transformParamsToUrl, transformUrlToParams } from '../common/urlHelpers';
import { ObjectInterface } from '../types/products';
import { routes } from '../common/constans';

export const goToPath = (path: string): void => {
  window.history.pushState({ path }, path, path);
  render(path);
};

export const updateUrl = (startUrl: string, params: ObjectInterface): void => {
  const currentUrl = new URL(window.location.href).pathname;

  let path;
  if (currentUrl === routes.main) {
    path = `${startUrl}${transformParamsToUrl(params)}`;
  } else {
    const currentParams = transformUrlToParams(currentUrl);
    const newParams = { ...currentParams, ...params };
    const newUrl = transformParamsToUrl(newParams);

    path = newUrl ? startUrl + newUrl : routes.main;
  }
  window.history.pushState({ path }, path, path);
};

const initRouter = (): void => {
  window.addEventListener('popstate', () => {
    render(new URL(window.location.href).pathname);
  });
  document.querySelectorAll('.js-rout').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      const path = target?.dataset.rout;
      if (path) { goToPath(path); }
    });
  });
  render(new URL(window.location.href).pathname);
};

export default initRouter;
