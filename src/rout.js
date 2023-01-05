import mainPage from './pages/main';
import basketPage from './pages/basket';
import buildProductPage from './pages/product';
import notFoundPage from './pages/notFound';
import { routes } from './common/constans';



export const render = (path) => {
  let result = notFoundPage;

  if (path === routes.main) {
    result = mainPage();
  } else if (path === routes.basket) {
    result = basketPage;
  } else if (path.includes(routes.product)) {
    result = buildProductPage(path);
  } else if (path.includes(routes.mainSearch)) {
    //its only now
    const div = document.createElement('div');
    div.textContent = 'search product';
    result = div;
  }

  const app = document.querySelector('#app');
  app.innerHTML = '';
  app.append(result);
};

export const goTo = (path) => {
  window.history.pushState({ path }, path, path);
  render(path);
};

const initRouter = () => {
  window.addEventListener('popstate', () => {
    render(new URL(window.location.href).pathname);
  });
  document.querySelectorAll('.js-rout').forEach((el) => {
    el.addEventListener('click', (env) => {
      env.preventDefault();
      const path = env.target.dataset.rout;
      goTo(path);
    });
  });
  render(new URL(window.location.href).pathname);
};

export default initRouter;
