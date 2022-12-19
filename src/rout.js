import mainPage from './pages/main';
import basketPage from './pages/basket';
import productPage from './pages/product';
import notFoundPage from './pages/notFound';

//разобраться с query параметрами

export const routes = {
  main: '/',
  basket: '/basket',
  product: '/product',
};

export const render = (path) => {
  let result = notFoundPage;

  //console.log(path);
  if (path === routes.main) {
    result = mainPage;
  } else if (path === routes.basket) {
    result = basketPage;
  } else if (path === routes.product) {
    result = productPage;
  }

  document.querySelector('#app').innerHTML = result;
};

export const goTo = (path) => {
  window.history.pushState({ path }, path, path);
  render(path);
};

const initRouter = () => {
  window.addEventListener('popstate', (e) => {
    render(new URL(window.location.href).pathname);
  });
  document.querySelectorAll('.js-rout').forEach((el) => {
    el.addEventListener('click', (env) => {
      env.preventDefault();
      const path = env.target.dataset.rout;
      //console.log(path);
      //косяк с корзиной - путь иногда уходит на 404
      goTo(path);
    });
  });
  render(new URL(window.location.href).pathname);
};

export default initRouter;
