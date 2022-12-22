import View from '../types/view';
import ProductCard from '../components/ProductCard';

const view: View = {
  renderProducts(products) {
    const cards = document.querySelectorAll('.cards-container .card');
    if (cards) {
      cards.forEach((el) => el.remove());
    }
    const cardsContainer = document.querySelector('.cards-container');
    products.forEach((product) => {
      const productCard = new ProductCard(product);
      cardsContainer?.append(productCard.init());
    });
  },
};

export default view;
