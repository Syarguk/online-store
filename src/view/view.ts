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
      cardsContainer?.append(productCard.init() as HTMLElement);
    });
  },

  renderFilters(listFields) {
    const filterContainer = document.querySelector('#filters');
    const cards = document.querySelectorAll('#filters .card');
    if (cards) {
      cards.forEach((el) => el.remove());
    }
    const card = document.createElement('div');
    card.classList.add('card');
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'pe-0');
    cardBody.innerHTML = '<h5 class="card-title text-center">Category</h5>';
    const cardsContainer = document.createElement('div');
    cardsContainer.classList.add('check-form');
    listFields.forEach((field) => {
      const productFilter = new ProductFilter(field);
      cardsContainer?.append(productFilter.init() as HTMLElement);
    });
    cardBody.append(cardsContainer);
    card.append(cardBody);
    filterContainer?.append(card);
  },

  renderBasket(productsId) {

  },
};

export default view;
