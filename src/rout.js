import mainPage from './pages/main';
import basketPage from './pages/basket';
import buildProductPage from './pages/product';
import notFoundPage from './pages/notFound';
//import ProductCard from './components/ProductCard';

export const routes = {
  main: '/',
  basket: '/basket',
  product: '/product:',
};

export const render = (path) => {
  let result = notFoundPage;

  console.log(path);
  if (path === routes.main) {
    result = mainPage;
    // const cardContainer = document.createElement('div');
    // cardContainer.classList.add('cards-container', 'd-flex', 'flex-wrap', 'justify-content-center', 'p-2');
    // const card1 = new ProductCard({
    //   id: 2,
    //   title: 'iPhone X',
    //   description: 'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...',
    //   price: 899,
    //   discountPercentage: 17.94,
    //   rating: 4.44,
    //   stock: 34,
    //   brand: 'Apple',
    //   category: 'smartphones',
    //   thumbnail: 'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
    //   images: [
    //     'https://i.dummyjson.com/data/products/2/1.jpg',
    //     'https://i.dummyjson.com/data/products/2/2.jpg',
    //     'https://i.dummyjson.com/data/products/2/3.jpg',
    //     'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
    //   ],
    // });
    // const card2 = new ProductCard({
    //   id: 3,
    //   title: 'Samsung Universe 9',
    //   description: "Samsung's new variant which goes beyond Galaxy to the Universe",
    //   price: 1249,
    //   discountPercentage: 15.46,
    //   rating: 4.09,
    //   stock: 36,
    //   brand: 'Samsung',
    //   category: 'smartphones',
    //   thumbnail: 'https://i.dummyjson.com/data/products/3/thumbnail.jpg',
    //   images: [
    //     'https://i.dummyjson.com/data/products/3/1.jpg',
    //   ],
    // });
    // cardContainer.append(card1.init());
    // cardContainer.append(card2.init());
    // result = cardContainer;
  } else if (path === routes.basket) {
    result = basketPage;
  } else if (path.includes(routes.product)) {
    result = buildProductPage(path);
  }

  const app = document.querySelector('#app');
  //  app.innerHTML = '';
  //  app.append(result);
  app.innerHTML = result;
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
