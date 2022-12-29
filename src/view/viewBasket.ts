import { ViewBasket } from '../types/view';
import ProductBasket from '../components/ProductBasket';

const viewBasket: ViewBasket = {
  renderSelectProducts(products) {
    const cards = document.querySelectorAll('.prod-items .item-prod');
    if (cards) {
      cards.forEach((el) => el.remove());
    }
    const cardsContainer = document.querySelector('.select-products .prod-items');
    products.forEach((product) => {
      const productCard = new ProductBasket(product);
      cardsContainer?.append(productCard.init() as HTMLElement);
    });
  },
};

export default viewBasket;
