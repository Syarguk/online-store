import view from "../../view/view";
import { Products } from "../../types/products";
import { ObjectInterface } from "../../types/products";

const getProductsContainer = (products: Products, options?: ObjectInterface) => {

  let cardsView = 'big';
  if (options?.big) {
    cardsView = options.big === 'true'? cardsView : 'small';
  }
  const productsContainer = document.createElement('div');
  productsContainer.classList.add('cards-container', 'd-flex', 'flex-wrap', 'justify-content-center', 'p-2', cardsView);
  productsContainer.setAttribute('id', 'products');

  view.renderProducts(products, productsContainer);

  return productsContainer;
};

export default getProductsContainer;
