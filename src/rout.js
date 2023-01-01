import mainPage from './pages/main';
import basketPage from './pages/basket';
import buildProductPage from './pages/product';
import notFoundPage from './pages/notFound';
// import ProductCard from './components/ProductCard';

export const routes = {
  main: '/',
  basket: '/basket',
  product: '/product:',
};

export const render = (path) => {
  let result = notFoundPage;

 // console.log(path);
  if (path === routes.main) {
    result = mainPage();
  } else if (path === routes.basket) {
    result = basketPage;
  } else if (path.includes(routes.product)) {
    result = buildProductPage(path);
  }

  const app = document.querySelector('#app');
  app.innerHTML = '';
  app.append(result);
  //app.innerHTML = result;
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
