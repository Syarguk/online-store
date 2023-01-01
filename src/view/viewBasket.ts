import { ViewBasket } from '../types/view';
import ProductBasket from '../components/ProductBasket';

const viewBasket: ViewBasket = {
  renderSelectProducts(data) {
    const [products, startIndex] = data;
    const cards = document.querySelectorAll('.prod-items .item-prod');
    if (cards) {
      cards.forEach((el) => el.remove());
    }
    const cardsContainer = document.querySelector('.select-products .prod-items');
    products.forEach((product, index) => {
      const productCard = new ProductBasket(product, index + startIndex + 1);
      cardsContainer?.append(productCard.init() as HTMLElement);
    });
  },
};

export default viewBasket;
