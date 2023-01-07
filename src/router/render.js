import mainPage from '../pages/main';
import basketPage from '../pages/basket';
import buildProductPage from '../pages/product';
import notFoundPage from '../pages/notFound';
import { routes } from '../common/constans';

const render = (url) => {
  let result = notFoundPage;

  const { pathname } = url;

  if (pathname === routes.main) {
    result = mainPage();
  } else if (pathname === routes.basket) {
    result = basketPage();
  } else if (pathname === routes.product) {
    result = buildProductPage();
  } else if (pathname === routes.mainSearch) {
    // its only now
    const div = document.createElement('div');
    div.textContent = 'search product';
    result = div;
  }

  const app = document.querySelector('#app');
  if (app) {
    app.innerHTML = '';
    app.append(result);
  }
};

export default render;
