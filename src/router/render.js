import mainPage from '../pages/main';
import basketPage from '../pages/basket';
import buildProductPage from '../pages/product';
import notFoundPage from '../pages/notFound';
import { routes } from '../common/constans';

const render = (path) => {
  let result = notFoundPage;

  if (path === routes.main) {
    result = mainPage();
  } else if (path === routes.basket) {
    result = basketPage();
  } else if (path.includes(routes.product)) {
    result = buildProductPage(path);
  } else if (path.includes(routes.mainSearch)) {
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
