import { Product } from '../types/products';
// eslint-disable-next-line import/no-cycle
import { goToPath } from '../router/router';
import { routes } from '../common/constans';
import {
  getStorage, addToStorage, dropFromStorage } from '../common/basketHelper';
import model from '../model/model';
import changeHeaderWiew from '../view/headerWiew';

export const isDropBtn = (id: number): boolean => {
  const storage = getStorage();

  if (Array.isArray(storage)) {
    const ids = storage.map((item: Product) => item.id);
    return ids.includes(id);
  }
  return false;
};

class ProductCard {
  product: Product;

  cardEl: HTMLDivElement;

  constructor(product: Product) {
    this.product = product;
    this.cardEl = document.createElement('div');
  }

  init(): HTMLDivElement {
    this.render();

    return this.cardEl;
  }

  render(): void {
    const { product } = this;

    this.cardEl.classList.add('card');
    this.cardEl.setAttribute('id', String(product.id));
    this.cardEl.innerHTML = `<h5 class="card-title text-center mt-1">${product.title}</h5>
    <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
      <ul class="list-group list-group-flush">
        <li class="list-group-item p-2">Category: ${product.category}</li>
        <li class="list-group-item p-2">Brand: ${product.brand}</li>
        <li class="list-group-item p-2">Price: ${product.price} €</li>
        <li class="list-group-item p-2">Discount: ${product.discountPercentage} %</li>
        <li class="list-group-item p-2">Rating: ${product.rating}</li>
        <li class="list-group-item p-2">Stock: ${product.stock}</li>
      </ul>
`;

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('d-flex', 'justify-content-between', 'flex-wrap', 'm-2');
    btnContainer.innerHTML = '<button type="button" class="btn btn-primary btn-sm">Details</button>';
    btnContainer.prepend(this.getBtn());
    this.cardEl.append(btnContainer);
    this.attachEvents();
  }

  getBtn(): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.classList.add('btn', 'btn-primary', 'btn-sm', 'js-basket');
    if (isDropBtn(this.product.id)) {
      btn.textContent = 'Drop from card';
      btn.dataset.basket = 'drop';
    } else {
      btn.textContent = 'Add to card';
      btn.dataset.basket = 'add';
    }
    btn.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const btnType = target.dataset.basket;
      if (btnType === 'add') {
        addToStorage(model.getProduct(this.product.id));
        target.textContent = 'Drop from card';
        target.dataset.basket = 'drop';
      } else {
        dropFromStorage(this.product.id);
        target.textContent = 'Add to card';
        target.dataset.basket = 'add';
      }
      changeHeaderWiew();
    });

    return btn;
  }

  private attachEvents(): void {
    this.cardEl.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (!target.matches('.js-basket')) {
        const path = `${routes.product}?id=${this.product.id}`;
        goToPath(path);
      }
    });
  }
}

export default ProductCard;
