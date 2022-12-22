import View from '../types/view';
import ProductCard from '../components/ProductCard';
import ProductFilter from '../components/ProductFilter';

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

  renderFilters(listFields) {
    const cards = document.querySelectorAll('#filters .card');
    if (cards) {
      cards.forEach((el) => el.remove());
    }
    const cardsContainer = document.querySelector('.cards-container');
    listFields.forEach((field) => {
      
    })
  },
};

export default view;
