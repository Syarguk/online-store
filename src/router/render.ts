// eslint-disable-next-line import/no-cycle
import mainPage from '../pages/mainPage/main';
import basketPage from '../pages/basket';
import productPage from '../pages/product';
import notFoundPage from '../pages/notFound';
import { routes } from '../common/constans';

const render = (url: URL): void => {
  let result = notFoundPage();

  const { pathname } = url;
  if (pathname === routes.main) {
    result = mainPage();
  } else if (pathname === routes.basket) {
    result = basketPage();
  } else if (pathname === routes.product) {
    result = productPage(url.search.slice(1));
  } else if (pathname === routes.mainSearch) {
    result = mainPage(url.search.slice(1));
  }

  const app = document.querySelector('#app');
  if (app) {
    app.innerHTML = '';
    app.append(result);
  }
};

export default render;
