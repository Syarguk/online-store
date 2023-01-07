import view from "../../view/view";
import { Products } from "../../types/products";

const getProductsContainer = (products: Products) => {
  const productsContainer = document.createElement('div');
  productsContainer.classList.add('cards-container', 'd-flex', 'flex-wrap', 'justify-content-center', 'p-2');

  view.renderProducts(products, productsContainer);

  return productsContainer;
};

export default getProductsContainer;
