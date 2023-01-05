import { Product } from '../types/products';
import { goToPath } from '../router/router';
import { routes } from '../common/constans';
import { getBasket, addToBasket, takeFromBasket, getSummaryProducts } from '../common/basketHelper';
import headerWiew from '../view/headerWiew';

const changeHeaderWiew = (): void => {
  headerWiew(getSummaryProducts());
};

const isDropBtn = (id: number): boolean => {
  const basket = getBasket();
  if (basket) {
    return Object.prototype.hasOwnProperty.call(basket, String(id));
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
    this.attachEvents();

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
  }

  private getBtn(): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.classList.add('btn', 'btn-primary', 'btn-sm', 'js-basket');
    if (isDropBtn(this.product.id)) {
      btn.textContent = 'Drop from card';
      btn.dataset.basket = 'drop';
    } else {
      btn.textContent = 'Add to card';
      btn.dataset.basket = 'add';
    }
    return btn;
  }

  private attachEvents(): void {
    this.cardEl.addEventListener('click', (e: Event) => {
      if (e.target) {
        const target = e.target as HTMLElement;
        if (target.matches('.js-basket')) {
          const btnType = target.dataset.basket;
          switch (btnType) {
            case 'add':
              addToBasket(this.product.id);
              changeHeaderWiew();
              target.textContent = 'Drop from card';
              target.dataset.basket = 'drop';
              break;
            case 'drop':
              takeFromBasket(this.product.id);
              changeHeaderWiew();
              target.textContent = 'Add to card';
              target.dataset.basket = 'add';
              break;

            default:
              throw new Error(`unknow btn type ${btnType}`);
              break;
          }
        } else {
          const path = `${routes.product}id=${this.product.id}`;
          goToPath(path);
        }
      }
    });
  }
}

export default ProductCard;
