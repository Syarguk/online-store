import { Product } from '../types/products';
import viewBasket from '../view/viewBasket';
import {
  addToBasket, getBasket, setQuantityProducts, takeFromBasket, getSummaryProducts
} from '../common/basketHelper';

type Elements = {
  card: HTMLElement | null;
};

class ProductBasket {
  constructor(product: Product, index: number) {
    this.product = product;
    this.index = index;
  }

  product: Product;

  index;

  elements: Elements = {
    card: null,
  };

  render(): void {
    const cardProduct = document.createElement('div');
    const prodIdBasket = getBasket();
    cardProduct.classList.add('item-prod', 'bg-light', 'border', 'd-flex', 'align-items-center');
    cardProduct.innerHTML = `
      <div class="item-i">${this.index}</div>
      <div class="item-info d-flex">
        <img class="img-thumbnail img-descr-prod" alt="..." src="${this.product.thumbnail}">
        <div class="item-detail text-center">
          <h5 class="product-title">${this.product.title}</h5>
          <p class="product-description">${this.product.description}</p>
          <div class="product-other d-flex justify-content-around">
            <div class="product-other-rating">Rating: ${this.product.rating}</div>
            <div class="product-other-discount">Discount: ${this.product.discountPercentage}</div>
          </div>
        </div>
      </div>
      <div class="basket-number-control">
        <p class="stock-control">Stock: ${this.product.stock}</p>
        <div class="inc-dec-control">
          <button class="change-quant btn btn-outline-secondary">+</button>
          <span class="quant-copy">3?</span>
          <button class="change-quant btn btn-outline-secondary">-</button>
        </div>
        <div class="amount-control">€${this.product.price}</div>
      </div>`;
    this.elements.card = cardProduct;
  }

  static changeSummary(sum: number[]) {
    const [price, quantity] = sum;
    const totalProducts = document.querySelector('.total-products span');
    const totalPrice = document.querySelector('.total-price span');
    if (totalProducts) totalProducts.textContent = `${quantity}`;
    if (totalPrice) totalPrice.textContent = `${price}`;
  }

  private attachEvents(): void {
    this.elements.card?.addEventListener('click', (e: Event) => {
      if (e.target) {
        const target = e.target as HTMLElement;
        const prodIdBasket = getBasket();
        if (target.matches('.change-quant')) {
          const quantityCopyProd = target.parentElement?.children[1] as HTMLElement;
          if (target.textContent === '+') {
            if (prodIdBasket[this.product.id] < this.product.stock) {
              addToBasket(this.product.id);
              quantityCopyProd.textContent = `${prodIdBasket[this.product.id]}`;
            }
          } else if (quantityCopyProd.textContent === '1') {
            const listProductsPage = document.querySelectorAll('.item-prod .item-i');
            quantityCopyProd.textContent = `${prodIdBasket[this.product.id]}`;
            takeFromBasket(this.product.id);
            const products = setQuantityProducts();
            if (products) viewBasket.renderSelectProducts(products);
            if (listProductsPage.length === 1) {
              const button = document.querySelector('.prev-page-but') as HTMLElement;
              if (button) button.click();
            }
          } else {
            takeFromBasket(this.product.id);
            quantityCopyProd.textContent = `${prodIdBasket[this.product.id]}`;
          }
          ProductBasket.changeSummary(getSummaryProducts());
        } else {
          /* const path = `${routes.product}id=${this.product.id}`;
          goTo(path); */
          console.log(`prod ${this.product.id}`);
        }
      }
    });
  }

  init() {
    this.render();
    this.attachEvents();
    return this.elements.card;
  }
}

export default ProductBasket;
