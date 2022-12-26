import { Product } from '../types/products';
import model from '../model/model';
import { routes, goTo } from '../rout';
import { getSumAndCount } from '../common/basketHelper';
import headerWiew from '../view/headerWiew';

const changeHeaderWiew = (): void => {
  headerWiew(getSumAndCount(model.getBasket()));
};

const isDropBtn = (id: number): boolean => {
  const basket = model.getBasket().map((product) => product.id);
  return basket.includes(id);
};

type Elements = {
  card: HTMLElement | null;
};

class ProductCard {
  product: Product;

  elements: Elements = {
    card: null,
  };

  constructor(product: Product) {
    this.product = product;
  }

  init() {
    this.render();
    this.attachEvents();
    return this.elements.card;
  }

  render(): void {
    const { product } = this;
    const cardEl = document.createElement('div');
    cardEl.classList.add('card');
    cardEl.setAttribute('id', String(product.id));
    cardEl.innerHTML = `<h5 class="card-title text-center mt-1">${product.title}</h5>
    <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
      <ul class="list-group list-group-flush">
        <li class="list-group-item p-2">Category: ${product.category}</li>
        <li class="list-group-item p-2">Brand: ${product.brand}</li>
        <li class="list-group-item p-2">Price: ${product.price}</li>
        <li class="list-group-item p-2">Discount: ${product.discountPercentage} %</li>
        <li class="list-group-item p-2">Rating: ${product.rating}</li>
        <li class="list-group-item p-2">Stock: ${product.stock}</li>
      </ul>
`;

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('d-flex', 'justify-content-between', 'flex-wrap', 'm-2');
    btnContainer.innerHTML = '<button type="button" class="btn btn-primary btn-sm">Details</button>';
    btnContainer.prepend(this.getBtn());
    cardEl.append(btnContainer);

    this.elements.card = cardEl;
  }

  private getBtn(): Element {
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
    this.elements.card?.addEventListener('click', (e: Event) => {
      if (e.target) {
        const target = e.target as HTMLElement;
        if (target.matches('.js-basket')) {
          const btnType = target.dataset.basket;
          switch (btnType) {
            case 'add':
              model.addProductToBasket(this.product.id);
              changeHeaderWiew();
              target.textContent = 'Drop from card';
              target.dataset.basket = 'drop';
              break;
            case 'drop':
              model.dropProductFromBasket(this.product.id);
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
          goTo(path);
        }
      }
    });
  }
}

export default ProductCard;
